/**
 * Created by eleven on 15/05/2016.
 */
class Tank extends Composite {

	constructor(conflictResolver, groundModel, x = 0, y = 0, id) {
		super(id);

		super.addComponent(new PositionComponent(x, y, 0));
		super.addComponent(new BoxViewComponent());
		super.addComponent(new RandomPathMovementComponent(conflictResolver, groundModel));
		// super.addComponent(new RandomMovementComponent(groundModel));
		super.compose();


	}
}