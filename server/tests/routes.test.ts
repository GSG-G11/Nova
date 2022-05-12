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

describe('Get Interviewee Reviews', () => {
  test('Should Throw an error if user not authenticated', (done) => {
    request(app).get('/api/user/review').expect(401).end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.message).toBe('Login First!');
      return done();
    });
  });

  test('Should return Reviews found', (done) => {
    request(app).get('/api/user/review').set('Cookie', [`token=${process.env.TEST_TOKEN}`])
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Reviews found');
        return done();
      });
  });

  test('Should return not saved Reviews', (done) => {
    request(app).get('/api/user/review?saved=false').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Reviews found');
        expect(res.body.data.length).toBe(2);
        return done();
      });
  });

  test('Should return 3 saved Reviews', (done) => {
    request(app).get('/api/user/review?page=1&saved=true').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Reviews found');
      expect(res.body.data.length).toBe(3);
      return done();
    });
  });
});

afterAll(() => mongoose.connection.close());
