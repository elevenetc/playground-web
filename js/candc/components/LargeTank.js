/**
 * Created by eleven on 15/05/2016.
 */
class LargeTank extends Composite {

	constructor(groundModel, fromX, fromY, toX, toY, id) {
		super(id);


		super.addComponent(new MultiSquareView(0xff0000));
		super.addComponent(new DimenComponent(2, 2));
		super.addComponent(new MovementComponent(groundModel));
		// super.addComponent(new RandomPathMovementComponent(conflictResolver, groundModel));
		// super.addComponent(new RandomMovementComponent(groundModel));
		super.addComponent(new SampleCommander(fromX, fromY, toX, toY));

		super.addComponent(new PositionComponent(fromX, fromY, 0));
		super.compose();


	}
}