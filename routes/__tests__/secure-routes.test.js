const { response } = require('express');
const request = require('supertest');
const app = require('../../app');

describe('Route Tests', () => {
  describe('Tests secure routes test without token', () => {
    it('Gets rejected with a 401 Unauthorized', async () => {
      //   Using supertest to start the app and the send a get request to a protected endpoint
      const response = await request(app).get('/user/profile');
      // Checks api response for a status 401 Unauthorized
      expect(response.status).toBe(401);
    });
  });

  describe('Tests secure routes test with token', () => {
    it('Gets a success of 200', async () => {
      const userInfo = {
        email: 'chris@gmail.com',
        password: 'password',
      };
      const {
        body: { token },
      } = await request(app)
        .post('/login')
        .send(userInfo)
        .set('Accept', 'application/json');
      const response = await request(app)
        .get('/user/profile')
        .query({ secret_token: token });
      expect(response.status).toBe(200);
    });
  });
});
