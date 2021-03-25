const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const first = require('ee-first');
const app = express();
const item_router = require('./list_router').router;

app.use('/routing', item_router);

const log = (req, res, next) => {
	console.log('Logging');
	next();
};

const custom_middleware = (req, res, next) => {
	console.log("Hello i'm first");
	next();
};

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(custom_middleware); //Custom middleware

app.get('/data', log, (req, res) => {
	res.send({ message: 'hello' });
});

app.post('/data', (req, res) => {
	console.log(req.body);
	res.send(req.body);
});

start = () => {
	app.listen(3000, () => {
		console.log('server is on 3000');
	});
};

module.exports = {
	app,
	start,
};
