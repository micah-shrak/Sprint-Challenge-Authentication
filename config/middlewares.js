const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

// quickly see what this file exports
module.exports = {
	authenticate,
	generateToken,
};

function generateToken(user) {
	const jwtPayload = {
		...user,
		hello: 'TLS18',
		roles: ['admin', 'root'],
	};
	const jwtOptions = {
		expiresIn: '5m',
	};
	return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}

// implementation details
function authenticate(req, res, next) {
	const token = req.get('Authorization');

	if (token) {
		jwt.verify(token, jwtKey, (err, decoded) => {
			if (err) {
				return res.status(401).json(err);
			} else {
				req.decoded = decoded;
				console.log('\n** decoded token information **\n', req.decoded);
				next();
			}
		});
	} else {
		return res.status(401).json({
			error: 'No token provided, must be set on the Authorization Header',
		});
	}
}
