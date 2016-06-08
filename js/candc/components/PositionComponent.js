/**
 * Created by eleven on 22/05/2016.
 */
class PositionComponent extends Component {
	/**
	 *
	 * @param x {int}
	 * @param y {int}
	 * @param dimenComponent {DimenComponent}
	 * @param groundModel {GroundModel}
	 */
	constructor(x, y, dimenComponent, groundModel) {
		super();
		this.viewComponent = null;
		this.x = x;
		this.y = y;
		this.groundModel = groundModel;
		this.dimenComponent = dimenComponent;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	setX(x) {
		this.x = x;
	}

	setY(y) {
		this.y = y;
	}

	onComposeFinished() {
		super.onComposeFinished();
		this.viewComponent = super.getComposite().getViewComponent();

		var width = this.dimenComponent.getWidth();
		var height = this.dimenComponent.getHeight();

		for (var x = this.x; x < x + width; x++)
			for (var y = this.y; y < y + height; y++)
				this.groundModel.occupy(super.getComposite(), x, y);
	}
}