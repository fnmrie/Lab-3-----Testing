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
  describe('POST /api/admin/signup', () => {
    it('should create a new admin', async () => {
      const res = await request(app)
        .post('/api/admin/signup')
        .send({
          username: 'Admin02',
          password: 'idk01',
          role: 'ADMIN'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('POST /api/admin/login', () => {
    it('should login admin and return a token', async () => {
      const res = await request(app)
        .post('/api/admin/login')
        .send({
          username: 'admin01',
          password: 'admin-01'
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

