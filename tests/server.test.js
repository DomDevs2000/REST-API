const app = require('../src/server.js');
const request = require('supertest');

// EXPECT RES.SENDS KEEP RETURNING UNDEFINED -- FIX

describe('GET /notes', () => {
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
		const res = await request(app).get('/notes/id/6324e2de5beb02f625bd0687');
		expect(res.status).toBe(200);
		expect(res.body.title).toEqual('test123');
		expect(res.body.content).toEqual('note123');
	});
	it('should error if no note found by id', async () => {
		const res = await request(app).get('/id/iiii');
		expect(res.status).toBe(404);
	});

	it('should get note by title', async () => {
		const res = await request(app).get('/notes/title/testnote');
		expect(res.status).toBe(200);
		expect(res.body.title).toEqual('testnote');
		expect(res.body.content).toEqual('testnote');
	});
	it('should error if no note by title found', async () => {
		const res = await request(app).get('/notes/title/');
		expect(res.status).toBe(404);
	});

	it('get note by content', async () => {
		const res = await request(app).get('/notes/content/testnote');
		expect(res.statusCode).toBe(200);
		expect(res.body.title).toEqual('testnote');
		expect(res.body.content).toEqual('testnote');
	});

	it('should error if no note by content found', async () => {
		const res = await request(app).get('/notes/content/');
		expect(res.statusCode).toBe(404);
	});
});

describe('POST /notes', () => {
	it('should create new user with title/content', async () => {
		const res = await request(app)
			.post('/notes')
			.send({
				title: 'Testing',
				content: 'Testing',
			})
			.set('Accept', 'application/json');

		expect(res.status).toBe(201);
		expect(res.body.title).toEqual('Testing');
		expect(res.body.content).toEqual('Testing');
	});

	it('should error if body length is less than 5', async () => {
		const res = await request(app)
			.post('/notes')
			.send({
				title: 'Test',
				content: 'T',
			})
			.set('Accept', 'application/json');
		expect(res.status).toBe(400);
		// expect(res.send).toBe({
		// 	message: 'Could Not Create Note - Content Must Be More Than 5 Characters',
		// });
	});
});

// NOTE UPDATED ON FIRST TEST RUN SO CANNOT REPEAT
// DOESNT RETURN UPDATED -- RETURNS NON UPDATED NOTE THEN UPDATES
describe('PUT /notes', () => {
	it('update note by id', async () => {
		const res = await request(app)
			.put('/notes/6325abc08ad2dcd4264de870')
			.send({
				title: 'updatednote',
				content: 'updatedcontent',
			})
			.set('Accept', 'application/json');
		expect(res.status).toBe(200);
		expect(res.body.title).toEqual('updatednote');
		expect(res.body.content).toEqual('updatedcontent');
	});
});

// NOTE DELETED ON FIRST TEST RUN SO CANNOT REPEAT
describe('DELETE /notes', () => {
	it('should check if note by id exists', async () => {
		// returns 404 when note exists in database
		const res = await request(app).get('/notes/6324e2de5beb02f625bd0687');

		expect(res.status).toBe(200);
	});
	it('should check if no note found by id', async () => {
		const res = await request(app).get('/notes/fakeid');
		expect(res.status).toBe(404);
	});
	// cannot delete as it already deleted on first test run
	it('delete note by id', async () => {
		const id = '632a25286540a9d1f723b178';
		const res = await request(app).delete('/notes/632a25286540a9d1f723b178');
		expect(res.status).toEqual(202);
	});
});
