/**
 * Created by eleven on 23/05/2016.
 */

var Modules = require('../Modules');
var Component = require('./Component');
var CConfig = require('../CConfig');
var Animator = Modules.getAnimator();
var con = require('../log/Console');

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
		this.animTime = 1000;
		// this.animTime = 300;
		this.log = true;
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

		if (this.log) con.log(this.getComposite(), 'move (' + fromX + ':' + fromY + ')-(' + toX + ':' + toY + ')');
		// console.log('move (' + fromX + ':' + fromY + ')-(' + toX + ':' + toY + ')');

		this.groundModel.clearFromEntity(this.getComposite());

		this.path = this.groundModel.findPath(fromX, fromY, toX, toY);

		this.groundModel.occupyBy(this.getComposite());

		if (this.log) con.log(this.getComposite(), 'path length: ' + this.path.length);

		this.startPath(toX, toY);
	}

	startPath(toX, toY) {
		if (this.path.length > 0) {
			this.targetPoint = [toX, toY];
			this.moveToPoint();
		} else {
			if (this.endPathHandler != null) {
				var ref = this;
				this.animateWait(100, function () {
					ref.endPathHandler();
				});
			}
		}
	}

	moveToPoint() {

		var nextX = 0;
		var nextY = 0;
		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.getX();
		var fromY = positionComponent.getY();
		var ref = this;

		if (this.path.length == 0) {
			this.path = null;
			this.targetPoint = [];
			if (this.endPathHandler != null) this.endPathHandler();
			if (this.log) con.log(this.getComposite(), 'Finish path:' + this.getComposite().getId());
			return;
		} else {
			var point = this.path[0];
			nextX = point[1];
			nextY = point[0];

			var obstacle = this.groundModel.isAvailableFor(composite, nextX, nextY);

			if (obstacle !== null && obstacle !== undefined) {

				var occupantMC = obstacle.getMovementComponent();
				var occupiedByItself = composite === obstacle;

				if (occupiedByItself) if (this.log) con.log(this.getComposite(), 'occupied buy itself');

				if (this.log) con.log(this.getComposite(), 'moveToPoint: found obstacle');

				if (occupantMC.isStopped()) {
					if (this.log) con.log(this.getComposite(), 'moveToPoint: recalcPath');
					this.recalculatePathWithObstacle(obstacle);
				} else {
					if (this.log) con.log(this.getComposite(), 'moveToPoint: stop and wait');
					this.setStop();
					this.groundModel.waitFor(composite, nextX, nextY);
				}

				return;
			}
		}

		if (this.log) con.log(this.getComposite(), 'moveToPoint: ' + nextX + ':' + nextY);

		this.path.splice(0, 1);

		var dimens = composite.getDimenComponent();
		var width = dimens.getWidth();
		var height = dimens.getHeight();
		var x;
		var y;
		var minX = fromX <= nextX ? fromX : nextX;
		var minY = fromY <= nextY ? fromY : nextY;

		//TODO: optimize - merge clear and occupy traverses

		for (x = minX; x < minX + width + 1; x++)//+1 movement step
			for (y = minY; y < minY + height + 1; y++)//+1 movement step
				this.groundModel.clearFromAt(composite, x, y);

		for (x = nextX; x < nextX + width; x++)
			for (y = nextY; y < nextY + height; y++)
				this.groundModel.occupy(composite, x, y);

		this.animateStep(fromX, fromY, nextX, nextY, this.animTime, function () {
			ref.moveToPoint();
		});
	}

	/**
	 * @param obstacle {Composite}
	 */
	recalculatePathWithObstacle(obstacle) {

		var obstacleMC = obstacle.getMovementComponent();

		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.getX();
		var fromY = positionComponent.getY();
		this.path = this.groundModel.findPathWithObstacle(obstacle, fromX, fromY, this.targetPoint[0], this.targetPoint[1]);
		if (this.path.length == 0) {
			if (this.log) con.log(composite, 'Cant recalc, wait!');
			var ref = this;
			this.animateWait(100, function () {

				if (obstacleMC.isStopped()) {

					ref.setStop();
					ref.groundModel.waitFor(composite, ref.targetPoint[0], ref.targetPoint[1]);

					obstacleMC.releaseStop();

					//var obstacleTP = obstacleMC.getTargetPoint();

					//con.log(ref.getComposite(), 'Mutual block!!!');
					//con.log(ref.getComposite(), composite.getId() + ' wants to ' + ref.targetPoint[0] + ':' + ref.targetPoint[1]);
					//con.log(ref.getComposite(), obstacle.getId() + ' wants to ' + obstacleTP[0] + ':' + obstacleTP[1]);

					//throw new Error('Mutual block');

					//ref.setStop();
					//ref.groundModel.waitFor(composite, ref.targetPoint[0], ref.targetPoint[1]);

					//obstacleMC.recalculatePathWithObstacle(composite);
					//ref.recalculatePathWithObstacle(obstacle);

				} else {
					ref.setStop();
					ref.groundModel.waitFor(composite, ref.targetPoint[0], ref.targetPoint[1]);
				}

			});
		} else {
			this.moveToPoint();
		}
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
		setTimeout(function () {
			endHandler();
		}, time);
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
		new Animator(from)
			.to(to, time)
			.onUpdate(function () {
				if (updateHandler != null && updateHandler != undefined) updateHandler(this);
			})
			.onComplete(function () {
				if (endHandler != null && endHandler != undefined) endHandler();
			})
			.start();
	}

	toString() {
		var entity = this.getComposite();
		var isWaiting = this.groundModel.isWaiting(entity);
		var target = null;
		if (isWaiting) {
			target = this.groundModel.getWaitingTarget(entity);
		}
		return 'isStopped:' + this.isStopped() + ' isWaiting:' + isWaiting + (target == null ? '' : ' waiting target:' + target);
	}
}

module.exports = MovementComponent;