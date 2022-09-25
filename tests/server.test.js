const app = require('../src/app.js');
const request = require('supertest');
const model = require('../src/models/notes.schema.js');

const mockingoose = require('mockingoose');

describe('GET /notes', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});
	it('should respond with a 200 status', async () => {
		const res = await request(app).get('/notes');
		expect(res.status).toBe(200);
	});

	it('should respond with content type of JSON', async () => {
		const res = await request(app).get('/notes');
		expect(res.headers['content-type']).toEqual(
			expect.stringContaining('json')
		);
	});

	it('get note by id', async () => {
		const expectedDoc = {
			_id: '632a25286540a9d1f723b178',
			title: 'testnote',
			content: 'testnote',
		};

		mockingoose(model).toReturn(expectedDoc, 'findOne');
		const res = await request(app).get('/notes/id/632a25286540a9d1f723b178');

		expect(res.status).toBe(200);
		expect(res.body.title).toEqual('testnote');
		expect(res.body.content).toEqual('testnote');
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
			content: 'testtitle',
		};

		mockingoose(model).toReturn(expectedDoc, 'findOne');

		const res = await request(app).get('/notes/content/testtitle');
		expect(res.status).toBe(200);
		expect(res.body.title).toEqual('testtitle');
		expect(res.body.content).toEqual('testtitle');

		expect(res.status).toBe(200);
		expect(res.body.title).toEqual('testtitle');
		expect(res.body.content).toEqual('testtitle');
	});
	it('should error if no note by title found', async () => {
		const res = await request(app).get('/notes/title/');
		expect(res.status).toBe(404);
	});

	it('get note by content', async () => {
		const expectedDoc = {
			_id: '632a25286540a9d1f723b178',
			title: 'testcontent',
			content: 'testcontent',
		};
		mockingoose(model).toReturn(expectedDoc, 'findOne');

		const res = await request(app).get('/notes/content/testcontent');
		expect(res.status).toBe(200);
		expect(res.body.title).toEqual('testcontent');
		expect(res.body.content).toEqual('testcontent');
	});

	it('should error if no note by content found', async () => {
		const res = await request(app).get('/notes/content/');
		expect(res.statusCode).toBe(404);
	});
});

describe('POST /notes', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});
	it('should create new note with title/content', async () => {
		const expectedDoc = {
			_id: '632a25286540a9d1f723c178',
			title: 'testPOST',
			content: 'testPOST',
		};
		mockingoose(model).toReturn(expectedDoc, 'create');

		const res = await request(app)
			.post('/notes')
			.send({
				title: 'testPOST',
				content: 'testPOST',
			})
			.set('Accept', 'application/json');

		expect(res.status).toBe(201);
		expect(res.body.title).toEqual('testPOST');
		expect(res.body.content).toEqual('testPOST');
	});

	it('should error if body length is less than 5', async () => {
		const res = await request(app)
			.post('/notes')
			.send({
				title: 'Testing',
				content: 'Testing',
			})
			.set('Accept', 'application/json');
		expect(res.status).toBe(400);
		// expect(res.body).toEqual({
		// 	message: 'Could Not Create Note',
		// });
	});

	it('should not post if note exists with existing title', async () => {
		const res = await await request(app)
			.post('/notes')
			.send({
				title: 'abcdef',
				content: 'abcdef',
			})
			.set('Accept', 'application/json');
		expect(res.status).toBe(400);
	});
});

// // NOTE UPDATED ON FIRST TEST RUN SO CANNOT REPEAT
// // DOESNT RETURN UPDATED -- RETURNS NON UPDATED NOTE THEN UPDATES

describe('PUT /notes', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});
	it('update note by id', async () => {
		// arrange
		const expectedDoc = {
			_id: '507f191e810c19729de860ea',
			title: 'updatednote',
			content: 'updatedcontent',
		};
		mockingoose(model).toReturn(expectedDoc, 'findOneAndUpdate');
		// act
		const res = await request(app)
			.put('/notes/507f191e810c19729de860ea')
			.send({
				title: 'updatednote',
				content: 'updatedcontent',
			})
			.set('Accept', 'application/json');
		// assert
		expect(res.status).toBe(200);
		expect(res.body.title).toEqual('updatednote');
		expect(res.body.content).toEqual('updatedcontent');
	});
});

// // NOTE DELETED ON FIRST TEST RUN SO CANNOT REPEAT
describe('DELETE /notes', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});
	it('should check if note by id exists', async () => {
		const expectedDoc = {
			_id: '632a25286540a9d1f723b178',
			title: 'updatednote',
			content: 'updatedcontent',
		};
		mockingoose(model).toReturn(expectedDoc, 'findOne');
		const res = await request(app).get('/notes/id/632a25286540a9d1f723b178');

		expect(res.status).toBe(200);
	});
	it('should check if no note found by id', async () => {
		const res = await request(app).get('/notes/fakeid');
		expect(res.status).toBe(404);
	});
	// cannot delete as it already deleted on first test run
	it('delete note by id', async () => {
		const expectedDoc = {
			_id: '632a25286540a9d1f723b178',
			title: 'updatednote',
			content: 'updatedcontent',
		};
		mockingoose(model).toReturn(expectedDoc, 'findOneAndRemove');
		const res = await request(app).delete('/notes/632a25286540a9d1f723b178');
		expect(res.status).toEqual(202);
	});
});
