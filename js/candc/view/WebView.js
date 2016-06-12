/**
 * Created by eleven on 11/06/2016.
 */

var THREE = require('../../../bower_components/three.js/build/three.min');
var BaseView = require('./BaseView');
var CConfig = require('../CConfig');
var Modules = require('../Modules');

class WebView extends BaseView {

	constructor() {
		super();

		this.scene = null;
		this.renderer = null;
		this.camera = null;
		this.selectedObject = null;
		this.mouse = new THREE.Vector2();
		this.raycaster = new THREE.Raycaster();
	}

	getScene() {
		return this.scene;
	}

	init() {
		super.init();

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		var w = 600;
		var h = 600;

		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 0, 1000000);
		// this.camera = new THREE.PerspectiveCamera(60, w / h, 1, 1000000);

		this.renderer.setSize(w, h);
		document.getElementById('WebGLCanvas').appendChild(this.renderer.domElement);
		this.camera.position.set(CConfig.Unit, CConfig.Unit, 1000);

		this.initMouseHandlers();
	}

	initMouseHandlers() {
		var ref = this;
		document.addEventListener('mousemove', function (event) {
			event.preventDefault();
			ref.mouse.x = ( event.clientX / 600 ) * 2 - 1;
			ref.mouse.y = -( event.clientY / 600 ) * 2 + 1;
			// ref.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			// ref.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
		}, false);
	}

	render(updateHandler) {
		super.render();

		this.renderer.render(this.scene, this.camera);

		Modules.getAnimatorUpdate().update();
		this.handleMouseSelection();

		requestAnimationFrame(function () {
			updateHandler.renderScene();
		});
	}

	handleMouseSelection() {
		this.raycaster.setFromCamera(this.mouse, this.camera);
		var intersects = this.raycaster.intersectObjects(this.scene.children);

		if (intersects.length > 0) {

			if (this.selectedObject != intersects[0].object) {
				this.selectedObject = intersects[0].object;
				this.selectedObject.material.color.setHex(0xff0000);
			}

		} else {
			if (this.selectedObject !== null) this.selectedObject.material.color.setHex(0xfffff);
			this.selectedObject = null;
		}
	}
}

module.exports = WebView;