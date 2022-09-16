const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { urlencoded, json } = require('body-parser');
const app = express();
const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	body: {
		type: String,
		required: true,
		minlength: 10,
	},
	__v: {
		/* Removes Version Number*/ type: Number,
		select: false,
	},
});

// -----
app.use(urlencoded({ extended: true }));
app.use(json());

async function database() {
	mongoose.connect(process.env.MONGO_URL);
	console.log('Connected To MongoDB');
}

const Note = mongoose.model('Note', noteSchema);

//  TEST NOTE -- make hundreds in separate folder
// ________________________________
// const TestNote = new Note({
// 	title: 'Note Test',
// 	body: 'this is a test',
// });
// console.log(TestNote);
// ---------------------------------

// ---------------- ROUTES
app.get('/note', async (req, res) => {
	try {
		const notes = await Note.find({})
			.sort()
			.skip(req.query.page)
			.limit(req.query.limit);
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res.send({ message: 'Could Not Retrieve Notes' });
		res.status(500);
	}
});

// get note by ID
app.get('/note/:id', async (req, res) => {
	try {
		const notes = await Note.findById(req.params.id)
			.sort()
			.skip(req.query.page)
			.limit(req.query.limit);
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.send({ message: `No Notes Found With the ID: ${req.params.id}` });
	}
});
app.post('/note', async (req, res) => {
	try {
		const notesToBeCreated = req.body;
		const notes = await Note.create(notesToBeCreated);
		res.status(201).json(notes);
	} catch (error) {
		res.status(500).send({ message: 'Could Not Create Note' });
		console.log(error);
	}
});

database()
	.then(async (connection) => {
		app.listen(process.env.PORT, () => console.log('Server Running...'));
	})
	.catch((e) => console.log(e));
