/**
 * Created by eleven on 22/05/2016.
 */
class PositionComponent extends Component {
	constructor(x, y, z) {
		super();
		this.viewComponent = null;
		this.x = x;
		this.y = y;
		this.z = z;
	}

	getX() {
		return this.x / CConfig.Unit;
	}

	getY() {
		return this.y / CConfig.Unit;
	}

	setX(x) {
		this.x = x;
		this.viewComponent.updatePosition(this);
	}

	setY(y) {
		this.y = y;
		this.viewComponent.updatePosition(this);
	}

	onComposeFinished() {
		super.onComposeFinished();
		this.viewComponent = super.getComposite().getViewComponent();
	}
}