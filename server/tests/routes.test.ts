/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import createFakeData from '../database/build';

beforeEach(() => createFakeData());

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

  test('Signup with existing user', (done) => {
    request(app).post('/api/signup').send({
      name: 'Jack',
      email: 'jane@gmail.com',
      password: 'Abed@123',
      role: 'interviewee',
    }).expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Email already exists');
        return done();
      });
  });

  test('Signup with non existent user', (done) => {
    request(app)
      .post('/api/signup')
      .send({
        name: 'Jack',
        email: 'mahmoud@gmail.com',
        password: 'Abed@123',
        role: 'interviewee',
      })
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

  test('Verify Email', (done) => {
    request(app).patch('/api/auth/verify?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbmVAZ21haWwuY29tIiwiaWF0IjoxNjUyMDg0OTA0fQ.v5gHev_T6kHLavk88B-YDOoD-w4HewhldXjDElW2Tk4')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Your account is verified successfully');
        return done();
      });
  });
});

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
      email: 'jane@gmail.com',
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

describe('get User Info', () => {
  test('Get User Info for profile', (done) => {
    request(app).get('/api/user/info/627c92140d0c3622573195cb').expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.name).toBe('Jane Doe');
        return done();
      });
  });
});

describe('Interview Reviews', () => {
  test('Should Throw an error if user not authenticated', (done) => {
    request(app).get('/api/user/review').expect(401).end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.message).toBe('Login First!');
      return done();
    });
  });
  test('Should throw an error if page query is not valid', (done) => {
    request(app).get('/api/user/review?page=a').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.message).toBe('"page" must be a number');
      return done();
    });
  });

  test('Should throw an error if saved query is not valid', (done) => {
    request(app).get('/api/user/review?saved=potato').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.message).toBe('"saved" must be a boolean');
      return done();
    });
  });

  test('Should return Reviews found', (done) => {
    request(app).get('/api/user/review').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).end((err, res) => {
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

describe('Create Interview', () => {
  test('Should return Authentication error', (done) => {
    request(app).post('/api/interview').expect(401).end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.message).toBe('Login First!');
      return done();
    });
  });

  test('Should return Validation error', (done) => {
    request(app).post('/api/interview').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).send({

      interviewerId: 123,
      date: '2022-05-09',
      time: 2,
      language: 'RUBY',
      specialization: 'BACKEND',
      questionCategory: 'Technical',

    })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe('"interviewerId" must be a string');
        return done();
      });
  });
});

describe('Create Interview', () => {
  test('Should Throw an error if user not authenticated', (done) => {
    request(app).post('/api/interview').expect(401).end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.message).toBe('Login First!');
      return done();
    });
  });

  test('Should Throw an error for wrong questionCategory', (done) => {
    request(app).post('/api/interview').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).send({
      interviewerId: '627c92140d0c3622573195cb',
      date: '2022-04-28',
      time: 14,
      language: 'JS',
      specialization: 'BACKEND',
      questionCategory: 'potato',
    })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('"questionCategory" must be one of [Technical, Analytical, Algorithms, System Design]');
        return done();
      });
  });

  test('Should Throw an error for wrong Specialization', (done) => {
    request(app).post('/api/interview').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).send({
      interviewerId: '627c92140d0c3622573195cb',
      date: '2022-04-28',
      time: 14,
      language: 'JS',
      specialization: 'POTATO',
      questionCategory: 'Technical',
    })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('"specialization" must be one of [FRONTEND, BACKEND, DEVOPS, SECURITY, DATA STRUCTURE, FULL STACK]');
        return done();
      });
  });

  test('Should Throw an error for wrong language', (done) => {
    request(app).post('/api/interview').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).send({
      interviewerId: '627c92140d0c3622573195cb',
      date: '2022-04-28',
      time: 14,
      language: 'Arabic',
      specialization: 'FRONTEND',
      questionCategory: 'Technical',
    })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('"language" must be one of [JS, PHP, C++, C#, RUBY, PYTHON, JAVA, C, GO]');
        return done();
      });
  });

  test('Should Throw an error for wrong time', (done) => {
    request(app).post('/api/interview').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).send({
      interviewerId: '627c92140d0c3622573195cb',
      date: '2022-04-28',
      time: 'LOL',
      language: 'JS',
      specialization: 'FRONTEND',
      questionCategory: 'Technical',
    })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('"time" must be a number');
        return done();
      });
  });

  test('Should Throw an error for wrong date', (done) => {
    request(app).post('/api/interview').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).send({
      interviewerId: '627c92140d0c3622573195cb',
      date: 'aha12',
      time: 12,
      language: 'JS',
      specialization: 'FRONTEND',
      questionCategory: 'Technical',
    })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('"date" must be a valid date');
        return done();
      });
  });

  test('Should Throw an error for interviewer not available on that date', (done) => {
    request(app).post('/api/interview').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).send({
      interviewerId: '627c92140d0c3622573195cb',
      date: '2022-04-01',
      time: 12,
      language: 'JS',
      specialization: 'FRONTEND',
      questionCategory: 'Technical',
    })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Interviewer is not available on this date');
        return done();
      });
  });

  test('Should Throw an error for interviewer not available on that time', (done) => {
    request(app).post('/api/interview').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).send({
      interviewerId: '627c92140d0c3622573195cb',
      date: '2022-04-28',
      time: 20,
      language: 'JS',
      specialization: 'FRONTEND',
      questionCategory: 'Technical',
    })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Interviewer is not available on this time');
        return done();
      });
  });

  test('Should create an interview', (done) => {
    request(app).post('/api/interview').set('Cookie', [`token=${process.env.TEST_TOKEN}`]).send({
      interviewerId: '627c92140d0c3622573195cb',
      date: '2022-04-28',
      time: 14,
      language: 'JS',
      specialization: 'FRONTEND',
      questionCategory: 'Technical',
    })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe('Interview created successfully');
        return done();
      });
  });
});
afterAll(() => mongoose.connection.close());
