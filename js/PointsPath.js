"use strict";
function PointsPath() {

	/** @type {Array<Point>} */
	this.points = [];
	/** @type {Point} */
	this.first = null;
	/** @type {Point} */
	this.last = null;
	/** @type {*} */
	this.view = null;
	/** @type {string} */
	this.id = "";
}

PointsPath.create = function () {
	return new PointsPath();
};

/** @param point {Point} */
PointsPath.prototype.addPoint = function (point) {
	this.points.push(point);

	if (this.points.length == 1) {
		this.first = point;
		this.last = point;
	} else {
		this.last.addNextPoint(point);
		point.addPrevPoint(this.last);
		this.last = point;
	}
};

PointsPath.prototype.setView = function (view) {
	this.view = view;
};

PointsPath.prototype.getView = function () {
	return this.view;
};

/** @param points {Array<Point>} */
PointsPath.prototype.setPoints = function (points) {
	this.points = points;
	this.first = points[0];
	this.last = points[points.length - 1];
};

/** @returns {Array.<Point>|*} */
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