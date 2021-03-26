const controller = require('./controller');
const { Item } = require('./model');
const express = require('express');
const router = express.Router();
const app = express();

app.use('/api', router);

router.route('/').get(controller.get_many(Item)).post(controller.create_one(Item));

router.route('/:id').get(controller.get_one(Item)).put(controller.update_one(Item)).delete(controller.remove_one(Item));

app.listen(3000, () => {
	console.log('\n working on 3000 \n');
});
