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
		this.groundModel = groundControl;
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
		var unit = 1;

		if (Math.random() > 0.5)
			nextX = currentX + (Math.random() > 0.5 ? unit : -unit);

		if (Math.random() > 0.5)
			nextY = currentY + (Math.random() > 0.5 ? unit : -unit);

		var same = nextX == currentX && nextY == currentY;

		if (!same && this.groundModel.isAvailable(nextX, nextY)) {
			this.groundModel.occupy(this.getComposite() , nextX, nextY);
			this.groundModel.clear(currentX, currentY);
			this.startMovement(nextX, nextY);

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

		new TWEEN.Tween({x: fromX * Config.Unit, y: fromY * Config.Unit})
			.to({x: x * Config.Unit, y: y * Config.Unit}, ref.animTime)
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