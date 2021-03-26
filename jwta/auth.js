const config = require('./config');
const User = require('./user_model').User;
const jwt = require('jsonwebtoken');

const new_token = user => {
	return jwt.sign({ id: user.id }, config.secret.jwt, {
		expiresIn: config.secret.jwtExp,
	});
};

const verify_token = token =>
	new Promise((resolve, reject) => {
		jwt.verify(token, config.secret.jwt, (err, payload) => {
			if (err) {
				return reject(err);
			} else {
				resolve(payload);
			}
		});
	});

const signup = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).send({ message: 'Email and Password Required.' });
	}
	try {
		const user = await User.create(req.body);
		const token = new_token(user);
		res.status(201).send({ token });
	} catch (e) {
		console.log(e);
		res.status(400).end();
	}
};

const signin = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).send({ message: 'Email and Password Required.' });
	}
	const user = await User.findOne({ email: req.body.email }).exec();

	if (!user) {
		return res.status(401).end();
	}

	try {
		const match = user.checkPassword(req.body.password);
		if (!match) {
			res.status(401).send({ message: 'Not auth' });
		}
		const token = new_token(user);
		return res.status(200).send({ token });
	} catch (e) {
		console.error(e);
		res.status(400).send({ message: 'Not auth' });
	}
};

const protect = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).end();
	}
	let token = req.headers.authorization.split('Bearer');
	if (!token) {
		return res.status(401).end();
	}
	try {
		const payload = await verify_token(token);
		const user = await User.findById(payload.id).select('-password').lean().exec();
		req.user = user;
		next();
	} catch (e) {
		console.err(e);
		return res.status(401).end();
	}
};

module.exports = {
	new_token,
	verify_token,
	signup,
	signin,
	protect,
};
