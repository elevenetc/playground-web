/**
 * Created by eleven on 04/07/2016.
 */
var BaseTest = require('./BaseTest');
var DirectionComponent = require('../components/DirectionComponent');
var should = require('chai').should();

class TestDirectionComponent extends BaseTest {

	constructor() {
		super();
	}

	testDirections() {
		var dirComp = new DirectionComponent();
		dirComp.getDirection().should.equal(DirectionComponent.RIGHT_TOP);

		dirComp.setDirection(DirectionComponent.TOP).getDirection().should.equal(DirectionComponent.TOP);
		dirComp.setDirection(DirectionComponent.RIGHT_TOP).getDirection().should.equal(DirectionComponent.RIGHT_TOP);
		dirComp.setDirection(DirectionComponent.RIGHT).getDirection().should.equal(DirectionComponent.RIGHT);
		dirComp.setDirection(DirectionComponent.RIGHT_BOTTOM).getDirection().should.equal(DirectionComponent.RIGHT_BOTTOM);
		dirComp.setDirection(DirectionComponent.BOTTOM).getDirection().should.equal(DirectionComponent.BOTTOM);
		dirComp.setDirection(DirectionComponent.LEFT_BOTTOM).getDirection().should.equal(DirectionComponent.LEFT_BOTTOM);
		dirComp.setDirection(DirectionComponent.LEFT).getDirection().should.equal(DirectionComponent.LEFT);
		dirComp.setDirection(DirectionComponent.LEFT_TOP).getDirection().should.equal(DirectionComponent.LEFT_TOP);
	}
}
module.exports = TestDirectionComponent;