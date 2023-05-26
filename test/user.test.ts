// user.test.ts
import request from 'supertest';
import {getAllUsers, getUserById} from './mockDatabase';
import expressApp from "../src/app";

describe('User Management APIs', () => {

    let authToken: string;

    beforeAll(async () => {
        const server = await expressApp;
        const loginResponse = await request(server)
            .post('/api/auth/login')
            .send({email: 'rehmanmemon007@gmail.com', password: 'Rehman1234'})
            .expect(200);

        authToken = loginResponse.body.payload.authToken;
    });

    it('should get all users', async () => {

        const server = await expressApp

        const response = await request(server).get('/api/users/')
            .set('Authorization', `Bearer ${authToken}`).expect(200);
        expect(response.body.payload).toEqual(getAllUsers());
    });

    it('should get a user by ID', async () => {
        const server = await expressApp;
        const response = await request(server)
            .get('/api/users/3')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);

        expect(response.body.payload.user).toEqual(getUserById(3));
    });

    it('should update a user', async () => {
        const server = await expressApp;
        const updatedUser = {
            id: 3,
            name: 'Rehman Memon',
            email: 'rehmanmemon0010@gmail.com',
        };

        const response = await request(server)
            .put('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedUser)
            .expect(200);

        expect(response.body).toEqual({
            message: "Updated Successfully",
            payload: true
        });
    });
});

