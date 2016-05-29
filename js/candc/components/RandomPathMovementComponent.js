/**
 * Created by eleven on 26/05/2016.
 */
class RandomPathMovementComponent extends MovementComponent {

	/**
	 * @param conflictResolver {ConflictResolver}
	 * @param groundControl {PositionComponent}
	 */
	constructor(conflictResolver, groundControl) {
		super();
		/** @type {ConflictResolver} */
		this.conflictResolver = conflictResolver;
		/** @type {PositionComponent} */
		this.positionComponent = null;
		this.animTime = 30;
		/** @type {GroundModel} */
		this.groundControl = groundControl;
		this.log = false;
		this.attemptToAvoidObstacle = 0;
	}

	onComposeFinished() {
		this.positionComponent = super.getComposite().getPositionComponent();
		this.nextRandomPosition();
	}

	nextRandomPosition() {
		var currentX = this.positionComponent.getX();
		var currentY = this.positionComponent.getY();

		var width = this.groundControl.getWidth();
		var height = this.groundControl.getHeight();

		var rndX = this.getRandomInt(0, width - 1);
		var rndY = this.getRandomInt(0, height - 1);

		if (currentX != rndX && currentY != rndY) this.moveTo(currentX, currentY, rndX, rndY);
		else this.waitForNext();
	}

	moveTo(fromX, fromY, toX, toY) {

		if (this.log) console.log('move (' + fromX + ':' + fromY + ')-(' + toX + ':' + toY + ')');
		this.path = this.groundControl.findPath(fromX, fromY, toX, toY);
		if (this.log) console.log('path length: ' + this.path.length);

		if (this.path.length > 0) {
			this.attemptToAvoidObstacle = 0;
			this.targetPoint = [toX, toY];

			if (this.skipStep) {
				var ref = this;
				this.skipStep = false;
				new TWEEN.Tween({})
					.to({}, ref.animTime)
					.onComplete(function () {
						ref.moveToPoint();
						//ref.nextRandomPosition();
					})
					.start();
			} else {
				this.moveToPoint();
			}

		} else {
			this.waitForNext();
		}

	}

	waitForNext() {
		var ref = this;
		new TWEEN.Tween({})
			.to({}, ref.animTime)
			.onComplete(function () {
				ref.nextRandomPosition();
			})
			.start();
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getPath() {
		return this.path;
	}


	releaseStop() {
		super.releaseStop();
		this.moveToPoint();
	}

	moveToPoint() {
		var x = 0;
		var y = 0;
		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.getX();
		var fromY = positionComponent.getY();
		var ref = this;

		if (this.path.length == 0) {
			this.path = null;
			this.nextRandomPosition();
			return;
		} else {
			var point = this.path.splice(0, 1);
			x = point[0][1];
			y = point[0][0];

			if (!(fromX == x && fromY == y) && !this.groundControl.isAvailable(x, y)) {
				this.path = [];
				this.attemptToAvoidObstacle++;
				this.setStop();
				this.conflictResolver.pushConflict(this.getComposite(), this.groundControl.getOccupant(x, y), x, y);

				//this.groundControl.getOccupant(x, y).getMovementComponent().setSkipStep();
				//this.setStop();
				//this.conflictResolver.pushConflict(this.getComposite(), this.groundControl.getOccupant(x, y), x, y);
				//this.moveTo(fromX, fromY, this.targetPoint[0], this.targetPoint[1]);
				return;
			} else {
				this.conflictResolver.resolveConflict(this.getComposite());
			}
		}

		this.conflictResolver.resolveConflict(super.getComposite());

		this.groundControl.clear(this.getComposite(), fromX, fromY);
		this.groundControl.occupy(this.getComposite(), x, y);

		new TWEEN.Tween({x: fromX * CConfig.Unit, y: fromY * CConfig.Unit})
			.to({x: x * CConfig.Unit, y: y * CConfig.Unit}, ref.animTime)
			.onUpdate(function () {
				positionComponent.setX(this.x);
				positionComponent.setY(this.y);
			})
			.onComplete(function () {
				ref.moveToPoint();
			})
			.start();
	}
}

