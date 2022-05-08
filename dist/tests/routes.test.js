"use strict";
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const config_1 = __importDefault(require("../database/config"));
beforeAll(() => (0, config_1.default)());
describe('Login', () => {
    test('Should return error with validation', (done) => {
        (0, supertest_1.default)(app_1.default).post('/api/login').send({
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
        (0, supertest_1.default)(app_1.default).post('/api/login').send({
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
        (0, supertest_1.default)(app_1.default).post('/api/login').send({
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
        (0, supertest_1.default)(app_1.default).post('/api/login').send({
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
        (0, supertest_1.default)(app_1.default).post('/api/login').send({
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
afterAll(() => mongoose_1.default.connection.close());
