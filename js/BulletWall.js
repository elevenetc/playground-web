"use strict";
function BulletWall() {

	const wallWidth = 3;
	const wallHeight = 3;
	var wall;
	var circleA, circleB;
	var views;

	this.init = function () {

		wall = Utils.createSquare(wallWidth, wallHeight, 0x00FF00);
		circleA = Utils.createCircle(wallWidth / 4, 50, Utils.getMaterial(0.1));
		circleB = Utils.createCircle(wallWidth / 2, 50, Utils.getMaterial(0.1));

		// fragment = genFragment(1.0, 0.7, 0.5, 0.25, 0.25);
		var step = 1;
		var pathA = genLinePath(new Point(-1.5, -1.5), new Point(1.5, 1.5), step, step);
		var pathB = genLinePath(new Point(-1.5, 1.5), new Point(1.5, -1.5), step, step);
		var pathFrame = createFrame();

		pathA.setId("top-to-down");
		pathB.setId("down-to-top");
		pathFrame.setId("frame");

		// var pathA = createLine(-1.5, -1.5, 1.5, 1.5);
		// var pathB = createLine(-1.5, 1.5, 1.5, -1.5);
		// var pathA = createLine(-1.5, -1.5, 1.5, 1.5);
		// var pathB = createLine(-1.5, 1.5, 1.5, 1.0);
		// var pathB = createLine(-1.5, 1.5, 0.5, 1.0);
		// views = [pathA, pathB, pathFrame];
		views = [pathB, pathFrame];

		var intersectionPoints = Algorithms.getIntersectionPointsOfPaths(pathB, pathFrame);

		for (var id in intersectionPoints) {
			console.log("Intersection:" + id);
			var point = intersectionPoints[id];
			views.push(Utils.createSquareAt(0.1, 0.1, point.x, point.y, 0x0000FF));
		}

		// var intersectionPoints = Algorithms.getIntersectionPointsOfPaths(pathA, pathB);
		// if (intersectionPoints.length > 0) {
		//
		// 	console.log("Found " + intersectionPoints.length + " intersections");
		//
		// 	for (var i = 0; i < intersectionPoints.length; i++) {
		// 		var point = intersectionPoints[i];
		// 		console.log(i + ":" + point.toString());
		// 		//console.log(i + ">" + Utils.toString(point));
		// 		//point.printJoints();
		// 		views.push(Utils.createSquareAt(0.1, 0.1, point.x, point.y, 0x0000FF));
		// 	}
		// } else console.log("no intersection");


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
		path.setView(Utils.createLineView(path.getFirst(), 0x00FF00));
		return path;
	}

	function createLine(x0, y0, x1, y1) {
		var path = PointsPath.create();
		path.addPoint(new Point(x0, y0));
		path.addPoint(new Point(x1, y1));
		return path;
	}

	function genLinePath(fromPoint, toPoint, xStep, yStep) {
		var points = Algorithms.genRandomLine(fromPoint, toPoint, xStep, yStep);
		var path = PointsPath.create();
		Utils.iterate(points, function (point) {
			path.addPoint(point);
		});
		//path.setPoints(points);
		path.setView(Utils.createLineView(path.getFirst(), 0xFF0000));
		return path;
	}
}

BulletWall.create = function () {
	return new BulletWall();
};