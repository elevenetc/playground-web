/**
 * Created by eleven on 11/06/2016.
 */

class Modules {

	static getThree() {
		return require('../../bower_components/three.js/build/three.min');
	}

	static getAnimator() {
		if (Modules.BUILD_TYPE === Modules.TEST || Modules.BUILD_TYPE === Modules.DEBUG_NODE) {
			return require('./animation/Animator');
		} else {
			return require('../../bower_components/tween.js/src/Tween').Tween;
		}
	}

	static getAnimatorUpdate() {
		return require('../../bower_components/tween.js/src/Tween');
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

	static getObjectCreator() {
		if (Modules.BUILD_TYPE === Modules.TEST || Modules.BUILD_TYPE === Modules.DEBUG_NODE) {

			var result = {
				position: {
					x: 0,
					y: 0,
				},

				traverse: function () {

				}
			};

			return {
				box: function () {
					return result;
				},

				matrix: function () {
					return result;
				},

				plane: function () {
					return result;
				}
			}
		} else {
			return require('../common/CreateObj');
		}
	}

}
Modules.DEBUG_NODE = 'debug_node';
Modules.DEBUG_BROWSER = 'debug_browser';
Modules.TEST = 'test';
Modules.BUILD_TYPE = Modules.DEBUG_BROWSER;

module.exports = Modules;