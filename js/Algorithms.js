"use strict";
function Algorithms() {

}

/**
 * @param pathA {PointsPath}
 * @param pathB {PointsPath}
 * @returns {Object}
 */
Algorithms.getIntersectionPointsOfPaths = function (pathA, pathB) {

	var result = {};

	if (pathB.length > pathA) {
		var tmp = pathA;
		pathA = pathB;
		pathB = tmp;
	}

	pathA.iterate(function (pointA0) {

		if (pointA0.hasNext()) {
			var pointA1 = pointA0.getNext();

			pathB.iterate(function (pointB0) {

				if (pointB0.hasNext()) {
					var pointB1 = pointB0.getNext();
					var interPoint = Algorithms.getLinesIntersectionPoint(pointA0, pointA1, pointB0, pointB1);
					if (interPoint != null) {
						interPoint.addPath(pathA);
						interPoint.addPath(pathB);
						var id = interPoint.getId();

						var pA = pathA.getById(id);
						var pB = pathB.getById(id);

						pA.setInter(interPoint);
						pB.setInter(interPoint);

						result[id] = interPoint;
					}
				}
			});
		}
	});

	return result;
};

/**
 * @param pointA0 {Point}
 * @param pointA1 {Point}
 * @param pointB0 {Point}
 * @param pointB1 {Point}
 * @returns {boolean}
 */
Algorithms.areLinesIntersect = function (pointA0, pointA1, pointB0, pointB1) {

	var m1, m2;
	var x1 = pointB1.x;
	var y1 = pointB1.y;
	var x2 = pointB0.x;
	var y2 = pointB0.y;

	var x3 = pointA1.x;
	var y3 = pointA1.y;
	var x4 = pointA0.x;
	var y4 = pointA0.y;

	if (x1 == x2) {
		return !(x3 == x4 && x1 != x3);
	} else if (x3 == x4) {
		return true;
	} else {
		// Both lines are not parallel to the y-axis
		m1 = (y1 - y2) / (x1 - x2);
		m2 = (y3 - y4) / (x3 - x4);
		return m1 != m2;
	}
};

/**
 * @param a1 {Point}
 * @param a2 {Point}
 * @param b1 {Point}
 * @param b2 {Point}
 * @returns {Point|null}
 */
Algorithms.getLinesIntersectionPoint = function (a1, a2, b1, b2) {

	var result = null;

	var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
	var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
	var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

	if (u_b != 0) {
		var ua = ua_t / u_b;
		var ub = ub_t / u_b;

		if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
			result = new Point(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y));
			result.isIntersection = true;
		} else {
			//no Intersection
		}
	} else {
		if (ua_t == 0 || ub_t == 0) {
			//coincident
		} else {
			//parallel
		}
	}

	return result;
};

/**
 * @param pointA0 {Point}
 * @param pointA1 {Point}
 * @param pointB0 {Point}
 * @param pointB1 {Point}
 * @returns {Point|null}
 */
Algorithms.getVectorsIntersection = function (pointA0, pointA1, pointB0, pointB1) {


	var x1 = pointB1.x;
	var y1 = pointB1.y;
	var x2 = pointB0.x;
	var y2 = pointB0.y;

	var x3 = pointA1.x;
	var y3 = pointA1.y;
	var x4 = pointA0.x;
	var y4 = pointA0.y;

	var d = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
	if (d == 0) { // If parallel, defaults to the average location of the lines.
		return null;
		//return new Point((x1 + x3) * 0.5, (y1 + y3) * 0.5);
	} else {
		var a = (x1 * y2) - (y1 * x2);
		var b = (x3 * y4) - (y3 * x4);
		return new Point(((a * (x3 - x4)) - ((x1 - x2) * b)) / d, ((a * (y3 - y4)) - ((y1 - y2) * b)) / d);
	}
};

/**
 *
 * @param fromPoint {Point}
 * @param toPoint {Point}
 * @param xStep {number}
 * @param yStep {number}
 * @returns {Array<Point>}
 */
Algorithms.genRandomLine = function (fromPoint, toPoint, xStep, yStep) {
	var result = [];
	var x = fromPoint.x;
	var y = fromPoint.y;
	var nextX, nextY;
	var dirX = 1, dirY = 1;
	var prevPoint = fromPoint;

	result.push(fromPoint);

	if (fromPoint.x > toPoint.x) dirX = -1;
	if (fromPoint.y > toPoint.y) dirY = -1;

	while (x != toPoint.x && y != toPoint.y) {
		nextX = Math.random() * xStep * dirX;
		nextY = Math.random() * yStep * dirY;

		x += nextX;
		y += nextY;

		if ((dirX == 1 && x > toPoint.x) || dirX == -1 && x < toPoint.x) {
			x = toPoint.x;
			y = toPoint.y;
		}
		if ((dirY == 1 && y > toPoint.y) || dirY == -1 && y < toPoint.y) {
			x = toPoint.x;
			y = toPoint.y;
		}

		var point = new Point(x, y);
		prevPoint.addPoint(point);
		point.addPoint(prevPoint);
		prevPoint = point;
		result.push(point);
	}

	return result;
};

