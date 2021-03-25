const mongoose = require('mongoose');

const item_schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 50,
		},
		status: {
			type: String,
			required: true,
			enum: ['active', 'complete', 'pastdue'],
			default: 'active',
		},
		notes: String,
		due: Date,
		createdBy: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'user',
		},
		list: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'list',
		},
	},
	{ timestamps: true }
);

item_schema.index({ list: 1, name: 1 }, { uinque: true });

const Item = mongoose.model('item', item_schema);

const connect = url => {
	return mongoose.connect(url, { useNewUrlParser: true });
};

module.exports = {
	Item,
	connect,
};