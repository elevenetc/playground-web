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

	animateWait(time, endHandler) {
		this.animate({}, {}, time, endHandler);
	}

	animateStep(fromX, fromY, toX, toY, time, endHandler) {
		this.animate(
			{x: fromX * CConfig.Unit, y: fromY * CConfig.Unit},
			{x: toX * CConfig.Unit, y: toY * CConfig.Unit},
			time,
			endHandler
		);
	}

	animate(from, to, time, endHandler) {
		var comp = this;
		new TWEEN.Tween(from)
			.to(to, time)
			.onUpdate(function () {
				var interRef = this;
				comp.positionComponent.setX(interRef.x);
				comp.positionComponent.setY(interRef.y);
			})
			.onComplete(function () {
				endHandler();
			})
			.start();
	}
}