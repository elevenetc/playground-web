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
			[0, 0, 0, GroundModel.OBS]
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

	getType(x, y) {
		x = x / CConfig.Unit;
		y = y / CConfig.Unit;

		//check map boundaries
		if (x < 0 || y < 0 || x > this.matrix.length - 1 || y > this.matrix[0].length - 1)
			return GroundModel.OBS;

		return this.matrix[x][y];
		//var value = this.matrix[x][y];
		//var result = value != GroundModel.OBS && value == 0;
		//return
	}

	isAvailable(x, y) {
		var result = this.getType(x, y) == GroundModel.CLEAR;
		if (this.logAvaialability)
			console.log(x + ':' + y + ' - ' + (result ? 'available' : 'not available'));
		return result;
	}

	occupy(x, y) {
		x = x / CConfig.Unit;
		y = y / CConfig.Unit;
		this.matrix[x][y] = GroundModel.UNIT;
	}

	clear(x, y) {
		x = x / CConfig.Unit;
		y = y / CConfig.Unit;
		this.matrix[x][y] = GroundModel.CLEAR;
	}
}

GroundModel.CLEAR = 0;
GroundModel.UNIT = 1;
GroundModel.OBS = 2;