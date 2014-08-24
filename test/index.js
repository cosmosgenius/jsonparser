/*jslint node: true */
/*jshint expr: true*/
/*global describe, it, before*/
'use strict';

var jsonparser = require('../'),
    should = require('should');

function req(type,body){
    return {
        headers: {
            'content-type': type || '',
            'transfer-encoding': 'chunked'
        },
        body : body || null
    };
}

var jsonparserInstance;

describe('jsonparser', function() {
    before(function(){
        jsonparserInstance = jsonparser(); 
    });

    it('should exist', function() {
        should.exist(jsonparser);
    });

    it('should return a function', function() {
        jsonparser().should.be.a.Function;
    });

    it('should fail if invalid json data with status code 400', function(done){
        var json = {hello:'world'};
        var invalidJson = JSON.stringify(json) + '[]';
        var reqObj = req('application/json',invalidJson);
        jsonparserInstance(reqObj, null, function(err){
            should.exist(err);
            err.status.should.eql(400);
            should.exist(err.message);
            done();
        });
    });

    it('should pass for valid json data', function(done){
        var json = {hello:'world'};
        var validJson = JSON.stringify(json);
        var reqObj = req('application/json',validJson);
        jsonparserInstance(reqObj, null, function(err){
            if(err) {
                return done(err);
            }
            reqObj.json.should.eql(json);
            done();
        });
    });
});

describe('jsonparser non-strict', function(){
    before(function(){
        jsonparserInstance = jsonparser();
    });
    it('should neglect content type', function(done){
        var json = {hello:'world'};
        var validJson = JSON.stringify(json);
        var reqObj = req('formdata',validJson);
        jsonparserInstance(reqObj, null, function(err){
            if(err) {
                return done(err);
            }
            reqObj.json.should.eql(json);
            done();
        });
    });    
});

describe('jsonparser strict', function(){
    before(function(){
        jsonparserInstance = jsonparser({strictContentType: true});
    });
    
    it('should fail if content type is not json with 415 status code',function(done){
        jsonparserInstance(req('text/*'),null,function(err){
            err.status.should.eql(415);
            should.exist(err.message);
            done();
        });
    });
    
    it('should pass if content type is json', function(done){
        var json = {hello:'world'};
        var validJson = JSON.stringify(json);
        var reqObj = req('application/json',validJson);
        jsonparserInstance(reqObj, null, function(err){
            if(err) {
                return done(err);
            }
            reqObj.json.should.eql(json);
            done();
        });
    });
});


