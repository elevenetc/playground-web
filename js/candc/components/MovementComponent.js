/**
 * Created by eleven on 23/05/2016.
 */
class MovementComponent extends Component {

	/**
	 * @param groundModel {GroundModel}
	 */
	constructor(groundModel) {
		super();
		/** @type {GroundModel} */
		this.groundModel = groundModel;
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
		/** @type {ViewComponent} */
		this.viewComponent = null;
		/** @type {function} */
		this.endPathHandler = null;
		this.animTime = 250;
		this.log = false;
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
		this.viewComponent = super.getComposite().getViewComponent();
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
		if (!this.stop) return;
		this.stop = false;
		this.recalculatePath();

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
					if (this.log) console.log(composite.getId() + ' waiting for ' + x + ':' + y);
					this.setStop();
					this.groundModel.waitFor(composite, x, y);
				}

				return;
			}
		}

		this.path.splice(0, 1);

		var dimens = composite.getDimenComponent();
		var width = dimens.getWidth();
		var height = dimens.getHeight();
		var xD;
		var yD;

		// for (xD = x; xD < x + width; xD++)
		// 	for (yD = y; yD < y + height; yD++)
		// 		this.groundModel.occupy(composite, xD, yD);
		//
		// for (xD = fromX; xD < x - fromX; xD++)
		// 	for (yD = fromY; yD < y - fromY; yD++)
		// 		this.groundModel.clear(composite, xD, yD);

		this.groundModel.occupy(composite, x, y);
		this.groundModel.clear(composite, fromX, fromY);

		this.animateStep(fromX, fromY, x, y, this.animTime, function () {
			ref.moveToPoint();
		});
	}

	recalculatePath() {
		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.getX();
		var fromY = positionComponent.getY();
		this.path = this.groundModel.findPath(fromX, fromY, this.targetPoint[0], this.targetPoint[1]);
		this.moveToPoint();
	}


	// animation
	// animation
	// animation

	animateWait(time, endHandler) {
		this.animate({}, {}, time, null, endHandler);
	}

	animateStep(fromX, fromY, toX, toY, time, endHandler) {
		var pc = this.positionComponent;
		var vc = this.viewComponent;
		this.animate(
			{x: fromX * CConfig.Unit, y: fromY * CConfig.Unit},
			{x: toX * CConfig.Unit, y: toY * CConfig.Unit},
			time,
			function (animator) {
				vc.setX(animator.x);
				vc.setY(animator.y);
			},
			function () {
				pc.setX(toX);
				pc.setY(toY);
				endHandler();
			}
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