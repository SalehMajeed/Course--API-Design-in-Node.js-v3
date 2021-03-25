const express = require('express');
const router = express.Router();

const controller = (req, res) => {
    console.log(req.params)
	res.send({ message: 'hello' });
};

router.route('/').get(controller).post(controller);

router.route('/:id').get(controller).put(controller).delete(controller);

module.exports = {
	router,
};
