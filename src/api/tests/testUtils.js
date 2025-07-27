import request from 'supertest';
import app from '../../../index.js';

export const defaultUser = {
    nombre: "Example User",
    email: "example@jest.com",
    password: "Password123",
    rol: "admin"
};

export const registerUser = async () => {
    const res = await request(app).post('/api/auth/register').send({
        nombre: defaultUser.nombre,
        email: defaultUser.email,
        password: defaultUser.password,
        rol: defaultUser.rol
    });
    return res;
};

export const loginUser = async (email = defaultUser.email, password = defaultUser.password) => {
    const res = await request(app).post('/api/auth/login').send({
        email,
        password
    });
    return res;
};
