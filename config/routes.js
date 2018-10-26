const axios = require('axios');

const { authenticate } = require('./middlewares');

module.exports = (server) => {
	server.get('/', sanityCheck);
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};
function sanityCheck(req, res) {
	res.send('Got Jokes!');
}
function register(req, res) {
	// implement user registration
	const creds = req.body;
	db('users').insert;
}

function login(req, res) {
	// implement user login
}

function getJokes(req, res) {
	axios
		.get(
			'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
		)
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}
