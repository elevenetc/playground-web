function init() {

	var w;
	var h;
	var scene;
	var camera;
	var renderer;
	var tri;
	var objects = [];
	initializeScene();
	renderScene();

	function initializeScene() {
		renderer = new THREE.WebGLRenderer({antialias: true});
		w = 200;//window.innerWidth;
		h = 200;//window.innerHeight;
		renderer.setSize(w, h);
		document.getElementById("WebGLCanvas").appendChild(renderer.domElement);
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(45, w / h, 1, 100);
		camera.position.set(0, 0, 10);
		camera.lookAt(scene.position);
		scene.add(camera);

		objects.push(new Triangle(Direction.RIGHT, 0, 0).addTo(scene).run());
		// objects.push(new Triangle(Direction.LEFT, 0, 0).addTo(scene).run());
		// tri = new Triangle(Direction.RIGHT, 0, 0);
		// objects.push(new Triangle(2, 0).addTo(scene));
		// objects.push(new Triangle(4, 0).addTo(scene));
		//new PathController(camera, scene, objects).run();
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