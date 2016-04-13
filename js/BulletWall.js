'use strict';

function BulletWall() {

	const wallWidth = 3;
	const wallHeight = 3;
	var wall;
	var circleA, circleB;
	var fragment;

	this.init = function () {

		wall = Utils.createSquare(wallWidth, wallHeight);
		circleA = Utils.createCircle(wallWidth / 4, 50, Utils.getMaterial(0.1));
		circleB = Utils.createCircle(wallWidth / 2, 50, Utils.getMaterial(0.1));

		var points = [4];
		points[0] = new Point(0, 0);
		points[1] = new Point(1, 1);
		points[2] = new Point(1, 0);
		points[3] = new Point(0, 0);
		fragment = genFragment(1.0, 0.7, 0.5, 0.25, 0.25);

		return this;
	};

	this.addTo = function (scene) {
		scene.add(wall);
		scene.add(circleA);
		scene.add(circleB);
		scene.add(fragment.getLine());
	};

	function genFragment(maxHeight, maxWidth, midHeight, maxXStep, maxYStep) {
		return Utils.createFragment(Algorithms.genRandomPolygon(maxHeight, maxWidth, midHeight, maxXStep, maxYStep));
	}
}

BulletWall.create = function () {
	return new BulletWall();
};