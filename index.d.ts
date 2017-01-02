/// <reference types="node" />
import * as http from 'http';
export interface JsonParserOptions {
    strict?: Boolean;
    bodyCheck?: Boolean;
    type?: String;
}
export interface JsonParserRequest extends http.ServerRequest {
    json: Object;
    body: string;
}
export interface JsonParserError extends Error {
    status: Number;
}
declare function jsonparser({strict, bodyCheck, type}?: JsonParserOptions): (req: JsonParserRequest, res: http.ServerResponse, next: Function) => void;
export = jsonparser;
