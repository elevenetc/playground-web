"use strict";
function PointsPath() {

	/** @type {Array<Point>} */
	this.pointsMap = {};
	// /** @type {Array<Point>} */
	// this.points = [];
	/** @type {Point} */
	this.first = null;
	/** @type {Point} */
	this.last = null;
	/** @type {*} */
	this.view = null;
	/** @type {string} */
	this.id = "";
	/** @type {number} */
	this.length = 0;
}

/** @returns {PointsPath} */
PointsPath.create = function () {
	return new PointsPath();
};

/** @param point {Point} */
PointsPath.prototype.addPoint = function (point) {

	//this.points.push(point);
	this.pointsMap[point.getId()] = point;
	this.length++;

	if (this.first == null) {
		this.first = point;
		this.last = point;
	} else {
		this.last.addPoint(point);
		this.last.setNext(point);
		point.setPrev(this.last);
		point.addPoint(this.last);
		this.last = point;
	}
};

PointsPath.prototype.setView = function (view) {
	this.view = view;
};

PointsPath.prototype.getView = function () {
	return this.view;
};

/** @returns {Point} */
PointsPath.prototype.getFirst = function () {
	return this.first;
};

/** @returns {Object} */
PointsPath.prototype.getPoints = function () {
	return this.points;
};

/** @param id {string} */
PointsPath.prototype.setId = function (id) {
	this.id = id;
};

/** @returns {string} */
PointsPath.prototype.getId = function () {
	return this.id;
};

/** @param fun {function} */
PointsPath.prototype.iterate = function (fun) {
	if (this.first != null) {
		var point = this.first;
		while (point != null) {
			fun(point);
			point = point.getNext();
		}
	}
};

/** @param point {point} */
PointsPath.prototype.replace = function (point) {

};