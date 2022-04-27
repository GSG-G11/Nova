/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import request from 'supertest';
import app from '../app';

test('should first', (done) => {
  request(app).post('/api/login').send({
    id: 1,
    email: 'test@test.com',
    password: 'Test1@',
    role: 'admin',
  }).expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.message).toBe('Login successful');
      expect(res.body.data.user.id).toBe(1);
      expect(res.body.data.user.email).toBe('test@test.com');
      return done();
    });
});
