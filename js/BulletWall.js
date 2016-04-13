'use strict';

function BulletWall() {

	const wallWidth = 3;
	const wallHeight = 3;
	var wall;
	var circleA, circleB;
	var intersecion;
	var fragments = [];

	this.init = function () {

		wall = Utils.createSquare(wallWidth, wallHeight, 0x00FF00);
		circleA = Utils.createCircle(wallWidth / 4, 50, Utils.getMaterial(0.1));
		circleB = Utils.createCircle(wallWidth / 2, 50, Utils.getMaterial(0.1));

		// fragment = genFragment(1.0, 0.7, 0.5, 0.25, 0.25);
		var step = 1;
		var fragmentLineA = genLineFragment(new Point(-1.5, -1.5), new Point(1.5, 1.5), step, step);
		var fragmentLineB = genLineFragment(new Point(-1.5, 1.5), new Point(1.5, -1.5), step, step);
		// var fragmentLineA = createLine(-1.5, -1.5, 1.5, 1.5);
		// var fragmentLineB = createLine(-1.5, 1.5, 1.5, -1.5);
		// var fragmentLineA = createLine(-1.5, -1.5, 1.5, 1.5);
		// var fragmentLineB = createLine(-1.5, 1.5, 1.5, 1.0);
		// var fragmentLineB = createLine(-1.5, 1.5, 0.5, 1.0);
		fragments[0] = fragmentLineA;
		fragments[1] = fragmentLineB;
		fragments[2] = createFrame();

		var loc = Algorithms.getIntersectionPointOfPaths(fragmentLineA.getPoints(), fragmentLineB.getPoints());
		if (loc != null)
			intersecion = Utils.createSquareAt(0.1, 0.1, loc.x, loc.y, 0x0000FF);
		else
			console.log("no intersection");

		return this;
	};

	this.addTo = function (scene) {
		//scene.add(wall);
		//scene.add(circleA);
		//scene.add(circleB);

		for (var i = 0; i < fragments.length; i++) {
			var f = fragments[i];
			scene.add(f.getView());
		}

		if (intersecion != null)scene.add(intersecion);
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