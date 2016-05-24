/**
 * Created by eleven on 15/05/2016.
 */
class Tank extends Composite {

	constructor(groundControl, x = 0, y = 0) {
		super();

		super.addComponent(new PositionComponent(x, y, 0));
		super.addComponent(new BoxViewComponent());
		super.addComponent(new RandomMovementComponent(groundControl));
		super.compose();


	}
}