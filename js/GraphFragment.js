function GraphFragment() {
	"use strict";
	/** @type {Point|null} */
	this.startPoint = null;
	/** @type {Array<Point>} */
	this.points = [];
	/** @type {Object} */
	this.passedInters = {};
	/** @type {boolean} */
	this.isValid = false;
}

/** @returns {GraphFragment} */
GraphFragment.create = function () {
	return new GraphFragment();
};

GraphFragment.prototype.finish = function () {
	this.isValid = true;
};

/** @returns {Array<Point>} */
GraphFragment.prototype.getPoints = function () {
	return this.points;
};

/** @param point {Point} */
GraphFragment.prototype.setStartPoint = function (point) {
	this.startPoint = point;
	this.points.push(point);
};

/** @param point {Point} */
GraphFragment.prototype.addPoint = function (point) {
	this.points.push(point);
};

/** @return {GraphFragment} */
GraphFragment.prototype.clone = function () {
	var result = GraphFragment.create();
	//result.setStartPoint(this.startPoint);
	for (var i = 0; i < this.points.length; i++)
		result.addPoint(this.points[i]);

	return result;
};