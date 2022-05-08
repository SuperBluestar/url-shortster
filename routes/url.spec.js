const request = require('supertest')
const server = require('../server')
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('Path: api/url testing', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('register new short url without request', async () => {
    const testData = {
      urlOriginal: 'https://google.com'
    }
    const res = await request(server)
      .post('/api/url/register')
      .send({
        urlOriginal: testData.urlOriginal
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('urlOriginal');
    expect(res.body).toHaveProperty('urlCode');
    expect(res.body.urlOriginal).toEqual(testData.urlOriginal);
    expect(res.body.urlCode.length).toBe(6);
  });

  it('register new short url with valid request', async () => {
    const testData = {
      urlOriginal: 'https://test.com',
      urlCode: 'test'
    }
    const res = await request(server)
      .post('/api/url/register')
      .send({
        urlOriginal: testData.urlOriginal,
        urlCode: testData.urlCode
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('urlOriginal');
    expect(res.body).toHaveProperty('urlCode');
    expect(res.body.urlOriginal).toEqual(testData.urlOriginal);
    expect(res.body.urlCode).toEqual(testData.urlCode);
  });

  it('register new short url with invalid urlCode request', async () => {
    const testData = {
      urlOriginal: 'https://test.com',
      urlCode: '1'
    }
    const res = await request(server)
      .post('/api/url/register')
      .send({
        urlOriginal: testData.urlOriginal,
        urlCode: testData.urlCode
      });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toEqual('UrlCode should be longer than 4 letters');
  });

  it('register new short url with invalid urlOriginal request', async () => {
    const testData = {
      urlOriginal: '',
      urlCode: '1234'
    }
    const res = await request(server)
      .post('/api/url/register')
      .send({
        urlOriginal: testData.urlOriginal,
        urlCode: testData.urlCode
      });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toEqual('Invalid urlOriginal');
  });
});
