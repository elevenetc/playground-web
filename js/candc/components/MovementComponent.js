/**
 * Created by eleven on 23/05/2016.
 */
class MovementComponent extends Component {

	constructor() {
		super();
		/** @type {PositionComponent} */
		this.positionComponent = null;
	}

	onComposeFinished() {
		this.positionComponent = super.getComposite().getPositionComponent();
		this.nextRandomPosition();
	}


	nextRandomPosition() {
		var currentX = this.positionComponent.x;
		var currentY = this.positionComponent.y;
		var nextX = 0;
		var nextY = 0;

		if (currentX >= 200) {
			nextX = currentX - 200;
		} else if (currentX <= -200) {
			nextX = currentX + 200;
		} else {
			if (Math.random() > 0.5)
				nextX = currentX + (Math.random() > 0.5 ? 200 : -200);
		}

		if (currentY >= 200) {
			nextY = currentY - 200;
		} else if (currentY <= -200) {
			nextY = currentY + 200;
		} else {
			if (Math.random() > 0.5)
				nextY = currentY + (Math.random() > 0.5 ? 200 : -200);
		}

		this.startMovement(nextX, nextY);
	}

	startMovement(x, y) {

		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.x;
		var fromY = positionComponent.y;
		var ref = this;

		new TWEEN.Tween({x: fromX, y: fromY})
			.to({x: x, y: y}, 50)
			.onUpdate(function () {
				positionComponent.setX(this.x);
				positionComponent.setY(this.y);
			})
			.onComplete(function () {
				ref.nextRandomPosition();
			})
			.start();
	}
}