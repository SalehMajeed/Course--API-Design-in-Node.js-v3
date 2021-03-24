const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const first = require('ee-first');
const app = express();

const router = express.Router();
const routes = ['get /cat', 'get /cat/:id', 'post /cat', 'put /cat/:id', 'delete /cat/:id'];

app.use('/api', router);

router.route('/cat').get().post();
router.route('/cat/:id').get().post().delete();

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

router.get('/route', (req, res) => {
	res.send({ route: 'connect' });
});

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
