# jaas-node-client
Node client for JAAS api - https://jaas.tech/

##Install
```
npm install jaas-node
```

##Usage
```
var jaas = require("jaas-node");
```

###Create json document
```
jaas.post(json_doc, function(err, data) {
	if(err) return console.log('Error: ' + err);
	console.log(data);
})
```

###Read json document
```
jaas.get(id, function(err, data) {
	if(err) return console.log('Error: ' + err);
	console.log(data);
})
```

###Update json document
```
jaas.put(id, json_doc, function(err, data) {
	if(err) return console.log('Error: ' + err);
	console.log(data);
})
```

###Delete json document
```
jaas.delete(id, function(err, data) {
	if(err) return console.log('Error: ' + err);
	console.log(data);
})
```
