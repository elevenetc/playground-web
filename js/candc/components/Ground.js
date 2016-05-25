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

		if (this.groundModel.isAvailable(object.position.x, object.position.y)) {
			object.material.color.setHex(0x00ff00);
		} else {
			object.material.color.setHex(0xff0000);
		}

	}
}