var request = require('request');
var API_URL = 'https://api.jaas.tech';

module.exports = {

	API_KEY: null,

	response: function(cb) {
		return function(error, response, body) {
			if (!error && response.statusCode == 200) {
				try {
					var data = JSON.parse(body);
				} catch (err) {
					cb(err);
				}
				return cb(null, data);
			} else return cb(error);
		}
	},

	ping: function(cb) {
		request(API_URL+'/ping', this.response(cb))
	},

	get: function(id, cb) {
		if(!id)
			throw ('ID is missing');
		request(API_URL+'/{id}'.replace('{id}', id), this.response(cb))
	},

	post: function(obj, cb) {
		if(!obj)
			throw ('json is missing');
		var options = {
			method: 'post',
			body: JSON.stringify(obj),
			headers: { 'Content-Type': 'application/json' },
			url: API_URL
		}
		request(options, this.response(cb))
	},

	put: function(id, obj, cb) {
		if(!id)
			throw ('ID is missing');
		if(!obj)
			throw ('json is missing');
		var options = {
			method: 'put',
			body: JSON.stringify(obj),
			headers: { 'Content-Type': 'application/json' },
			url: API_URL+'/{id}'.replace('{id}', id)
		}
		request(options, this.response(cb))
	},

	delete: function(id, cb) {
		if(!id)
			throw ('ID is missing');
		var options = {
			method: 'delete',
			url: API_URL+'/{id}'.replace('{id}', id)
		}
		request(options, this.response(cb))
	}

}