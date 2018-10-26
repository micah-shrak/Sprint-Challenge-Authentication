const axios = require('axios');

const { authenticate } = require('./middlewares');

const bcrypt = require('bcryptjs');

const db = require('../database/dbConfig.js');

module.exports = (server) => {
	server.get('/', sanityCheck);
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};

// Sanity Check
function sanityCheck(req, res) {
	res.send('Got Jokes!');
}

function register(req, res) {
	// implement user registration
	const creds = req.body;
	const hash = bcrypt.hashSync(creds.password, 10);
	creds.password = hash;

	db('users')
		.insert(creds)
		.then((ids) => {
			const id = ids[0];
			res.status(201).json({ newUserId: id });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
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
