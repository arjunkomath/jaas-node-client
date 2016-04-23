var request = require('request');

module.exports = {

	API_KEY: null,

	API_URL: 'https://api.jaas.tech',

	init: function(api_key) {
		if(!api_key)
			throw ('API key is missing')
		this.API_KEY = api_key;
		this.API_URL = 'https://api.jaas.tech/private'
	},

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
		var options = {
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
			url: this.API_URL + '/ping'
		}
		if(this.API_KEY)
			options.headers = { 'Content-Type': 'application/json', 'x-jaas-token': this.API_KEY };
		request(options, this.response(cb))
	},

	get: function(id, cb) {
		if(!id)
			throw ('ID is missing');
		var options = {
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
			url: this.API_URL+'/{id}'.replace('{id}', id)
		}
		if(this.API_KEY)
			options.headers = { 'Content-Type': 'application/json', 'x-jaas-token': this.API_KEY };
		request(options, this.response(cb))
	},

	post: function(obj, cb) {
		if(!obj)
			throw ('json is missing');
		var options = {
			method: 'post',
			body: JSON.stringify(obj),
			headers: { 'Content-Type': 'application/json' },
			url: this.API_URL
		}
		if(this.API_KEY)
			options.headers = { 'Content-Type': 'application/json', 'x-jaas-token': this.API_KEY };
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
			url: this.API_URL+'/{id}'.replace('{id}', id)
		}
		if(this.API_KEY)
			options.headers = { 'Content-Type': 'application/json', 'x-jaas-token': this.API_KEY };
		request(options, this.response(cb))
	},

	delete: function(id, cb) {
		if(!id)
			throw ('ID is missing');
		var options = {
			method: 'delete',
			url: this.API_URL+'/{id}'.replace('{id}', id)
		}
		if(this.API_KEY)
			options.headers = { 'Content-Type': 'application/json', 'x-jaas-token': this.API_KEY };
		request(options, this.response(cb))
	}

}