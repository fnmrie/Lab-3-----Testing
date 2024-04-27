// ./src/utils/server.ts

import express, { Express } from "express";
import pogsRoutes from "../routes/pogsRoutes";
import authRoutes from "../routes/authRoutes";
import userRoutes from "../routes/userRoutes";
import adminRoutes from "../routes/admins";


export function createServer(): Express {
  
  const app: Express = express();
  app.use(express.json());

  // Mount the auth routes under /api/auth
  app.use('/api/auth', authRoutes);

  app.use( "/api/pogs",  pogsRoutes);

  // Mount the pogs routes under /api/users
  app.use('/api/users', userRoutes);

  app.use('/api/admin', adminRoutes);

  return app;
}

export default createServer;
