import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import pogsRoutes from '../routes/pogsRoutes';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(bodyParser.json());
app.use('/pogs', pogsRoutes);

describe('Pogs Routes', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /pogs/data', () => {
    it('should return all pogs', async () => {
      const response = await request(app).get('/pogs/data');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe('POST /pogs/buy', () => {
    it('should buy a pog successfully', async () => {
      // Mock user and pog
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password',
          role: 'USER',
          wallet: 1000 // Sufficient funds for test
        }
      });

      const pog = await prisma.pog.create({
        data: {
          name: 'Test Pog',
          price: 50,
          ticker_symbol: 'TEST', // Add ticker symbol
          color: 'red' // Add color
        }
      });
      

      const purchaseData = {
        userId: user.id,
        pogId: pog.id,
        price: pog.price
      };

      const response = await request(app)
        .post('/pogs/buy')
        .send(purchaseData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Pog bought successfully' });
    });
  });

  describe('POST /pogs/sell', () => {
    it('should sell a pog successfully', async () => {
      // Mock user and pog
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password',
          role: 'USER',
          wallet: 1000
        }
      });

      const pog = await prisma.pog.create({
        data: {
          name: 'Test Pog',
          price: 50,
          ticker_symbol: 'TEST', // Add ticker symbol
          color: 'red' // Add color
        }
      });
      

      const sellData = {
        userId: user.id,
        pogId: pog.id,
        price: pog.price
      };

      const response = await request(app)
        .post('/pogs/sell')
        .send(sellData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Pog sold successfully' });
    });
  });
});
