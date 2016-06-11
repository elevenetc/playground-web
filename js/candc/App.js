/**
 * Created by eleven on 15/05/2016.
 */
var THREE = require('../../bower_components/three.js/build/three.min');
var Modules = require('./Modules');
var SampleCompositor = require('./compositors/SampleCompositor');

class App {

	constructor() {
		this.compositor = null;
		/**
		 *
		 * @type {BaseView}
		 */
		this.view = null;
	}

	init() {
		this.view = Modules.getView();
		this.composeScene();
		this.renderScene();
	}

	composeScene() {
		this.compositor = new SampleCompositor();
		this.compositor.addToScene(this.view.getScene());
	}

	renderScene() {

		this.compositor.update();
		//view.render
	}

	toString() {
		return "CandC app";
	}
}

module.exports = App;