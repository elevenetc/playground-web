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
		this.animTime = 110;
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

		var ref = this;
		if (currentX != rndX || currentY != rndY) this.moveTo(currentX, currentY, rndX, rndY);
		else this.waitForNextRandomPoint();
	}

	moveTo(fromX, fromY, toX, toY) {

		if (this.log) console.log('move (' + fromX + ':' + fromY + ')-(' + toX + ':' + toY + ')');
		this.path = this.groundModel.findPath(fromX, fromY, toX, toY);
		if (this.log) console.log('path length: ' + this.path.length);

		this.startPath(toX, toY);
	}

	startPath(toX, toY) {
		if (this.path.length > 0) {
			this.targetPoint = [toX, toY];
			var ref = this;
			this.moveToPoint();
		} else {
			this.waitForNextRandomPoint();
		}
	}

	waitForNextRandomPoint() {
		var ref = this;

		new TWEEN.Tween({})
			.to({}, this.animTime)
			.onComplete(function () {
				ref.nextRandomPosition();
			}).start();

		// super.animateWait(this.animTime, function () {
		// 	ref.nextRandomPosition();
		// });
	}

	waitAndMoveToTargetPoint() {
		var fromX = this.positionComponent.getX();
		var fromY = this.positionComponent.getY();
		var toX = this.targetPoint[0];
		var toY = this.targetPoint[1];
		var ref = this;

		new TWEEN.Tween({})
			.to({}, this.animTime)
			.onComplete(function () {
				ref.moveTo(fromX, fromY, toX, toY)
			}).start();

		// super.animateWait(
		// 	this.animTime,
		// 	function () {
		// 		ref.moveTo(fromX, fromY, toX, toY)
		// 	}
		// );
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getPath() {
		return this.path;
	}

	releaseStop() {
		super.releaseStop();
		if (this.isTargetEmpty())this.waitForNextRandomPoint();
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

	moveToPoint() {
		var x = 0;
		var y = 0;
		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.getX();
		var fromY = positionComponent.getY();

		if (this.path.length == 0) {
			this.path = null;
			this.targetPoint = [];
			this.nextRandomPosition();
			return;
		} else {
			var point = this.path[0];
			x = point[1];
			y = point[0];
			var isSame = fromX == x && fromY == y;
			var isAvailable = this.groundModel.isAvailable(x, y);

			if (!isSame && !isAvailable) {

				var occupant = this.groundModel.getOccupant(x, y);
				var occupantMC = occupant.getMovementComponent();

				if (occupantMC.isStopped()) {
					this.recalculatePath();
				} else {
					if (this.log) console.log(this.getComposite().getId() + ' waiting for ' + x + ':' + y);
					this.setStop();
					this.groundModel.waitFor(this.getComposite(), x, y);
				}

				return;
			}
		}

		this.path.splice(0, 1);

		this.groundModel.occupy(this.getComposite(), x, y);
		this.groundModel.clear(this.getComposite(), fromX, fromY);
		var ref = this;

		// super.animateStep(
		// 	fromX, fromY,
		// 	x, y,
		// 	this.animTime,
		// 	function () {
		// 		ref.moveToPoint();
		// 	}
		// );

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

