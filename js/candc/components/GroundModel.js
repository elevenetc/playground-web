/**
 * Created by eleven on 24/05/2016.
 */
class GroundModel extends Composite {

	constructor() {
		super();
		this.xPositions = {
			'-100': true, '0': true, '100': true
		};
		this.yPositions = {
			'-100': true, '0': true, '100': true
		};
		this.logAvaialability = false;
	}

	isAvailable(x, y) {
		var isX = this.xPositions.hasOwnProperty(x);
		var isY = this.yPositions.hasOwnProperty(y);
		if (!isX || !isY) return false;
		var xPosition = this.xPositions[x + ''];
		var yPosition = this.yPositions[y + ''];
		var result = xPosition || yPosition;
		if (this.logAvaialability)
			console.log(x + ':' + y + ' - ' + (result ? 'available' : 'not available'));
		return result;
	}

	occupy(x, y) {
		this.xPositions[x + ''] = false;
		this.yPositions[y + ''] = false;
	}

	clear(x, y) {
		this.xPositions[x + ''] = true;
		this.yPositions[y + ''] = true;
	}
}