/**
 * Created by eleven on 15/05/2016.
 */
var ViewComponent = require('./ViewComponent');
var Modules = require('../Modules');

class PlaneViewComponent extends ViewComponent {

	constructor(xSize, ySize) {
		super();
		super.setView(Modules.getObjectCreator().matrix(xSize, ySize));
	}
}

module.exports = PlaneViewComponent;