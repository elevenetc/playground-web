/**
 * Created by eleven on 24/05/2016.
 */
class GroundModel extends Composite {

	constructor() {
		super();
		this.xPositions = [0, 0, 0];
		this.yPositions = [0, 0, 0];
		this.logAvaialability = false;
		this.width = this.xPositions.length;
		this.height = this.yPositions.length;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}

	isAvailable(x, y) {

		x = x / CConfig.Unit;
		y = y / CConfig.Unit;

		//check map boundaries
		if (x < 0 || y < 0 || x > this.xPositions.length - 1 || y > this.yPositions.length - 1) return false;

		var result = this.xPositions[x] == 0 || this.yPositions[y] == 0;
		if (this.logAvaialability)
			console.log(x + ':' + y + ' - ' + (result ? 'available' : 'not available'));
		return result;
	}

	occupy(x, y) {

		x = x / CConfig.Unit;
		y = y / CConfig.Unit;

		this.xPositions[x] = 1;
		this.yPositions[y] = 1;
	}

	clear(x, y) {

		x = x / CConfig.Unit;
		y = y / CConfig.Unit;

		this.xPositions[x] = 0;
		this.yPositions[y] = 0;
	}
}