/**
 * Created by eleven on 22/05/2016.
 */
class Ground extends Composite {

	/**
	 * @param {GroundModel}
	 */
	constructor(groundModel) {
		super();

		super.addComponent(new PlaneViewComponent(
			groundModel.getWidth(),
			groundModel.getHeight()
		));
		super.addComponent(new PositionComponent(0, 0, 0));
		super.compose();
	}


	update() {

	}
}