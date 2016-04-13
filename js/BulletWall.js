'use strict';

function BulletWall() {

	const wallWidth = 3;
	const wallHeight = 3;
	var wall;
	var circleA, circleB;
	var views = [];

	this.init = function () {

		wall = Utils.createSquare(wallWidth, wallHeight, 0x00FF00);
		circleA = Utils.createCircle(wallWidth / 4, 50, Utils.getMaterial(0.1));
		circleB = Utils.createCircle(wallWidth / 2, 50, Utils.getMaterial(0.1));

		// fragment = genFragment(1.0, 0.7, 0.5, 0.25, 0.25);
		var step = 1;
		var viewLineA = genLineFragment(new Point(-1.5, -1.5), new Point(1.5, 1.5), step, step);
		var viewLineB = genLineFragment(new Point(-1.5, 1.5), new Point(1.5, -1.5), step, step);
		// var viewLineA = createLine(-1.5, -1.5, 1.5, 1.5);
		// var viewLineB = createLine(-1.5, 1.5, 1.5, -1.5);
		// var viewLineA = createLine(-1.5, -1.5, 1.5, 1.5);
		// var viewLineB = createLine(-1.5, 1.5, 1.5, 1.0);
		// var viewLineB = createLine(-1.5, 1.5, 0.5, 1.0);
		views[0] = viewLineA;
		views[1] = viewLineB;
		views[2] = createFrame();

		var loc = Algorithms.getIntersectionPointsOfPaths(views[2].getPoints(), viewLineB.getPoints());
		// var loc = Algorithms.getIntersectionPointsOfPaths(viewLineA.getPoints(), viewLineB.getPoints());
		if (loc.length > 0) {
			for (var i = 0; i < loc.length; i++) {
				views.push(Utils.createSquareAt(0.1, 0.1, loc[i].x, loc[i].y, 0x0000FF));
			}
		} else console.log("no intersection");

		return this;
	};

	this.addTo = function (scene) {
		//scene.add(wall);
		//scene.add(circleA);
		//scene.add(circleB);

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
		path.setView(Utils.createLineView(path.getPoints(), 0x00FF00));
		return path;
	}

	function createLine(x0, y0, x1, y1) {
		var path = PointsPath.create();
		path.addPoint(new Point(x0, y0));
		path.addPoint(new Point(x1, y1));
		return path;
	}

	function genLineFragment(fromPoint, toPoint, xStep, yStep) {
		var points = Algorithms.genRandomLine(fromPoint, toPoint, xStep, yStep);
		var path = PointsPath.create();
		path.setPoints(points);
		path.setView(Utils.createLineView(points, 0xFF0000));
		return path;
	}

	function genFragment(maxHeight, maxWidth, midHeight, maxXStep, maxYStep) {
		return Utils.createFragment(Algorithms.genRandomPolygon(maxHeight, maxWidth, midHeight, maxXStep, maxYStep));
	}
}

BulletWall.create = function () {
	return new BulletWall();
};