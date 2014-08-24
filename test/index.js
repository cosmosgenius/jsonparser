/*jslint node: true */
/*jshint expr: true*/
/*global describe, it, before*/
'use strict';

var jsonparser = require('../'),
    request = require('supertest'),
    bodyparser = require('simple-bodyparser'),
    http = require('http'),
    should = require('should');

var server;

function createServer(){
    var _parser = jsonparser();
    var _bodyparser = bodyparser();

    return http.createServer(function(req, res){
        _bodyparser(req, res, function(err){
            if (err) {
                res.statusCode = err.status;
                res.end(err.message);
                return;
            }
            _parser(req, res, function(err){
                if (err) {
                    res.statusCode = err.status;
                    res.end(err.message);
                    return;
                }
                res.end(JSON.stringify(req.json));
            });
        });
    });
}

describe('jsonparser', function() {
    before(function(){
        server = createServer();
    });

    it('should exist', function() {
        should.exist(jsonparser);
    });

    it('should return a function', function() {
        jsonparser().should.be.a.Function;
    });

    it('should neglect content type if strictContentType is false');

    it('should fail if content type is not json and strictContentType is true');
    
    it('should pass if content type is json and strictContentType is true');

    it('should fail if invalid json data');

    it('should pass for valid json data');
});

