import { registerUser, loginUser, defaultUser } from './testUtils.js';
import mongoose from 'mongoose';
import User from '../models/usuario.model.js';


beforeAll(async () => {
  await User.deleteMany({})
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Endpoints', () => {

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await registerUser();
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
    });

    it('should not register a user with an existing email', async () => {
      const res = await registerUser();
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("User already exists");
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in a user with valid credentials', async () => {
      const res = await loginUser();
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.message).toBe('Login successful');
    });

    it('should not log in a user with invalid credentials', async () => {
      const res = await loginUser(defaultUser.email, "wrongPassword");
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});


