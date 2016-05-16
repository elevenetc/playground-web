/**
 * Created by eleven on 15/05/2016.
 */
function App() {
	"use strict";
	this.scene;
	this.renderer;
}

App.prototype.init = function () {
	renderer = new THREE.WebGLRenderer({antialias: true});
	var w = Config.SCENE_WIDTH;
	var h = Config.SCENE_HEIGHT;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(60, w / h, 1, 1000000);

	renderer.setSize(w, h);
	document.getElementById(Config.DIV_NAME).appendChild(renderer.domElement);
	camera.position.set(0, 0, 1000);

	this.composeScene(scene);

	this.renderScene();
};

App.prototype.composeScene = function (scene) {
	"use strict";
	var compositor = new SampleCompositor();
	compositor.addToScene(scene);
};

App.prototype.renderScene = function () {

	var self = this;
	requestAnimationFrame(function () {
		self.renderScene();
	});
	renderer.render(scene, camera);
	//TWEEN.update();
};

App.prototype.toString = function () {
	return "CandC app";
};