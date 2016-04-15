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
	this.animTime = 500;
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

Visualizer.prototype.addLine = function (x0, y0, x1, y1) {
	var line = Utils.createLine(x0, y0, x1, y1, this.color);
	line.material.linewidth = 5;
	this.chain.push(line);
};

Visualizer.prototype.animateObject = function (point) {

	this.isRunning = true;
	var ref = this;
	this.scene.add(point);

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
};