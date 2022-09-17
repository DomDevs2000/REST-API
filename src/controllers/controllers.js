const Note = require('server.js');
const createNote = (req, res) => {
	const newNote = new Note({
		title: req.body.title,
	});
};

module.exports = { createNote };
