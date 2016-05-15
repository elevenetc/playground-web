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

	scene.add(CreateObj.box(200, 200, 200, new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})));

	//scene.add(camera);

	this.renderScene();
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