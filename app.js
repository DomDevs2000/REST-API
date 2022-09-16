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

	content: {
		type: String,
		required: true,
	},
	__v: {
		/* Removes Version Number*/ type: Number,
		select: false,
	},
});

// ----------------------------------------------------------------
app.use(urlencoded({ extended: true }));
app.use(json());
//-----------------------------------------------------------------
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

// ---------------- ROUTES --------------------------------

//get all notes
app.get('/notes', async (req, res) => {
	try {
		const notes = await Note.find({})
			.sort()
			.skip(req.query.page)
			.limit(req.query.limit);
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Could Not Retrieve Notes' });
	}
});

// get note by ID
app.get('/notes/id/:id', async (req, res) => {
	try {
		const notes = await Note.findById(req.params.id)
			.sort()
			.skip(req.query.page)
			.limit(req.query.limit);
		res.status(200).json(notes);
	} catch (error) {
		res
			.status(500)
			.send({ message: `No Notes Found With the ID: ${req.params.id}` });
	}
});

// get note by title---------

app.get('/notes/:title', async (req, res) => {
	try {
		const notes = await Note.findOne({ title: req.params.title });
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send({ message: `No Notes Found With the Title: ${req.params.title}` });
	}
});

// get note by body----------

app.get('/notes/:content', async (req, res) => {
	try {
		const notes = await Note.findOne({ content: req.params.content });
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: `No Notes Found With The Content Containing: ${req.params.content}`,
		});
	}
});

app.post('/notes', async (req, res) => {
	try {
		const notesToBeCreated = req.body;
		const notes = await Note.create(notesToBeCreated);
		res.status(201).json(notes);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Could Not Create Note' });
	}
});

// UPDATE NOTE --------------------------------
app.put('/notes/:id', async (req, res) => {
	try {
		const updateNoteById = await Note.findByIdAndUpdate(req.params.id, {
			title: req.params.title,
			content: req.params.content,
		});
		res.status(200).json(updateNoteById);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send({ message: `Could not update note with id  + req.params.id + ` });
	}
});
//DELETE NOTE --- NOT WORKING

app.delete('/notes/:title', async (req, res) => {
	const deleteNote = await Note.findOneAndDelete(req.params.title);
	res.send(deleteNote);
	res.status(202).json(`message with id of: ${req.params.title} deleted`);
});

//----------------------------------------------------------------
database()
	.then(async (connection) => {
		app.listen(process.env.PORT, () => console.log('Server Running...'));
	})
	.catch((error) => console.log(error));
