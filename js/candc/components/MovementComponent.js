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

	setSkipStep() {
		console.log('skip step');
		this.skipStep = true;
	}
}