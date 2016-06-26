/**
 * Created by eleven on 22/05/2016.
 */
var Composite = require('./Composite');
var PlaneViewComponent = require('./PlaneViewComponent');
var PositionComponent = require('./PositionComponent');
var DimenComponent = require('./DimenComponent');
var CConfig = require('../Config');
var GroundModel = require('./GroundModel');
var Modules = require('../Modules');
var THREE = Modules.getThree();

class Ground extends Composite {

	/**
	 * @param groundModel {GroundModel}
	 */
	constructor(groundModel) {
		super();

		/*** @type {GroundModel} */
		this.groundModel = groundModel;

		var width = groundModel.getWidth();
		var height = groundModel.getHeight();

		super.addComponent(new PlaneViewComponent(width, height));
		super.addComponent(new PositionComponent(0, 0, new DimenComponent(width, height), groundModel));
		super.compose();
	}


	update() {
		super.update();
		var viewComponent = super.getViewComponent();
		var ref = this;
		viewComponent.getView().traverse(function (object) {
			ref.updateColor(object);
		});
	}

	updateColor(object) {
		if (!(object instanceof THREE.Mesh)) return;

		var x = object.position.x / CConfig.Unit;
		var y = object.position.y / CConfig.Unit;
		var type = this.groundModel.getType(x, y);

		if (type == GroundModel.CLEAR) {
			object.material.wireframe = true;
			object.material.color.setHex(0x00ff00);
		} else if (type == GroundModel.UNIT) {
			object.material.wireframe = true;
			object.material.color.setHex(0x0000ff);
		} else if (type == GroundModel.OBS) {
			object.material.wireframe = false;
			object.material.color.setHex(0xff0000);
		} else if (type == GroundModel.PATH) {
			object.material.wireframe = false;
			object.material.color.setHex(0xffffff);
		}

	}
}

module.exports = Ground;