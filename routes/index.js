const express = require('express');
const router = express.Router();
const fs = require('fs');
const sha1 = require('sha1');
let users = JSON.parse(fs.readFileSync('./etc/users.json'));

/* GET home page. */
router.get('/', function(req, res, next) {
	let id = req.query.token;
	let user;
	console.log('Receive request with ID: ', id);

	for (let key in users) {
		if (users.hasOwnProperty(key) && sha1(key) === id) {
			user = users[key]
		}
	}
  	
	if (!user) {
		console.log("User not found in JSON")
		res.send("null")
	}

	res.send(user)
});


module.exports = router;
