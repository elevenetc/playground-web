/**
 * Created by eleven on 22/05/2016.
 */
class Ground extends Composite {

	/**
	 * @param {GroundModel}
	 */
	constructor(groundModel) {
		super();

		/*** @type {GroundModel} */
		this.groundModel = groundModel;

		super.addComponent(new PlaneViewComponent(
			groundModel.getWidth(),
			groundModel.getHeight()
		));
		super.addComponent(new PositionComponent(0, 0, 0));
		super.compose();

		// var path = this.groundModel.findPath(0, 0, 2, 2);
		// this.groundModel.updateMatrix(path);
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

		var x = object.position.x;
		var y = object.position.y;
		var type = this.groundModel.getType(x, y);

		if (type == GroundModel.CLEAR) {
			object.material.wireframe = true;
			object.material.color.setHex(0x00ff00);
		} else if (type == GroundModel.UNIT) {
			object.material.wireframe = false;
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