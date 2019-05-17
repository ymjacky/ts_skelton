"use strict";


export interface MyCallback{(argv :string) :string};
export class HelloCb {
    cb: MyCallback;

    constructor(callback: MyCallback) {
        this.cb = callback;
    }

    exe(arg:string) {
        if (this.cb) {
            return `${arg} ${this.cb("world")}`;
        }
        return "";
    }
}

