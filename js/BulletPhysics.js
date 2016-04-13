function BulletPhysics() {
	
	var w, h;
	var scene, camera, renderer;

	this.init = function () {
		initScene();
		addWall();
		renderScene();
	};

	function initScene() {
		renderer = new THREE.WebGLRenderer({antialias: true});
		w = 600;
		h = 600;
		renderer.setSize(w, h);
		document.getElementById(Config.DIV_NAME).appendChild(renderer.domElement);
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(60, w / h, 1, 100);

		camera.position.set(0, 0, 5);

		scene.add(camera);
	}

	function renderScene() {
		requestAnimationFrame(renderScene);
		renderer.render(scene, camera);
	}

	function addWall() {
		BulletWall.create().init().addTo(scene);
	}
}