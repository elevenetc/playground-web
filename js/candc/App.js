/**
 * Created by eleven on 15/05/2016.
 */
var Modules = require('./Modules');
var SampleCompositor = require('./compositors/SampleCompositor');

class App {

	constructor() {
		this.compositor = null;
		/** @type {BaseView} */
		this.view = null;
	}

	init() {
		this.view = Modules.getView();
		this.view.init();
		this.composeScene();
		this.renderScene();
	}

	composeScene() {
		this.compositor = new SampleCompositor();
		this.compositor.addToScene(this.view.getScene());
	}

	renderScene() {
		this.compositor.update();
		var ref = this;
		this.view.render(ref);
	}

	toString() {
		return "CandC app";
	}
}

module.exports = App;