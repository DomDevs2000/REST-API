//@ts-ignore
import { app } from '../src/app';
import request from 'supertest';
import { Note as model } from '../src/models/notes.schema';
import mockingoose from 'mockingoose';
describe('GET /notes', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    it('should respond with a 200 status', async () => {
        const res = await request(app).get('/notes');
        expect(res.status).toBe(200);
    });
    it('should respond with body type of JSON', async () => {
        const res = await request(app).get('/notes');
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    it('get note by id', async () => {
        const expectedDoc = {
            _id: '632a25286540a9d1f723b178',
            title: 'testnote',
            body: 'testnote',
        };
        mockingoose(model).toReturn(expectedDoc, 'findOne');
        const res = await request(app).get('/notes/id/632a25286540a9d1f723b178');
        expect(res.status).toBe(200);
        expect(res.body.title).toEqual('testnote');
        expect(res.body.body).toEqual('testnote');
    });
    it('should error if no note found by id', async () => {
        const invalidId = 'iiii';
        const res = await request(app).get(`/id/${invalidId}`);
        expect(res.status).toBe(404);
    });
    it('should get note by title', async () => {
        const expectedDoc = {
            _id: '632a25286540a9d1f723b178',
            title: 'testtitle',
            body: 'testtitle',
        };
        mockingoose(model).toReturn(expectedDoc, 'findOne');
        const res = await request(app).get('/notes/body/testtitle');
        expect(res.status).toBe(200);
        expect(res.body.title).toEqual('testtitle');
        expect(res.body.body).toEqual('testtitle');
        expect(res.status).toBe(200);
        expect(res.body.title).toEqual('testtitle');
        expect(res.body.body).toEqual('testtitle');
    });
    it('should error if no note by title found', async () => {
        const res = await request(app).get('/notes/title/');
        expect(res.status).toBe(404);
    });
    it('get note by body', async () => {
        const expectedDoc = {
            _id: '632a25286540a9d1f723b178',
            title: 'testcontent',
            body: 'testcontent',
        };
        mockingoose(model).toReturn(expectedDoc, 'findOne');
        const res = await request(app).get('/notes/body/testcontent');
        expect(res.status).toBe(200);
        expect(res.body.title).toEqual('testcontent');
        expect(res.body.body).toEqual('testcontent');
    });
    it('should error if no note by body found', async () => {
        const res = await request(app).get('/notes/body/');
        expect(res.statusCode).toBe(404);
    });
});
describe('POST /notes', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    it('should create new note with title/body', async () => {
        const expectedDoc = {
            _id: '632a25286540a9d1f723c178',
            title: 'testPOST',
            body: 'testPOST',
        };
        mockingoose(model).toReturn(expectedDoc, 'create');
        const res = await request(app)
            .post('/notes')
            .send({
            title: 'testPOST',
            body: 'testPOST',
        })
            .set('Accept', 'application/json');
        expect(res.status).toBe(201);
        expect(res.body.title).toEqual('testPOST');
        expect(res.body.body).toEqual('testPOST');
    });
});
describe('PUT /notes', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    it('update note by id', async () => {
        // arrange
        const expectedDoc = {
            _id: '507f191e810c19729de860ea',
            title: 'updatednote',
            body: 'updatedcontent',
        };
        mockingoose(model).toReturn(expectedDoc, 'findOneAndUpdate');
        // act
        const res = await request(app)
            .put('/notes/507f191e810c19729de860ea')
            .send({
            title: 'updatednote',
            body: 'updatedcontent',
        })
            .set('Accept', 'application/json');
        // assert
        expect(res.status).toBe(200);
        expect(res.body.title).toEqual('updatednote');
        expect(res.body.body).toEqual('updatedcontent');
    });
});
describe('DELETE /notes', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    it('should check if note by id exists', async () => {
        const expectedDoc = {
            _id: '632a25286540a9d1f723b178',
            title: 'updatednote',
            body: 'updatedcontent',
        };
        mockingoose(model).toReturn(expectedDoc, 'findOne');
        const res = await request(app).get('/notes/id/632a25286540a9d1f723b178');
        expect(res.status).toBe(200);
    });
    it('should check if no note found by id', async () => {
        const res = await request(app).get('/notes/fakeid');
        expect(res.status).toBe(404);
    });
    it('delete note by id', async () => {
        const expectedDoc = {
            _id: '632a25286540a9d1f723b178',
            title: 'updatednote',
            body: 'updatedcontent',
        };
        mockingoose(model).toReturn(expectedDoc, 'findOneAndRemove');
        const res = await request(app).delete('/notes/632a25286540a9d1f723b178');
        expect(res.status).toEqual(202);
    });
});
