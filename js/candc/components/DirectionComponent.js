/**
 * Created by eleven on 04/07/2016.
 */
var Component = require('./Component');

class DirectionComponent extends Component {

	constructor(x = 1, y = 1) {
		super();
		this.vec = [x, y];
	}

	updateDirection(currentX, currentY, nextX, nextY) {
		if (currentX == nextX && currentY == nextY) return;

		if (nextX > currentX) {
			this.vec[0] = 1;
		} else if (nextX < currentX) {
			this.vec[0] = -1;
		} else {
			this.vec[0] = 0;
		}

		if (nextY > currentY) {
			this.vec[1] = 1;
		} else if (nextY < currentY) {
			this.vec[1] = -1;
		} else {
			this.vec[1] = 0;
		}
	}

	/**
	 * @param dir
	 * @returns {DirectionComponent}
	 */
	setDirection(dir) {
		if (dir == DirectionComponent.TOP) {
			this.vec[0] = 0;
			this.vec[1] = 1;
		} else if (dir == DirectionComponent.RIGHT_TOP) {
			this.vec[0] = 1;
			this.vec[1] = 1;
		} else if (dir == DirectionComponent.RIGHT) {
			this.vec[0] = 1;
			this.vec[1] = 0;
		} else if (dir == DirectionComponent.RIGHT_BOTTOM) {
			this.vec[0] = 1;
			this.vec[1] = -1;
		} else if (dir == DirectionComponent.BOTTOM) {
			this.vec[0] = 0;
			this.vec[1] = -1;
		} else if (dir == DirectionComponent.LEFT_BOTTOM) {
			this.vec[0] = -1;
			this.vec[1] = -1;
		} else if (dir == DirectionComponent.LEFT) {
			this.vec[0] = -1;
			this.vec[1] = 0;
		} else if (dir == DirectionComponent.LEFT_TOP) {
			this.vec[0] = -1;
			this.vec[1] = 1;
		}
		return this;
	}

	getDirection() {
		if (this.vec[0] == 0 && this.vec[1] == 1) {
			return DirectionComponent.TOP;
		} else if (this.vec[0] == 1 && this.vec[1] == 1) {
			return DirectionComponent.RIGHT_TOP;
		} else if (this.vec[0] == 1 && this.vec[1] == 0) {
			return DirectionComponent.RIGHT;
		} else if (this.vec[0] == 1 && this.vec[1] == -1) {
			return DirectionComponent.RIGHT_BOTTOM;
		} else if (this.vec[0] == 0 && this.vec[1] == -1) {
			return DirectionComponent.BOTTOM;
		} else if (this.vec[0] == -1 && this.vec[1] == -1) {
			return DirectionComponent.LEFT_BOTTOM;
		} else if (this.vec[0] == -1 && this.vec[1] == 0) {
			return DirectionComponent.LEFT;
		} else if (this.vec[0] == -1 && this.vec[1] == 1) {
			return DirectionComponent.LEFT_TOP;
		}
	}
}

DirectionComponent.TOP = 0;
DirectionComponent.LEFT_TOP = 1;
DirectionComponent.RIGHT = 2;
DirectionComponent.LEFT = 3;
DirectionComponent.RIGHT_BOTTOM = 4;
DirectionComponent.BOTTOM = 5;
DirectionComponent.LEFT_BOTTOM = 6;
DirectionComponent.RIGHT_TOP = 7;


module.exports = DirectionComponent;