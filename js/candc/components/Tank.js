/**
 * Created by eleven on 15/05/2016.
 */
class Tank extends Composite {

	constructor(conflictResolver, groundModel, fromX, fromY, toX, toY, id) {
		super(id);

		super.addComponent(new PositionComponent(fromX, fromY, 0));
		super.addComponent(new BoxViewComponent());
		super.addComponent(new MovementComponent(groundModel));
		// super.addComponent(new RandomPathMovementComponent(conflictResolver, groundModel));
		// super.addComponent(new RandomMovementComponent(groundModel));
		super.addComponent(new SampleCommander(fromX, fromY, toX, toY));
		super.compose();


	}
}