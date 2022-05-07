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
        urlOriginal: 'http://localhost:8000/api-testing',
        urlCode: 'testcode'
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('request existing shortcode', async () => {
    const res = await request(server)
      .get('/testcode')
      .redirects(1);
    expect(res.statusCode).toEqual(200);
  });
  
  it('request non-existing shortcode', async () => {
    const res = await request(server)
      .get('/random-code');
    expect(res.statusCode).toEqual(404);
  });
});