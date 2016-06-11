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

}
Modules.DEBUG = 'debug';
Modules.RELEASE = 'release';
Modules.TEST = 'test';
Modules.BUILD_TYPE = Modules.TEST;

module.exports = Modules;