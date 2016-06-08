var Composite = require('../components/Composite');
var GroundModel = require('../components/GroundModel');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var matrix = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];

var groundModel = new GroundModel(matrix);

function testPathFinding() {
	var x = 1;
	var y = 2;
	var path = groundModel.findPath(0, 0, x, y);
	var lastPoint = path[path.length - 1];
	path.should.not.equal(null);
	lastPoint[1].should.equal(x);
	lastPoint[0].should.equal(y);
}

function testOccupation() {
	var x = 1;
	var y = 2;
	groundModel.occupy(null, x, y);
	groundModel.isAvailable(x, y).should.equal(false);
	groundModel.isAvailable(0, 0).should.equal(true);
}

testPathFinding();
testOccupation();


