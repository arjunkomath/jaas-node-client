# jaas-node-client
Node client for JAAS api - https://jaas.tech/

##Install
```
npm install jaas-node
```

##Usage
Get your API key from https://app.jaas.tech/
```
var jaas = require("jaas-node");
jaas.init('<Your API Key>');
```

###Create a Collection
A collection is created when you put the first item into it.
```
jaas.createItem('<Collection Name>', <JSON object>, function(err, data) {
  if(err) console.log(err);
  console.log(data);
});
```

###Read a Collection
It will return an array of objects
```
jaas.collection('<Collection Name>', function(err, data) {
  if(err) console.log(err);
  console.log(data);
});
```

Read a collection with filter
```
jaas.collection('<Collection Name>', { "name" : { "like" : "matt" } }, function(err, data) {
  if(err) console.log(err);
  console.log(data);
});
```

Refer to the API docs to [read more about filters](http://docs.jaas.apiary.io/#reference/0/collections).

###Read an item in Collection
```
jaas.readItem('<Collection Name>', '<Item ID>', function(err, data) {
  if(err) console.log(err);
  console.log(data);
});
```

###Update an item in Collection
```
jaas.updateItem('<Collection Name>', '<Item ID>', <JSON object>, function(err, data) {
  if(err) console.log(err);
  console.log(data);
});
```

###Delete an item in Collection
```
jaas.deleteItem('<Collection Name>', '<Item ID>', function(err, data) {
  if(err) console.log(err);
  console.log(data);
});
```

###Help?
email arjunkomath@gmail.com
