/**
 * Created by eleven on 03/06/2016.
 */
class BuildingComposite extends Composite {

	/**
	 * @param id {string}
	 * @param groundModel {GroundModel}
	 * @param x {int}
	 * @param y {int}
	 * @param width {int}
	 * @param height {int}
	 */
	constructor(id, groundModel, x, y, width, height) {
		super(id);

		var dimenComponent = new DimenComponent(width, height);
		super.addComponent(new MultiSquareView(0xffffff));
		super.addComponent(dimenComponent);
		super.addComponent(new PositionComponent(x, y, dimenComponent, groundModel));

		for (var xPos = x; xPos < x + width; xPos++)
			for (var yPos = y; yPos < y + width; yPos++)
				groundModel.occupy(this, xPos, yPos);

		super.compose();
	}
}