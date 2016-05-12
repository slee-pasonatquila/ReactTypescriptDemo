///<reference path="../../typings/browser.d.ts"/>
import * as jsdom from 'jsdom';
import * as chai from 'chai';
import * as chaiImmutable from 'chai-immutable';

declare var global: any;

const doc: jsdom.DocumentWithParentWindow = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win: Window = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key: string) => {
	if (!(key in global)) {
		global[key] = window[key];
	}
});

chai.use(chaiImmutable);
