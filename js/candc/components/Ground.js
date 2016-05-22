/**
 * Created by eleven on 22/05/2016.
 */
class Ground extends Composite {
	constructor() {
		super();
		super.addComponent(new PlaneViewComponent());
		super.addComponent(new PositionComponent(0, 0, 0));
		super.compose();
	}
}