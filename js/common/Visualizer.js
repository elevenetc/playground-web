/**
 * @param scene {THREE.Scene}
 * @constructor
 */
function Visualizer(scene) {
	"use strict";
	this.chain = [];
	/** @type {THREE.Scene} */
	this.scene = scene;
	/** @type {boolean} */
	this.isRunning = false;
	this.color = 0xFFFFFF;
	this.delayTime = 100;
	this.animTime = 100;
	this.useDelay = true;
}

Visualizer.instance = null;

Visualizer.createInst = function (scene) {
	Visualizer.instance = new Visualizer(scene);
};

/** @returns {null|Visualizer} */
Visualizer.inst = function () {
	return Visualizer.instance;
};

Visualizer.prototype.update = function () {
	if (!this.isRunning && this.chain.length > 0) {
		var p = this.chain[0];
		this.chain.splice(0, 1);
		this.animateObject(p);
	}
};

Visualizer.prototype.add = function (point) {
	this.addPoint(point.x, point.y);
};

/**
 * @param x {number}
 * @param y {number}
 */
Visualizer.prototype.addPoint = function (x, y) {
	var point = Utils.createSquare(0.1, 0.1, this.color);
	point.position.x = x;
	point.position.y = y;
	this.chain.push(point);
};

Visualizer.prototype.addTwoLines = function (pA0, pA1, pB0, pB1) {
	group = new THREE.Object3D();
	var lineA = Utils.createLine(pA0.x, pA0.y, pA1.x, pA1.y, this.color);
	var lineB = Utils.createLine(pB0.x, pB0.y, pB1.x, pB1.y, this.color);
	lineA.material.linewidth = 5;
	lineB.material.linewidth = 5;

	group.add(lineA, lineB);
	// group.material.transparent = true;

	this.chain.push(group);
};

/**
 * @param x0 {number|Point}
 * @param y0 {number|Point}
 * @param x1 {number=}
 * @param y1 {number=}
 */
Visualizer.prototype.addLine = function (x0, y0, x1, y1) {

	if (Utils.isNotDefined(x1) && Utils.isNotDefined(y1)) {
		var pointA = x0;
		var pointB = y0;
		x0 = pointA.x;
		y0 = pointA.y;
		x1 = pointB.x;
		y1 = pointB.y;
	}

	var line = Utils.createLine(x0, y0, x1, y1, this.color);
	line.material.linewidth = 5;
	this.chain.push(line);
};

Visualizer.prototype.addPolygon = function (points) {
	var polygon = Utils.createPolygon(points, this.color, false);
	this.chain.push(polygon);
};

Visualizer.prototype.animateObject = function (point) {

	this.isRunning = true;
	var ref = this;
	this.scene.add(point);

	if (this.useDelay) {
		var tween = new TWEEN.Tween()
			.to({}, ref.delayTime)
			.onComplete(function () {
				ref.isRunning = false;
			});

		var matTween = new TWEEN.Tween(point.material)
			.to({opacity: 0}, ref.animTime)
			.easing(TWEEN.Easing.Cubic.InOut)
			.onComplete(function () {
				ref.scene.remove(point);
			});

		tween.chain(matTween).start();
	} else {
		new TWEEN.Tween(point.material)
			.to({opacity: 0}, ref.animTime)
			.easing(TWEEN.Easing.Cubic.InOut)
			.onComplete(function () {
				ref.isRunning = false;
				ref.scene.remove(point);
			}).start();
	}


};