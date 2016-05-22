/**
 * Created by eleven on 15/05/2016.
 */
class Tank extends Composite {

	constructor() {
		super();

		super.addComponent(new PositionComponent(200, 200, 0));
		super.addComponent(new BoxViewComponent());
		super.compose();
		

	}
}