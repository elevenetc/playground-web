/**
 * Created by eleven on 24/05/2016.
 */
class RandomMovementComponent extends MovementComponent {

	constructor(groundControl) {
		super();
		/** @type {PositionComponent} */
		this.positionComponent = null;
		this.animTime = 100 + Math.random() * 100;
		/** @type {GroundModel} */
		this.groundControl = groundControl;
	}

	onComposeFinished() {
		this.positionComponent = super.getComposite().getPositionComponent();
		this.nextRandomPosition();
	}

	nextRandomPosition() {
		var currentX = this.positionComponent.x;
		var currentY = this.positionComponent.y;
		var nextX = currentX;
		var nextY = currentY;
		var unit = CConfig.Unit;

		if (Math.random() > 0.5)
			nextX = currentX + (Math.random() > 0.5 ? unit : -unit);

		if (Math.random() > 0.5)
			nextY = currentY + (Math.random() > 0.5 ? unit : -unit);

		var same = nextX == currentX && nextY == currentY;

		if (!same && this.groundControl.isAvailable(nextX, nextY)) {
			this.groundControl.occupy(nextX, nextY);
			this.groundControl.clear(currentX, currentY);
			this.startMovement(nextX, nextY);

			this.groundControl.findPath(0, 0, 2, 3);

		} else {
			var ref = this;
			new TWEEN.Tween({})
				.to({}, ref.animTime)
				.onComplete(function () {
					ref.nextRandomPosition();
				})
				.start();
		}
	}

	startMovement(x, y) {

		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.x;
		var fromY = positionComponent.y;
		var ref = this;

		new TWEEN.Tween({x: fromX, y: fromY})
			.to({x: x, y: y}, ref.animTime)
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