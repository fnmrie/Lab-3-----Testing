import request from 'supertest';
import { createServer } from '../utils/server';
import { PrismaClient } from '@prisma/client';

const app = createServer();
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Authentication Routes', () => {
  describe('POST /api/auth/signup', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'New World',
          email: 'new@example.com',
          password: 'idk01',
          role: 'USER'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user and return a token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 401 if login credentials are invalid', async () => {
      // Attempt to login with invalid credentials
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'invalid@example.com',
          password: 'invalidpassword'
        });
  
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Invalid email or password');
    });
  });  
});

