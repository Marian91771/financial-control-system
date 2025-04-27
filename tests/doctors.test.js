const request = require('supertest');
const app = require('../app');

describe('Doctors API', () => {
    it('GET /doctors — should return all doctors', async () => {
        const res = await request(app).get('/doctors');
        expect(res.status).toEqual(200);
        // expect(res.body).to.be.an("array");
    });
});

it('DELETE /doctors/delete/:id — should delete doctor by id', async () => {
    const testId = 5;
    const res = await request(app).delete(`/doctors/delete/${testId}`);
    expect(res.status).toEqual(200);
    expect(res.body).to.have.property('message', 'Doctor deleted');
});
