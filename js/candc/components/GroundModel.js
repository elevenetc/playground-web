/**
 * Created by eleven on 24/05/2016.
 */
class GroundModel extends Composite {

	constructor() {
		super();
		this.matrix = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		this.logAvaialability = false;
		this.width = this.matrix.length;
		this.height = this.matrix[0].length;
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
		if (x < 0 || y < 0 || x > this.matrix.length - 1 || y > this.matrix[0].length - 1) return false;

		var result = this.matrix[x][y] == 0;
		if (this.logAvaialability)
			console.log(x + ':' + y + ' - ' + (result ? 'available' : 'not available'));
		return result;
	}

	occupy(x, y) {
		x = x / CConfig.Unit;
		y = y / CConfig.Unit;
		this.matrix[x][y] = 1;
	}

	clear(x, y) {
		x = x / CConfig.Unit;
		y = y / CConfig.Unit;
		this.matrix[x][y] = 0;
	}
}