const app = require('../src/server.js');
const request = require('supertest');

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
});

describe('/notes/id/:id', () => {
	it('should error if no note found by id', async () => {
		const res = await request(app).get('/id/iiii');
		expect(res.status).toBe(404);
	});
});

describe('POST /notes', () => {
	it('should create new user with title/content', async () => {
		const res = await request(app)
			.post('/notes')
			.send({
				title: 'Test',
				content: 'TestT',
			})
			.set('Accept', 'application/json');

		expect(res.status).toBe(201);
		expect(res.body.title).toEqual('Test');
		expect(res.body.content).toEqual('TestT');
	});
});
