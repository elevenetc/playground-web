/**
 * Created by eleven on 15/05/2016.
 */
var ViewComponent = require('./ViewComponent');
var Modules = require('../Modules');
var CConfig = require('../CConfig');

class BoxViewComponent extends ViewComponent {

	constructor(xSize = CConfig.Unit, ySize = CConfig.Unit, color = 0x00ff00) {
		super();

		color = '#' + Math.floor(Math.random() * 16777215).toString(16);

		var view = Modules.getObjectCreator().box(xSize, ySize, CConfig.Unit);

		super.setView(view);
	}
}

module.exports = BoxViewComponent;