/**
 * Generates 2D(flat) polygon coordinates
 * sample params: Algorithms.genRandomPolygon(1.0, 0.7, 0.5, 0.25, 0.25)
 *
 * @param maxHeight {number}
 * @param maxWidth {number}
 * @param midHeight {number}
 * @param xStep {number}
 * @param yStep {number}
 * @returns {Array}
 */
Algorithms.genRandomPolygon = function (maxHeight, maxWidth, midHeight, xStep, yStep) {
	var x = -1;
	var y = -1;
	var tmpX = 0;
	var tmpY = 0;
	var points = [];
	var i = 0;
	var leftBound = (maxWidth / 2) * -1;
	var rightBound = (maxWidth / 2);
	var isBack = false;

	while (x != 0 && y != 0) {

		tmpX = Math.random() * xStep;
		tmpY = Math.random() * yStep;

		if (x == -1 && y == -1) {
			x = 0;
			y = 0;
			points[i++] = new Point(x, y);
		}

		if (isBack) {
			if (y < midHeight) {
				x -= tmpX;
				y -= tmpY;

				if (x < 0) x = tmpX;

				if (y < 0) {
					x = 0;
					y = 0;
				}

			} else if (y < maxHeight) {
				x += tmpX;
				y -= tmpY;

				if (x > rightBound) x = rightBound - tmpX;
			}
		} else {
			if (y < midHeight) {
				x -= tmpX;
				y += tmpY;

				if (x < leftBound) x = leftBound + tmpX;

			} else if (y < maxHeight) {
				x += tmpX;
				y += tmpY;

				if (x > 0) x = -tmpX;
			} else {
				isBack = true;

				x += tmpX;
				y -= tmpY;
			}
		}

		points[i++] = new Point(x, y);
	}
	return points;
};

/**
 * @param startInter {Point}
 * @param nextInter {Point|undefined}
 * @param prevPath {PointsPath|undefined}
 * @param fragmentsMap {Object|undefined}
 */
Algorithms.genGraphFragments = function (startInter, nextInter, prevPath, fragmentsMap) {

	if (fragmentsMap == null) fragmentsMap = {};
	var paths = startInter.getPaths();
	var path = paths[0];

	Algorithms.findNextInterOnPath(startInter, path);

	return fragmentsMap;
};

/**
 *
 * @param destinationInter {Point}
 * @param path {PointsPath}
 */
Algorithms.findNextInterOnPath = function (destinationInter, path) {

	console.log("find of: " + path.getId());

	var current = path.getFirst();
	while (current != null) {
		if (current.hasInter()) {
			var inter = current.getInter();
			var paths = inter.getPaths();

			for (var i = 0; i < paths.length; i++) {
				var p = paths[i];
				if (p !== path) {
					console.log("path to discover-" + i + " :" + p.getId());

					var pUnderInter = p.getById(inter.getId());

					if (pUnderInter.hasNextAndPrev()) {
						console.log("Found path separation");
						Algorithms.findNextInterFromMiddleOfPath(destinationInter, pUnderInter, 1);
						Algorithms.findNextInterFromMiddleOfPath(destinationInter, pUnderInter, -1);
					} else if (pUnderInter.hasNext()) {
						Algorithms.findNextInterFromMiddleOfPath(destinationInter, pUnderInter, 1);
					} else if (pUnderInter.hasPrev()) {
						Algorithms.findNextInterFromMiddleOfPath(destinationInter, pUnderInter, -1);
					} else {
						console.log("End of path");
					}

				} else {
					console.log("path to avoid-" + i + " :" + p.getId());
				}


			}

			break;
		}
		current = current.getNext();
	}
};

/**
 *
 * @param destinationInter {Point}
 * @param point {Point} - middle of path
 * @param nextOrPrev {number} - next = 1, prev = -1
 */
Algorithms.findNextInterFromMiddleOfPath = function (destinationInter, point, nextOrPrev) {
	while (point != null) {
		if (nextOrPrev == 1) {
			point = point.getNext();
		} else {
			point = point.getPrev();
		}

		console.log("Check:" + point);

		if (point != null && point.hasInter() && point.getInter() === destinationInter) {
			point = null;
			console.log("Found destination!");
			return;
		}
	}

	console.log("Not found destination from middle of path:" + nextOrPrev);
};

