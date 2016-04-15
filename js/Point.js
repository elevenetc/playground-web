"use strict";
function Point(x, y, z) {

	this.x = x;
	this.y = y;
	this.z = Utils.isNotDefined(z) ? 0 : z;

	/** @type {Array<PointsPath>} */
	this.paths = [];
	/** @type {Array<Point>} */
	this.neighbourPoints = [];
	/** @type {Point|null} */
	this.prev = null;
	/** @type {Point|null} */
	this.next = null;
	/** @type {Point|null} */
	this.intersection = null;
	/** @type {boolean} */
	this.isIntersection = false;
}

/** @return {boolean} */
Point.prototype.hasNextAndPrev = function () {
	return this.hasNext() && this.hasPrev();
};


/** @return {boolean} */
Point.prototype.hasNext = function () {
	return this.next != null;
};

/** @return {boolean} */
Point.prototype.hasPrev = function () {
	return this.prev != null;
};

/** @return {boolean} */
Point.prototype.hasInter = function () {
	return this.intersection != null;
};

/** @param point {Point} */
Point.prototype.setInter = function (point) {
	this.intersection = point;
};

/** @return {Point} */
Point.prototype.getInter = function () {
	return this.intersection;
};

/** @param point {Point} */
Point.prototype.setNext = function (point) {
	this.next = point;
};

/** @return {Point} */
Point.prototype.getNext = function () {
	return this.next;
};

/** @returns {Array.<PointsPath>} */
Point.prototype.getPaths = function () {
	return this.paths;
};

/** @return {Point} */
Point.prototype.getPrev = function () {
	return this.prev;
};

/** @param point {Point} */
Point.prototype.setPrev = function (point) {
	this.prev = point;
};

/** @param path {PointsPath} */
Point.prototype.addPath = function (path) {
	this.paths.push(path);
};

/** @param point {Point} */
Point.prototype.addPoint = function (point) {
	this.neighbourPoints.push(point);
};

/** @returns {boolean} */
Point.prototype.hasNeighbours = function () {
	return this.neighbourPoints.length > 0;
};

/** @returns {String} */
Point.prototype.getId = function () {
	return this.x + ":" + this.y;
};

/** @returns {String} */
Point.prototype.toString = function () {
	var result = {};
	// result.x = this.x;
	// result.y = this.y;
	result.id = this.getId();
	result.neighbours = [];
	result.paths = [];

	for (var i = 0; i < this.neighbourPoints.length; i++) {
		result.neighbours.push(this.neighbourPoints[i].getId());
	}

	for (var i = 0; i < this.paths.length; i++) {
		result.paths.push(this.paths[i].getId());
	}
	return JSON.stringify(result);
};