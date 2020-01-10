const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
	mongoose.connect(config.get('db'), {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('Connected to database.'))
	.catch(err => console.error('Something went wrong...', err));
};
