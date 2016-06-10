/**
 * Created by eleven on 03/06/2016.
 */

var Component = require('./Component');

class DimenComponent extends Component {

	constructor(width, height) {
		super();
		this.width = width;
		this.height = height;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}

}

module.exports = DimenComponent;