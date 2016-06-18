/**
 * Created by eleven on 11/06/2016.
 */

var Modules = require('../Modules');
var THREE = Modules.getThree();
var BaseView = require('./BaseView');
var CConfig = require('../CConfig');

class WebView extends BaseView {

	constructor() {
		super();

		this.scene = null;
		this.renderer = null;
		this.camera = null;
		this.selectedObject = null;
		this.mouseOver = new THREE.Vector2();
		this.mouseClick = new THREE.Vector2();
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
			ref.mouseOver.x = ( event.clientX / 600 ) * 2 - 1;
			ref.mouseOver.y = -( event.clientY / 600 ) * 2 + 1;
		}, false);

		document.addEventListener('click', function (event) {
			event.preventDefault();
			ref.mouseClick.x = ( event.clientX / 600 ) * 2 - 1;
			ref.mouseClick.y = -( event.clientY / 600 ) * 2 + 1;
			ref.handleMouseClick();
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

	handleMouseClick() {
		var intersects = this.getIntersections(this.mouseClick);
		if (intersects.length > 0) {
			if (intersects[0].object.composite !== null && intersects[0].object.composite !== undefined) {
				/*** @type {Composite} */
				var composite = intersects[0].object.composite;
				console.log('id:' + composite.getId() + ' ' + composite.getMovementComponent().toString());
			}
		}
	}

	handleMouseSelection() {
		var intersects = this.getIntersections(this.mouseOver);

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

	getIntersections(vector) {
		this.raycaster.setFromCamera(vector, this.camera);
		return this.raycaster.intersectObjects(this.scene.children);
	}
}

module.exports = WebView;