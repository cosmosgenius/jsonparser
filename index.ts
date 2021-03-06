declare const is:any;
import * as http from 'http';
import * as express from 'express';
import * as util from 'util';
import * as is from 'type-is';

/**
 * Messages to be used
 * @type {Object}
 */
const messages = {
    'contentType' : 'Unexpected Content-Type "%s", expecting "application/json".',
    'parseError': 'Problems parsing JSON',
    'emptyBody' : 'Request body is empty'
};

/**
 * Check if a request has a request body.
 *
 * @param {Object} request
 * @return {Boolean}
 * @api public
 */

function hasbody(req: express.Request) {
    return !!req.body;
}

declare namespace jsonparser {
    export interface JsonParserOptions {
        strict?: Boolean,
        bodyCheck?: Boolean,
        type?: String
    }
}

declare module "express" {
    interface Request {
        json: Object,
        body: string
    }
}

interface JsonParserError extends Error {
    status: Number
}

function jsonparser({ strict=false, bodyCheck=false, type='json'}: jsonparser.JsonParserOptions = {}) {
    return <express.RequestHandler>function (req: express.Request, res, next): any {
        var err: JsonParserError;

        if(strict && !is(req, type)) {
            const msg = util.format(messages.contentType, req.headers['content-type']);
            err = <JsonParserError>new Error(msg);
            err.status = 415;
            return next(err);
        }

        if(bodyCheck && !hasbody(req)) {
            err = <JsonParserError>new Error(messages.emptyBody);
            err.status = 400;
            return next(err);
        }

        try {
            req.json = JSON.parse(req.body);
        } catch (e) {
            err = <JsonParserError>new Error(messages.parseError);
            err.status = 400;
            return next(err);
        }
        next();
    };
}

export = jsonparser;
