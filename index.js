/*jslint node: true */
"use strict";
var is   = require("type-is");
var util = require("util");

/**
 * Messages to be used
 * @type {Object}
 */
var messages = {
    "contentType" : "Unexpected Content-Type '%s', expecting 'application/json'.",
    "parseError": "Problems parsing JSON",
    "emptyBody" : "Request body cannot be empty"
};

/**
 * Check if a request has a request body.
 * A request with a body __must__ either have `transfer-encoding`
 * or `content-length` headers set.
 * http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.3
 *
 * @param {Object} request
 * @return {Boolean}
 * @api public
 */

 function hasbody(req) {
    var headers = req.headers;
    if ("transfer-encoding" in headers) {
        return true;
    }
    var length = headers["content-length"];
    if (!length) {
        return false;
    }
    return !!parseInt(length, 10);
}

module.exports = function(options) {
    options = options || {};
    var strict = !!options.strict;
    var type = options.type || "json";

    return function(req, res, next) {
        var err;
        if(strict){
            if(!hasbody(req)) {
                err = new Error(messages.emptyBody);
                err.status = 400;
                return next(err);
            }

            if(!is(req, type)) {
                var msg = util.format(messages.contentType,req.headers["content-type"]);
                err = new Error(msg);
                err.status = 415;
                return next(err);    
            }
        }

        try {
            req.json = JSON.parse(req.body);
        } catch (e) {
            err = new Error(messages.parseError);
            err.status = 400;
            return next(err);
        }
        next();
    };
};