/**
 * Created by eleven on 15/05/2016.
 */
class App {

	constructor() {
		this.scene = null;
		this.renderer = null;
		this.camera = null;
		this.compositor = null;
		this.mouse = new THREE.Vector2();
		this.raycaster = new THREE.Raycaster();
		this.selectedObject = null;
	}

	init() {
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		var w = Config.SCENE_WIDTH;
		var h = Config.SCENE_HEIGHT;

		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 0, 1000000);
		// this.camera = new THREE.PerspectiveCamera(60, w / h, 1, 1000000);

		this.renderer.setSize(w, h);
		document.getElementById(Config.DIV_NAME).appendChild(this.renderer.domElement);
		this.camera.position.set(CConfig.Unit, CConfig.Unit, 1000);

		this.initMouseHandlers();
		this.composeScene(this.scene);
		this.renderScene();
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

	composeScene() {
		this.compositor = new SampleCompositor();
		this.compositor.addToScene(this.scene);
	}

	renderScene() {

		this.compositor.update();
		this.renderer.render(this.scene, this.camera);

		TWEEN.update();

		this.handleMouseSelection();

		var self = this;
		requestAnimationFrame(function () {
			self.renderScene();
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

	toString() {
		return "CandC app";
	}
}