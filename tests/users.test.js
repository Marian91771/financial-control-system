// const request = require('supertest');
// const app = require('../app');

// require('dotenv').config();

// describe('GET /users', () => {
//     it('should return all users', async () => {
//         const res = await request(app).get('/users');
//         expect(res.statusCode).toBe(200);
//         expect(res.body.length).toBeGreaterThan(0);
//     });
// });

// describe('POST /users/new', () => {
//     it('should add a user', async () => {
//         const res = await request(app).post('/users/new').send({
//             firstName: 'TestFirstName',
//             lastName: 'TestLastName',
//             email: 'test@b.com',
//         });
//         expect(res.statusCode).toBe(201);
//         expect(res.body.email).toBe('test@b.com');
//     });
// });

//  Maks
const request = require('supertest');
const app = require('../app');

describe('Users API', () => {
    it('GET /users — should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toEqual(200);
        // expect(res.body).toBeInstanceOf(Array);
    });

    it('DELETE /users/delete/:id — should delete user by id', async () => {
        const testId = 3; // заміни на ID, який точно є в БД
        const res = await request(app).delete(`/users/delete/${testId}`);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User deleted successfully');
    });
});
