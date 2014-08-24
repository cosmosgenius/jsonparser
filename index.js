/*jslint node: true */
'use strict';
var is   = require('type-is');

module.exports = function(options) {
    options = options || {};
    
    return function(req, res, next) {
        var isJSON = is(req, ['json']);

        if(!isJSON){
            return;
        }
        
        
    };
};