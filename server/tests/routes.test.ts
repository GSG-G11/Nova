/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import createFakeData from '../database/build';

beforeAll(() => createFakeData());
describe('Login', () => {
  test('Should return error with validation', (done) => {
    request(app).post('/api/login').send({
      email: 'jackgmail.com',
      password: 'Abed@123',
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

describe('signup', () => {
  test('Should return error with validation', (done) => {
    request(app).post('/api/signup').send({
      name: 'Jack',
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

  // test('Signup with existing user', (done) => {
  //   request(app).post('/api/signup').send({
  //     name: 'Jack',
  //     email: 'jane@gmail.com',
  //     password: 'Abed@123',
  //     role: 'interviewee',
  //   }).expect(409)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       expect(res.body.message).toBe('Email already exists');
  //       return done();
  //     });
  // });

  test('Signup with non existent user', (done) => {
    request(app).post('/api/signup').send({
      name: 'Jack',
      email: 'mahmoud@gmail.com',
      password: 'Abed@123',
      role: 'interviewee',
    }).expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Account created successfully please check your email to verify your account');
        return done();
      });
  });

  test('Verify Email failed', (done) => {
    request(app).patch('/api/auth/verify').expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Access token not found');
        return done();
      });
  });

  // todo: test for email verification
  // test('Verify Email', (done) => {
  //   request(app).patch('/api/auth/verify?accessToken=eyJhbGciOiJIUzI1NiIsIn
  // R5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbmVAZ21haWwuY29tIiwiaWF0IjoxNjUyMDg0OTA0fQ.
  // v5gHev_T6kHLavk88B-YDOoD-w4HewhldXjDElW2Tk4').expect(200)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log(err, 11111111);
  //         return done(err);
  //       }
  //       expect(res.body.message).toBe('Email Valedated successfully');
  //       return done();
  //     });
  // });
});

afterAll(() => mongoose.connection.close());
