/**
 * Created by eleven on 22/05/2016.
 */
class Ground extends Composite {
	constructor(groundControl) {
		super();
		super.addComponent(new PlaneViewComponent(
			CConfig.Unit * 3,
			CConfig.Unit * 3
		));
		super.addComponent(new PositionComponent(0, 0, 0));
		super.compose();
	}
}