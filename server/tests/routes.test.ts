/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import startDb from '../database/config';

beforeAll(() => startDb());
describe('Login', () => {
  test('Should return error with validation', (done) => {
    request(app).post('/api/login').send({
      email: 'jackgmail.com',
      password: 'Abed@123',
      role: 'interviewee',
    }).expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('"email" must be a valid email');
        return done();
      });
  });

  test('Login with non existent user', (done) => {
    request(app).post('/api/login').send({
      email: 'potato@gmail.com',
      password: 'Abed@123',
      role: 'interviewee',
    }).expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('User not found');
        return done();
      });
  });

  test('Login with existent user invalid password', (done) => {
    request(app).post('/api/login').send({
      email: 'jack@gmail.com',
      password: 'Abed@12345',
      role: 'interviewee',
    }).expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid password');
        return done();
      });
  });

  test('Login with non confirmed user', (done) => {
    request(app).post('/api/login').send({
      email: 'larry@gmail.com',
      password: 'Abed@123',
      role: 'interviewee',
    }).expect(401)
      .end((err, res) => {
        if (err) {
          console.log(err, 'errordd');
          return done(err);
        }
        expect(res.body.message).toBe('Please Verify your email');
        return done();
      });
  });

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
        expect(res.headers['set-cookie'][0]).toContain('token');
        return done();
      });
  });
});

afterAll(() => mongoose.connection.close());
