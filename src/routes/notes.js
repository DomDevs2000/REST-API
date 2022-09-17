const express = require('express');
const router = express.Router();
const Note = require('../models/notes.schema');

router.get('/', async (req, res) => {
	try {
		const notes = await Note.find({})
			.sort()
			.skip(req.query.page)
			.limit(req.query.limit);
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: 'Could Not Retrieve Notes' });
	}
});

router.get('/id/:id', async (req, res) => {
	try {
		const notes = await Note.findById(req.params.id)
			.sort()
			.skip(req.query.page)
			.limit(req.query.limit);
		res.status(200).json(notes);
	} catch (error) {
		res
			.status(400)
			.send({ message: `No Notes Found With the ID: ${req.params.id}` });
	}
});

router.get('/title/:title', async (req, res) => {
	try {
		const notes = await Note.findOne({ title: req.params.title });
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.send({ message: `No Notes Found With the Title: ${req.params.title}` });
	}
});

router.get('/content/:content', async (req, res) => {
	try {
		const notes = await Note.findOne({ content: req.params.content });
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res.status(400).send({
			message: `No Notes Found With The Content Containing: ${req.params.content}`,
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const notesToBeCreated = req.body;
		const notes = await Note.create(notesToBeCreated);
		res.status(201).json(notes);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Could Not Create Note' });
	}
});

router.put('/:id', async (req, res) => {
	try {
		console.log(req.body, req.params.id);

		const updateNoteById = await Note.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			content: req.body.content,
		});
		res.status(200).json(updateNoteById);
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.send({ message: `Could not update note with id  + req.params.id + ` });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const notes = await Note.findById(req.params.id);
		if (notes) {
			await notes.delete();
			res.status(202).json(`message with id of: ${req.params.id} deleted`);
		} else {
			res.status(404).json(`not found`);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'error deleting note' });
	}
});
module.exports = router;

module.exports = router;
