# jsonparser

[![NPM version](https://badge.fury.io/js/jsonparser.svg)](http://badge.fury.io/js/jsonparser)
[![Build Status](https://travis-ci.org/cosmosgenius/jsonparser.svg?branch=master)](https://travis-ci.org/cosmosgenius/jsonparser)

Gets the whole content in the request as a json to the property json

## API

```js
var jsonparser = require('jsonparser');
var app = require('express')();

app.use(jsonparser());
app.use(function(req, res, next){
  var body = req.json
});
```