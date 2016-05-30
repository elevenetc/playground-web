/**
 * Created by eleven on 26/05/2016.
 */
class RandomPathMovementComponent extends MovementComponent {

	/**
	 * @param conflictResolver {ConflictResolver}
	 * @param groundModel {GroundModel}
	 */
	constructor(conflictResolver, groundModel) {
		super();
		this.animTime = 50;
		/** @type {GroundModel} */
		this.groundModel = groundModel;
		this.log = false;
	}

	onComposeFinished() {
		super.onComposeFinished();
		this.nextRandomPosition();
	}

	nextRandomPosition() {
		var currentX = this.positionComponent.getX();
		var currentY = this.positionComponent.getY();

		var width = this.groundModel.getWidth();
		var height = this.groundModel.getHeight();

		var rndX = this.getRandomInt(0, width - 1);
		var rndY = this.getRandomInt(0, height - 1);

		if (currentX != rndX || currentY != rndY) {
			this.moveTo(currentX, currentY, rndX, rndY, function () {
				this.waitForNextRandomPoint();
			});
		} else {
			this.waitForNextRandomPoint();
		}
	}

	waitForNextRandomPoint() {
		var ref = this;
		super.animateWait(this.animTime, function () {
			ref.nextRandomPosition();
		});
	}

	waitAndMoveToTargetPoint() {
		var fromX = this.positionComponent.getX();
		var fromY = this.positionComponent.getY();
		var toX = this.targetPoint[0];
		var toY = this.targetPoint[1];
		var ref = this;

		super.animateWait(this.animTime, function () {
			ref.moveTo(fromX, fromY, toX, toY, function () {
				ref.waitForNextRandomPoint();
			});
		});
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	releaseStop() {
		super.releaseStop();
		if (this.isTargetEmpty()) this.waitForNextRandomPoint();
		else this.waitAndMoveToTargetPoint();
	}

	recalculatePath() {
		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.getX();
		var fromY = positionComponent.getY();
		this.path = this.groundModel.findPath(fromX, fromY, this.targetPoint[0], this.targetPoint[1]);
		this.startPath(this.targetPoint[0], this.targetPoint[1]);
	}

}

