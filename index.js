var request = require('request');

module.exports = {

	API_KEY: null,

	API_URL: 'https://api.jaas.tech/collections',
	COLLECTION_URL: 'https://api.jaas.tech/collections/{collection}',
	ITEM_URL: 'https://api.jaas.tech/collections/{collection}/{id}',

	init: function(api_key) {
		if(!api_key)
			throw new Error('API key is missing')
		this.API_KEY = api_key;
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

	collection: function(collection, where, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		var requestObj = {
			method: 'get',
			headers: {
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY,
			},
			url: this.COLLECTION_URL.replace('{collection}', collection)
		};
		if(typeof(where) == 'function')
			request(requestObj, this.response(where));
		else {
			requestObj.url = this.COLLECTION_URL.replace('{collection}', collection) + '?query=' + JSON.stringify(where);
			request(requestObj, this.response(cb));
		}
	},

	readItem: function(collection, id, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		if(!id)
			throw new Error('Item ID missing');
		var requestObj = {
			method: 'get',
			headers: {
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY,
			},
			url: this.ITEM_URL.replace('{collection}', collection).replace('{id}', id)
		};
		request(requestObj, this.response(cb));
	},

	createItem: function(collection, obj, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		if(!obj)
			throw new Error('Data missing');
		var requestObj = {
			method: 'post',
			headers: {
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY,
			},
			url: this.COLLECTION_URL.replace('{collection}', collection),
			body: JSON.stringify(obj)
		};
		request(requestObj, this.response(cb));
	},

	updateItem: function(collection, id, obj, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		if(!id)
			throw new Error('Item ID missing');
		if(!obj)
			throw new Error('Data missing');
		var requestObj = {
			method: 'put',
			headers: {
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY
			},
			body: JSON.stringify(obj),
			url: this.ITEM_URL.replace('{collection}', collection).replace('{id}', id)
		};
		request(requestObj, this.response(cb));
	},

	deleteItem: function(collection, id, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		if(!id)
			throw new Error('Item ID missing');
		var requestObj = {
			method: 'delete',
			headers: {
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY
			},
			url: this.ITEM_URL.replace('{collection}', collection).replace('{id}', id)
		};
		request(requestObj, this.response(cb));
	}

}