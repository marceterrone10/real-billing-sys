import request from 'supertest';
import app from '../../../index.js';
import mongoose from 'mongoose';

describe('Auth Endpoints', () => {
  it('Debería registrar un usuario nuevo', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nombre: "Marcezika",
        email: "asb123@example.com",
        password: "Abc12345",
        rol: "cliente"
      });

    console.log(res.body); // Log the response body for debugging

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
