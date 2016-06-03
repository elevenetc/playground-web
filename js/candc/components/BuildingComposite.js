/**
 * Created by eleven on 03/06/2016.
 */
class BuildingComposite extends Composite {

	constructor(id, x, y, width, height) {
		super(id);

		super.addComponent(new MultiSquareView(0xffffff));
		super.addComponent(new DimenComponent(width, height));
		super.addComponent(new PositionComponent(x, y));
		super.compose();
	}
}