/**
 * Created by eleven on 21/06/2016.
 */

var BaseTest = require('./BaseTest');
var WeightComponent = require('../components/WeightComponent');
var should = require('chai').should();

class TestWeightComponent extends BaseTest {

	constructor() {
		super();
	}

	testWeightValue() {
		var w = 10;
		var weightComponent = new WeightComponent(w);
		this.weightComponent.getWeight().should.equal(w)
	}
}

module.exports = WeightComponent;