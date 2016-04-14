function Point(x, y, z) {

	this.x = x;
	this.y = y;
	this.z = Utils.isNotDefined() ? 0 : z;

	this.paths = [];
	this.nextPoints = [];
	this.prevPoints = [];
}

/** @param path {PointsPath} */
Point.prototype.addPath = function (path) {
	this.paths.push(path);
};

/** @param point {Point} */
Point.prototype.addNextPoint = function (point) {
	this.nextPoints.push(point);
};

/** @param point {Point} */
Point.prototype.addPrevPoint = function (point) {
	this.prevPoints.push(point);
};

/** @returns {boolean} */
Point.prototype.hasNext = function () {
	return this.nextPoints.length > 0;
};

/** @returns {Point|null} */
Point.prototype.getNext = function () {
	if (this.hasNext()) return this.nextPoints[0];
	else return null;
};