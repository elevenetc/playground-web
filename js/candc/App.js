/**
 * Created by eleven on 15/05/2016.
 */
class App {

	constructor() {
		this.scene = null;
		this.renderer = null;
		this.camera = null;
		this.compositor = null;
	}

	init() {
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		var w = Config.SCENE_WIDTH;
		var h = Config.SCENE_HEIGHT;

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(60, w / h, 1, 1000000);

		this.renderer.setSize(w, h);
		document.getElementById(Config.DIV_NAME).appendChild(this.renderer.domElement);
		this.camera.position.set(0, 0, 1000);

		this.composeScene(this.scene);
		this.renderScene();
	}

	composeScene() {
		this.compositor = new SampleCompositor();
		this.compositor.addToScene(this.scene);
	}

	renderScene() {

		this.compositor.update();
		this.renderer.render(this.scene, this.camera);

		TWEEN.update();

		var self = this;
		requestAnimationFrame(function () {
			self.renderScene();
		});
	}

	toString() {
		return "CandC app";
	}
}