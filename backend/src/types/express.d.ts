// ./src/types/express.d.ts (create this file if it doesn't exist)
import { User } from '@prisma/client'; // Import the User type from Prisma

declare module 'express' {
    interface Request {
        user?: User; // Extend the Request interface to include the user property
    }
}
