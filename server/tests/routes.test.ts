/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import request from 'supertest';
import app from '../app';

describe('Login', () => {
  test('Successfully Logged In', (done) => {
    request(app).post('/api/login').send({
      email: 'jack@gmail.com',
      password: 'Abed@123',
      role: 'interviewee',
    }).expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Login successful');
        expect(res.body.data.user.email).toBe('jack@gmail.com');
        return done();
      });
  });
});
