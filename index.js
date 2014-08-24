/*jslint node: true */
'use strict';
var is   = require('type-is');

module.exports = function(options) {
    options = options || {};
    var strict = !!options.strictContentType;
    return function(req, res, next) {
        
        if(strict){
            var isJSON = is(req, ['json']);
            if(!isJSON){
                return next();    
            }
        }
        
        try {
            req.json = JSON.parse(req.body);
            return next();
        } catch (e) {
            next();
        }
        
    };
};