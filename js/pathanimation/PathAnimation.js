function PathAnimation() {

	var w;
	var h;
	var scene;
	var camera;
	var renderer;
	var tri;
	var objects = [];
	const singleTest = false;
	initializeScene();
	renderScene();

	function initializeScene() {
		renderer = new THREE.WebGLRenderer({antialias: true});
		w = 600;//window.innerWidth;
		h = 600;//window.innerHeight;
		renderer.setSize(w, h);
		document.getElementById("WebGLCanvas").appendChild(renderer.domElement);
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(110, w / h, 1, 100);

		camera.rotateZ(Utils.toRad(135));
		camera.rotateX(Utils.toRad(40));

		camera.position.set(0, 0, 8);

		scene.add(camera);

		if (singleTest) {
			objects.push(new PathCell(Direction.BOTTOM, 0, 0).addTo(scene).run());
		} else {
			new PathController(camera, scene, objects).run();
		}
	}

	function runTri() {
		tri.reset();
		tri.run(runTri);
	}

	function renderScene() {
		requestAnimationFrame(renderScene);
		animate();
		renderer.render(scene, camera);
	}

	function animate() {
		for (var i = 0, len = objects.length; i < len; i++) {
			objects[i].update();
			//objects[i].tmpUpdate();
		}
		TWEEN.update();
	}

	function getShaderMaterial() {

		var vShader = document.getElementById('vertexShader').textContent;
		var fShader = document.getElementById('fragmentShader').textContent;

		return new THREE.ShaderMaterial({
			vertexShader: vShader,
			fragmentShader: fShader
		});
	}
}