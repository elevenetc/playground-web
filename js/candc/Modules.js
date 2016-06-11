/**
 * Created by eleven on 11/06/2016.
 */

class Modules {

	static getAnimator() {
		if (Modules.BUILD_TYPE === Modules.TEST) {
			return require('./animation/Animator');
		} else {
			return require('../../bower_components/tween.js/src/Tween');
		}
	}

	static getDocument() {
		return {
			getElementById: function () {
				return {
					appendChild: function () {

					}
				}
			}
		};
		//return document;
	}

	static getView() {
		var ViewClass = null;
		if (Modules.BUILD_TYPE === Modules.DEBUG_NODE) {
			ViewClass = require('./view/BaseView');
		} else if (Modules.BUILD_TYPE == Modules.DEBUG_BROWSER) {
			ViewClass = require('./view/WebView');
		}
		return new ViewClass();
	}

}
Modules.DEBUG_NODE = 'debug_node';
Modules.DEBUG_BROWSER = 'debug_browser';
Modules.TEST = 'test';
Modules.BUILD_TYPE = Modules.DEBUG_BROWSER;

module.exports = Modules;