var Composite = require('../components/Composite');
var GroundModel = require('../components/GroundModel');
var BaseTest = require('./BaseTest');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

class TestGroundModel extends BaseTest {

	constructor() {
		super();
		this.matrix = null;
		/** @type {GroundModel} */
		this.groundModel = null;
	}

	before() {
		this.matrix = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		];
		this.groundModel = new GroundModel(this.matrix);
	}

	testPathFinding() {
		var x = 1;
		var y = 2;
		var path = this.groundModel.findPath(0, 0, x, y);
		var lastPoint = path[path.length - 1];
		path.should.not.equal(null);
		lastPoint[1].should.equal(x);
		lastPoint[0].should.equal(y);
	}

	testOccupation() {
		var x = 1;
		var y = 2;
		this.groundModel.occupy(null, x, y);
		this.groundModel.isAvailable(x, y).should.equal(false);
		this.groundModel.isAvailable(0, 0).should.equal(true);
	}

	testClear() {
		var x = 0;
		var y = 0;
		this.groundModel.isAvailable(x, y).should.equal(true);
		this.groundModel.occupy(null, x, y);
		this.groundModel.isAvailable(x, y).should.equal(false);
		this.groundModel.clear(x, y);
		this.groundModel.isAvailable(x, y).should.equal(true);
	}
}

module.exports = TestGroundModel;


