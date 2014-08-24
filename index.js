/*jslint node: true */
'use strict';
var is   = require('type-is');
var util = require('util');

var messages = {
    'contentType' : 'Unexpected Content-Type "%s", expecting "application/json".',
    'parseError': 'Problems parsing JSON'
};

function createError(status,message){
    return {
        status : status,
        message : message
    };
}

function checkIfJson(req){
    return is(req, ['json','+json']);
}

module.exports = function(options) {
    options = options || {};
    var strict = !!options.strictContentType;
    return function(req, res, next) {
        if(strict){
            if(!checkIfJson(req)){
                return next(createError(415,util.format(messages.contentType,req.headers['content-type'])));    
            }
        }
        
        try {
            req.json = JSON.parse(req.body);
            return next();
        } catch (e) {
            next(createError(400,messages.parseError));
        }

    };
};

