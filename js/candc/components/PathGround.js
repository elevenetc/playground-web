/**
 * Created by eleven on 22/05/2016.
 */
class PathGround extends Composite {

	/***
	 * @param groundModel {GroundModel}
	 * @param compositor {Compositor}
	 * */
	constructor(groundModel, compositor) {
		super();

		/*** @type {GroundModel} */
		this.groundModel = groundModel;
		/*** @type {Compositor} */
		this.compositor = compositor;

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

		var x = object.position.x;
		var y = object.position.y;
		var movingComposites = this.compositor.getMovingComposites();
		var foundOccupied = false;

		for (var i = 0; i < movingComposites.length; i++) {
			var movementComponent = movingComposites[i].getMovementComponent();
			var path = movementComponent.getPath();

			if (path != null) {
				for (var k = 0; k < path.length; k++) {
					var pair = path[k];
					var px = pair[1] * Config.Unit;
					var py = pair[0] * Config.Unit;

					if (px == x && py == y) {
						foundOccupied = true;
						break;
					}
				}
			}

			if (foundOccupied) break;
		}

		if (foundOccupied) {
			object.material.wireframe = false;
			object.material.color.setHex(0xffffff);
		} else {
			object.material.wireframe = true;
			object.material.color.setHex(0xffffff00);
		}

		// var type = this.groundModel.getType(x, y);
		//
		// if (type == GroundModel.CLEAR) {
		// 	object.material.wireframe = true;
		// 	object.material.color.setHex(0x00ff00);
		// } else if (type == GroundModel.UNIT) {
		// 	object.material.wireframe = false;
		// 	object.material.color.setHex(0x0000ff);
		// } else if (type == GroundModel.OBS) {
		// 	object.material.wireframe = false;
		// 	object.material.color.setHex(0xff0000);
		// } else if (type == GroundModel.PATH) {
		// 	object.material.wireframe = false;
		// 	object.material.color.setHex(0xffffff);
		// }

	}
}