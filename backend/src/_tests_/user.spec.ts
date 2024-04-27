// ./src/routes/__tests__/userRoutes.test.ts

import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from '../routes/userRoutes';

const app = express();
app.use('/', userRoutes);

// Mock Prisma client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      }),
    },
  })),
}));

describe('GET /api/users/user', () => {
  it('should return a user\'s name and email', async () => {
    const response = await request(app).get('/user');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    });
  });
});
