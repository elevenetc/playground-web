/**
 * Created by eleven on 23/05/2016.
 */
class MovementComponent extends Component {

	constructor() {
		super();
		/** @type {Array} */
		this.path = [];
		/** @type {Array} */
		this.targetPoint = [];
		/** @type {boolean} */
		this.skipStep = false;
		/** @type {boolean} */
		this.stop = false;
		/** @type {PositionComponent} */
		this.positionComponent = null;
		/** @type {function} */
		this.endPathHandler = null;
	}

	/*** @param movementComponent {MovementComponent} */
	isSameTargetPoint(movementComponent) {
		var tp = movementComponent.getTargetPoint();
		var isTargetEmpty = movementComponent.isTargetEmpty();
		if (isTargetEmpty) {
			return this.isTargetEmpty() == isTargetEmpty;
		} else {
			return tp[0] == this.targetPoint[0] && tp[1] == this.targetPoint[1];
		}
	}

	onComposeFinished() {
		super.onComposeFinished();
		this.positionComponent = super.getComposite().getPositionComponent();
	}

	isTargetEmpty() {
		return this.targetPoint == null || this.targetPoint.length == 0;
	}

	/** @returns {Array} */
	getTargetPoint() {
		return this.targetPoint;
	}

	/** @returns {Array} */
	getPath() {
		return this.path;
	}

	setStop() {
		this.stop = true;
	}

	releaseStop() {
		this.stop = false;
	}

	/*** @returns {boolean} */
	isStopped() {
		return this.stop;
	}

	/// movement
	/// movement
	/// movement

	moveTo(fromX, fromY, toX, toY, endPathHandler) {

		this.endPathHandler = endPathHandler;

		if (this.log) console.log('move (' + fromX + ':' + fromY + ')-(' + toX + ':' + toY + ')');
		this.path = this.groundModel.findPath(fromX, fromY, toX, toY);
		if (this.log) console.log('path length: ' + this.path.length);

		this.startPath(toX, toY);
	}

	startPath(toX, toY) {
		if (this.path.length > 0) {
			this.targetPoint = [toX, toY];
			this.moveToPoint();
		} else {
			if (this.endPathHandler != null) this.endPathHandler();
		}
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
			if (this.endPathHandler != null) this.endPathHandler();
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

		this.animateStep(fromX, fromY, x, y, this.animTime, function () {
			ref.moveToPoint();
		});
	}

	// animation
	// animation
	// animation

	animateWait(time, endHandler) {
		this.animate({}, {}, time, null, endHandler);
	}

	animateStep(fromX, fromY, toX, toY, time, endHandler) {
		var pc = this.positionComponent;
		this.animate(
			{x: fromX * CConfig.Unit, y: fromY * CConfig.Unit},
			{x: toX * CConfig.Unit, y: toY * CConfig.Unit},
			time,
			function (animator) {
				pc.setX(animator.x);
				pc.setY(animator.y);
			},
			endHandler
		);
	}

	animate(from, to, time, updateHandler, endHandler) {
		new TWEEN.Tween(from)
			.to(to, time)
			.onUpdate(function () {
				if (updateHandler != null && updateHandler != undefined) updateHandler(this);
			})
			.onComplete(function () {
				if (endHandler != null && endHandler != undefined) endHandler();
			})
			.start();
	}
}