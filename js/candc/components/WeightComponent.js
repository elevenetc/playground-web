/**
 * Created by eleven on 19/06/2016.
 */
var Component = require('./Component');

class WeightComponent extends Component {

	constructor(weight = 1) {
		this();
		if (weight < 0) throw new Error('Invalid weight: ' + weight);
		this.weight = weight;
	}

	getWeight() {
		return this.weight;
	}
}

module.exports = WeightComponent;