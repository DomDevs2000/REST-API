import express from 'express';
const router = express.Router();
import { Note } from '../models/notes.schema.js';
import { Request, Response } from 'express';
import type { Query } from 'express-serve-static-core';
export interface TypedRequestQuery<T extends Query> extends Express.Request {
	query: T;
}
export interface TypedRequestParams<T extends Express.Request> {
	params: T;
}
export interface TypedRequestBody<T extends Express.Request> {
	body: T;
}
export interface TypedRequestPQ<T extends Query, U> extends Express.Request {
	params: U;
	query: T;
}
export interface TypedRequestBP<T extends Query, U> extends Express.Request {
	body: T;
	params: U;
}

router.get(
	'/',
	async (
		req: TypedRequestQuery<{ page: string; limit: string }>,
		res: Response
	) => {
		try {
			const notes = await Note.find({})
				.sort()
				.skip(req.query.page)
				.limit(req.query.limit);
			res.status(200).json(notes);
		} catch (error) {
			console.error(error);
			res.status(400).send({ message: 'Could Not Retrieve Notes' });
		}
	}
);

router.get(
	'/id/:id',
	async (
		req: TypedRequestPQ<{ page: string; limit: string }, { id: number }>,
		res: Response
	) => {
		try {
			const notes = await Note.findById(req.params.id)
				.sort()
				.skip(req.query.page)
				.limit(req.query.limit);

			res.status(200).json(notes);
		} catch (error) {
			console.error(error);
			res
				.status(400)
				.send({ message: `No Notes Found With the ID: ${req.params.id}` });
		}
	}
);

router.get(
	'/title/:title',
	async (req: TypedRequestParams<{ title: number }>, res: Response) => {
		try {
			const notes = await Note.findOne({ title: req.params.title });
			res.status(200).json(notes);
		} catch (error) {
			console.error(error);
			res.status(404).send({
				message: `No Notes Found With the Title: ${req.params.title}`,
			});
		}
	}
);

router.get(
	'/body/:content',
	async (req: TypedRequestParams<{ content: string }>, res: Response) => {
		try {
			const notes = await Note.findOne({ content: req.params.content });
			res.status(200).json(notes);
		} catch (error) {
			console.error(error);
			res.status(404).send({
				message: `No Notes Found With The Content Containing: ${req.params.content}`,
			});
		}
	}
);

router.post(
	'/',
	async (req: TypedRequestBody<{ body: string }>, res: Response) => {
		try {
			const notesToBeCreated = req.body;
			const notes = await Note.create(notesToBeCreated);
			res.status(201).json(notes);
		} catch (error) {
			console.error(error);
			res.status(400).send({
				message: 'Could Not Create Note',
			});
		}
	}
);

router.put('/:id', async (req: Request, res: Response) => {
	try {
		const updateNoteById = await Note.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			content: req.body.content,
			new: true,
		});
		res.status(200).json(updateNoteById);
	} catch (error) {
		console.error(error);
		res
			.status(400)
			.send({ message: `Could not update note with id ${req.params.id}` });
	}
});

router.delete(
	'/:id',
	async (req: TypedRequestParams<{ id: string }>, res: Response) => {
		try {
			const notes = await Note.findOneAndDelete({ id: req.params.id });
			res.status(202).json(`message with id of: ${req.params.id} deleted`);
		} catch (error) {
			console.error(error);
			res.status(404).send({ message: 'error deleting note' });
		}
	}
);
export { router };
