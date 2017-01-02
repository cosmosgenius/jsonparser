const jsonparser = require('.');

function req(type, body){
    return {
        headers: {
            'content-type': type || '',
            'content-length' : body ? body.length : 0
        },
        body : body || null
    };
}

describe('jsonparser', function() {
    it('should exist', function() {
        expect(jsonparser).toBeDefined();
    });

    it('should return a function', function() {
        expect(jsonparser()).toBeInstanceOf(Function);
    });

    it('should fail if invalid json data with status code 400', function(done){
        const json = { hello: 'world' };
        const invalidJson = JSON.stringify(json) + '[]';
        const reqObj = req('application/json', invalidJson);
        const instance = jsonparser();
        instance(reqObj, null, function(err){
            expect(err).toBeDefined();
            expect(err.status).toEqual(400);
            expect(err.message).toBeDefined();
            done();
        });
    });

    it('should pass for valid json data', function(done){
        const json = { hello: 'world'};
        const validJson = JSON.stringify(json);
        const reqObj = req('application/json', validJson);
        const instance = jsonparser();
        instance(reqObj, null, function(err){
            if(err) {
                return done(err);
            }
            expect(reqObj.json).toEqual(json);
            done();
        });
    });
});

describe('jsonparser non-strict', function(){
    it('should neglect content type', function(done){
        const json = { hello: 'world'};
        const validJson = JSON.stringify(json);
        const reqObj = req('formdata', validJson);
        const instance = jsonparser();
        instance(reqObj, null, function(err){
            if(err) {
                return done(err);
            }
            expect(reqObj.json).toEqual(json);
            done();
        });
    });
});

describe('jsonparser strict', function(){
    it('should fail if content type is not json with 415 status code',function(done){
        const json = { hello: 'world' };
        const validJson = JSON.stringify(json);
        const instance = jsonparser({strict: true});
        instance(req('text/*', validJson), null, function(err){
            expect(err.status).toEqual(415);
            expect(err.message).toBeDefined();
            done();
        });
    });

    it('should pass if content type is json and is valid', function(done){
        const json = {hello:'world'};
        const validJson = JSON.stringify(json);
        const reqObj = req('application/json', validJson);
        const instance = jsonparser({strict: true});
        instance(reqObj, null, function(err){
            if(err) {
                return done(err);
            }
            expect(reqObj.json).toEqual(json);
            done();
        });
    });
});

describe('jsonparser non-bodyCheck', function(){
    it('should pass if body is not there', function(done){
        const instance = jsonparser();
        const reqObj = req('application/json');
        instance(reqObj, null, function(err){
            if(err) {
                return done(err);
            }
            expect(reqObj.json).toBeNull();
            done();
        });
    });
});

describe('jsonparser bodyCheck', function(){
    it('should pass if body is not preset', function(done){
        const instance = jsonparser({bodyCheck:true});
        const reqObj = req('application/json');
        instance(reqObj, null, function(err){
            expect(err.status).toEqual(400);
            expect(err.message).toBeDefined();
            done();
        });
    });

    it('should pass if body is a validJson', function(done){
        const json = { hello: 'world' };
        const validJson = JSON.stringify(json);
        const reqObj = req('application/json', validJson);
        const instance = jsonparser({bodyCheck:true});
        instance(reqObj, null, function(err){
            if(err) {
                return done(err);
            }
            expect(reqObj.json).toEqual(json);
            done();
        });
    });
});
