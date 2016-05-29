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
		/** @type {ConflictResolver} */
		this.conflictResolver = conflictResolver;
		/** @type {PositionComponent} */
		this.positionComponent = null;
		this.animTime = 100;
		/** @type {GroundModel} */
		this.groundModel = groundModel;
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

		var width = this.groundModel.getWidth();
		var height = this.groundModel.getHeight();

		var rndX = this.getRandomInt(0, width - 1);
		var rndY = this.getRandomInt(0, height - 1);

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
			this.attemptToAvoidObstacle = 0;
			this.targetPoint = [toX, toY];
			this.moveToPoint();
		} else {
			this.waitForNextRandomPoint();
		}
	}

	waitForNextRandomPoint() {
		var ref = this;
		new TWEEN.Tween({})
			.to({}, ref.animTime)
			.onComplete(function () {
				ref.nextRandomPosition();
			})
			.start();
	}

	waitAndMoveToTargetPoint() {
		var ref = this;
		new TWEEN.Tween({})
			.to({}, ref.animTime)
			.onComplete(function () {
				ref.moveTo(ref.positionComponent.getX(), ref.positionComponent.getY(), ref.targetPoint[0], ref.targetPoint[1]);
				//ref.nextRandomPosition();
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
		if (this.isTargetEmpty()) {
			console.log('no target');
			this.waitForNextRandomPoint();
		} else {
			console.log('attempt to reach target');
			this.waitAndMoveToTargetPoint();
		}
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
		var ref = this;

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
				//this.path = [];

				var occupant = this.groundModel.getOccupant(x, y);
				var occupantMC = occupant.getMovementComponent();

				if (occupantMC.isStopped()) {
					this.recalculatePath();
				}else{
					console.log(this.getComposite().getId() + ' waiting for ' + x + ':' + y);
					this.setStop();
					this.groundModel.waitFor(this.getComposite(), x, y);
				}

				return;
			}
		}

		this.path.splice(0, 1);

		this.groundModel.occupy(this.getComposite(), x, y);
		this.groundModel.clear(this.getComposite(), fromX, fromY);

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

