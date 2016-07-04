/**
 * Created by eleven on 04/07/2016.
 */
var Component = require('./Component');

class DirectionComponent extends Component {

	constructor(x = 0, y = 0) {
		this.vec = [x, y];
	}

	updateDirection(currentX, currentY, nextX, nextY) {
		if (currentX == nextX && currentY == nextY) return;

		if (nextX > currentX) {
			this.dir[0] = 1;
		} else if (nextX < currentX) {
			this.dir[0] = -1;
		} else {
			this.dir[0] = 0;
		}

		if (nextY > currentY) {
			this.dir[1] = 1;
		} else if (nextY < currentY) {
			this.dir[1] = -1;
		} else {
			this.dir[1] = 0;
		}
	}

	getDirection() {
		if (this.dir[0] = 0 && this.dir[1] == 1) {
			return DirectionComponent.TOP;
		} else if (this.dir[0] = 1 && this.dir[1] == 1) {
			return DirectionComponent.RIGHT_TOP;
		} else if (this.dir[0] = 1 && this.dir[1] == 0) {
			return DirectionComponent.RIGHT;
		} else if (this.dir[0] = 1 && this.dir[1] == -1) {
			return DirectionComponent.RIGHT_BOTTOM;
		} else if (this.dir[0] = 0 && this.dir[1] == -1) {
			return DirectionComponent.BOTTOM;
		} else if (this.dir[0] = -1 && this.dir[1] == -1) {
			return DirectionComponent.LEFT_BOTTOM;
		} else if (this.dir[0] = -1 && this.dir[1] == 0) {
			return DirectionComponent.LEFT;
		} else if (this.dir[0] = -1 && this.dir[1] == 1) {
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