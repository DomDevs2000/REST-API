const app = require('/Users/aidancarvalhodev/Documents/Workspace/JobReady-Projects/API/src/server.js');
const request = require('supertest');

describe('test a 200', () => {
	test('It should respond with a 200 status', async () => {
		const res = await request(app).get('/notes');
		expect(res.status).toBe(200);
	});
});

describe('finds note by id', () => {
	test('it should find a note by id', async () => {
		const res = await request(app).get('notes/id/6325abc08ad2dcd4264de870');
		expect(res.send).toBe(res);
		expect(res.status).toBe(200);
	});
});
