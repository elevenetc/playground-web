function Triangle(direction, x, y) {

	init();
	var mesh, geom, matrix, material;
	var ANIM_TIME = 1500;

	this.update = function () {
		//geom.applyMatrix(matrix);
	};

	this.addTo = function (scene) {
		scene.add(mesh);
		return this;
	};

	this.reset = function () {
		material.opacity = 0.0;
	};

	this.tmpUpdate = function () {

		if (mesh == null) return;

		var toYRot = 0;

		if (direction == Direction.LEFT) {
			mesh.rotation.y = Utils.toRad(90);
			toYRot = 0;//90>0
			material.opacity = 1.0;
		} else if (direction == Direction.RIGHT) {
			mesh.rotation.y = Utils.toRad(0);
			toYRot = -0;//-90>0
			material.opacity = 1.0;
		}


		mesh.rotation.y = Utils.toRad(toYRot);
	};

	this.run = function (onCompleteHandler) {

		// mesh.rotation.alpha = 0;
		mesh.position.x = x;
		mesh.position.y = y;

		var toYRot = 0;

		if (direction == Direction.LEFT) {
			mesh.rotation.y = Utils.toRad(90);
			toYRot = 0;
		} else if (direction == Direction.RIGHT) {
			mesh.rotation.y = Utils.toRad(0);
			toYRot = 0;
		}

		// material.opacity = 1.0;
		// mesh.rotation.y = Utils.toRad(toYRot);

		new TWEEN.Tween(mesh.rotation)
			.to({y: "-" + Utils.toRad(toYRot), alpha: 1.0}, ANIM_TIME)
			.easing(TWEEN.Easing.Cubic.InOut)
			.onComplete(onCompleteHandler == null ? Utils.emptyFun : onCompleteHandler)
			.onUpdate(function () {
				console.log(Utils.toDeg(this.y));
				material.opacity = this.alpha;
			}).start();

		return this;
	};

	function init() {

		geom = new THREE.Geometry();
		var xShift = -1;
		var yShift = -1;

		if (direction == Direction.LEFT) {
			xShift = -1;
		} else if (direction == Direction.RIGHT) {
			xShift = 1;
		}

		geom.vertices.push(new THREE.Vector3(-1.0 + xShift, 1.0 + yShift, 0.0));
		geom.vertices.push(new THREE.Vector3(-1.0 + xShift, -1.0 + yShift, 0.0));
		geom.vertices.push(new THREE.Vector3(1.0 + xShift, -1.0 + yShift, 0.0));
		geom.faces.push(new THREE.Face3(0, 1, 2));
		geom.vertices.push(new THREE.Vector3(1.0 + xShift, -1.0 + yShift, 0.0));
		geom.vertices.push(new THREE.Vector3(1.0 + xShift, 1.0 + yShift, 0.0));
		geom.vertices.push(new THREE.Vector3(-1.0 + xShift, 1.0 + yShift, 0.0));
		geom.faces.push(new THREE.Face3(3, 4, 5));


		mesh = new THREE.Mesh(geom, getBasicMaterial());
	}

	function getBasicMaterial() {
		material = new THREE.MeshBasicMaterial({
			color: 0xFFFFFF,
			side: THREE.DoubleSide
		});
		// material.opacity = 0.0;
		material.transparent = true;
		material.side = THREE.DoubleSide;
		return material;
	}
}