/**
 * Created by eleven on 15/05/2016.
 */
var Modules = require('./Modules');
var FourPatrolSmallTank = require('./compositors/FourPatrolSmallTank');
var OnePatrolSmallTank = require('./compositors/OnePatrolSmallTank');

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
		// this.compositor = new FourPatrolSmallTank();
		this.compositor = new OnePatrolSmallTank();
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