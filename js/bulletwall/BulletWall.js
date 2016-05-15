"use strict";
function BulletWall() {

	var wallWidth = 3;
	var wallHeight = 3;
	var views;

	function buildIntersectionPoints() {
		var intersectionPoints = BWAlgs.getIntersectionPointsOfPaths(views.slice());
		var inter = null;

		for (var id in intersectionPoints) {
			var point = intersectionPoints[id];
			if (inter == null) inter = point;

			views.push(Utils.createSquareAt(0.1, 0.1, point.x, point.y, 0x0000FF));
		}

		Utils.printArray(intersectionPoints, "Intersections");

		return inter;
	}

	function buildFragments() {
		var intersections = buildIntersectionPoints();
		BWAlgs.genGraphFragments(intersections);
	}

	this.init = function () {

		var step = 1;
		var pathLineTopDown = genLinePath(new Point(-1.5, 1.5), new Point(1.5, -1.5), step, step).setId("line-top-down");
		var pathLineDownTop = genLinePath(new Point(-1.5, -1.5), new Point(1.5, 1.5), step, step).setId("line-down-top");
		var pathFrame = createFrame().setId("frame");

		//views = [pathLineDownTop, pathLineTopDown, pathFrame];
		views = [pathLineDownTop, pathFrame];
		buildFragments();

		return this;
	};

	this.addTo = function (scene) {

		for (var i = 0; i < views.length; i++) {
			if (typeof(views[i].getView) == "function")
				scene.add(views[i].getView());
			else
				scene.add(views[i]);
		}

	};

	function createFrame() {
		var w = wallWidth / 2;
		var path = PointsPath.create();
		path.addPoint(new Point(-w, -w));
		path.addPoint(new Point(-w, w));
		path.addPoint(new Point(w, w));
		path.addPoint(new Point(w, -w));
		path.addPoint(new Point(-w, -w));
		path.close();
		path.setView(Utils.createLineViewFromHead(path.getFirst(), 0xFF0000));
		return path;
	}

	function createLine(x0, y0, x1, y1) {
		var path = PointsPath.create();
		path.addPoint(new Point(x0, y0));
		path.addPoint(new Point(x1, y1));
		return path;
	}

	function genLinePath(fromPoint, toPoint, xStep, yStep) {
		var points = BWAlgs.genRandomLineInSquare(fromPoint, toPoint, xStep, yStep);
		var path = PointsPath.create();
		Utils.iterate(points, function (point) {
			path.addPoint(point);
		});
		//path.setPoints(points);
		path.setView(Utils.createLineViewFromHead(path.getFirst(), 0xFF0000));
		return path;
	}
}

BulletWall.create = function () {
	return new BulletWall();
};