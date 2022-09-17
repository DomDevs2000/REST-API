const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},

	content: {
		type: String,
		required: true,
		minlength: 5,
	},
	__v: {
		/* Removes Version Number*/ type: Number,
		select: false,
	},
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
