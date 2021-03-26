const { connect } = require('./model');
const mongoose = require('mongoose');

const run = async () => {
	await connect('mongodb://localhost:27017/api-test');
};

run();

const get_many = model => async (req, res) => {
	const request_data = req.params.id.split('&');
	const docs = await model.find({ createdBy: request_data[1] }).exec();
	res.status(200).json({ data: docs });
};

const create_one = model => async (req, res) => {
	const doc = await model.create({
		name: 'new one',
		createdBy: mongoose.Types.ObjectId(),
		list: mongoose.Types.ObjectId(),
	});
	res.status(200).json({ data: doc });
};

const get_one = model => async (req, res) => {
	const request_data = req.params.id.split('&');
	const id = request_data[0];
	const user_id = request_data[1];
	const doc = await model
		.findOne({
			_id: id,
			createdBy: user_id,
		})
		.exec();

	if (!doc) {
		dummy_data(model);

		return res.status(404).end();
	}

	res.status(200).json({ data: doc });
};

const update_one = model => async (req, res) => {
	const request_data = req.params.id.split('&');
	const _id = request_data[0];
	const user_id = request_data[1];

	const doc = await model.findOneAndUpdate(
		{
			_id: _id,
			createdBy: user_id,
		},
		{ name: 'new name' },
		{ new: true }
	);

	if (!doc) {
		return res.status(400).end();
	}

	res.status(200).json({ data: doc });
};

const remove_one = model => async (req, res) => {
	const request_data = req.params.id.split('&');
	const _id = request_data[0];
	const user_id = request_data[1];

	const doc = await model
		.findOneAndRemove({
			_id: _id,
			createdBy: user_id,
		})
		.exec();

	if (!doc) {
		return res.status(400).end();
	}

	res.status(200).json({ data: doc });
};

module.exports = {
	get_many,
	create_one,
	get_one,
	update_one,
	remove_one,
};

async function dummy_data(model) {
	const item = await model.create({
		name: 'Done',
		createdBy: mongoose.Types.ObjectId(),
		list: mongoose.Types.ObjectId(),
	});
	console.log(item);
}

