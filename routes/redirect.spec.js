const request = require('supertest')
const server = require('../server')
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('Redirect test', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    const res = await request(server)
      .post('/api/url/register')
      .send({
        urlOriginal: 'https://github.com',
        urlCode: 'testcode'
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('request existing shortcode', async () => {
    const res = await request(server)
      .get('/api/testcode')
      .redirects(1);
    expect(res.statusCode).toEqual(200);
  });
  
  it('request non-existing shortcode', async () => {
    const res = await request(server)
      .get('/api/random-code');
    expect(res.statusCode).toEqual(404);
  });
});

describe('Url status', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    const res = await request(server)
      .post('/api/url/register')
      .send({
        urlOriginal: 'https://github.com',
        urlCode: 'testcode'
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('request existing shortcode', async () => {
    const res1 = await request(server)
      .get('/api/testcode/stats');
    expect(res1.statusCode).toEqual(200);
    expect(res1.body.accessCount).toEqual(1);
    const res2 = await request(server)
      .get('/api/testcode/stats');
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.accessCount).toEqual(2);
  });
  
  it('request non-existing shortcode', async () => {
    const res = await request(server)
      .get('/api/random-code/stats');
    expect(res.statusCode).toEqual(404);
  });
})