/**
 * Created by eleven on 24/05/2016.
 */
class RandomMovementComponent extends MovementComponent {

	constructor(groundControl) {
		super();
		/** @type {PositionComponent} */
		this.positionComponent = null;
		this.animTime = 300;
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
		var nextX = 0;
		var nextY = 0;
		var unit = CConfig.Unit;

		if (currentX >= unit) {
			nextX = currentX - unit;
		} else if (currentX <= -unit) {
			nextX = currentX + unit;
		} else {
			if (Math.random() > 0.5)
				nextX = currentX + (Math.random() > 0.5 ? unit : -unit);
		}

		if (currentY >= unit) {
			nextY = currentY - unit;
		} else if (currentY <= -unit) {
			nextY = currentY + unit;
		} else {
			if (Math.random() > 0.5)
				nextY = currentY + (Math.random() > 0.5 ? unit : -unit);
		}


		if (this.groundControl.isAvailable(nextX, nextY)) {
			this.groundControl.clear(currentX, currentY);
			this.groundControl.occupy(nextX, nextY);
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