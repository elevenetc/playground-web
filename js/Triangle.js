function Triangle(direction, x, y) {

	init();
	var mesh, geom, matrix, material;
	const animate = true;
	const MAX_ALPHA = 1.0;

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
			toYRot = 45;//90>0
			material.opacity = 1.0;
		} else if (direction == Direction.RIGHT) {
			mesh.rotation.y = Utils.toRad(0);
			toYRot = -45;//-90>0
			material.opacity = 1.0;
		}


		mesh.rotation.y = Utils.toRad(toYRot);
	};

	this.run = function (onCompleteHandler) {

		// material.opacity = 1.0;
		// mesh.rotation.y = Utils.toRad(toYRot);

		//console.log("from:" + mesh.rotation.y + " to " + toYRot);
		//console.log("toRad:" + Utils.toRad(toYRot));

		if (animate) {

			var toYRot = 0;
			var toXRot = 0;

			if (direction == Direction.LEFT) {
				mesh.rotation.y = Utils.toRad(90);
				toYRot = 0;
			} else if (direction == Direction.RIGHT) {
				mesh.rotation.y = Utils.toRad(-90);
				toYRot = 0;
			} else if (direction == Direction.TOP) {
				mesh.rotation.x = Utils.toRad(90);
				toYRot = 0;
			} else if (direction == Direction.BOTTOM) {
				mesh.rotation.x = Utils.toRad(-90);
				toYRot = 0;
			}

			mesh.rotation.alpha = 0;

			new TWEEN.Tween(mesh.rotation)
				.to({y: Utils.toRad(toYRot), x: Utils.toRad(toXRot), alpha: MAX_ALPHA}, Config.ANIM_MID)
				.easing(TWEEN.Easing.Cubic.InOut)
				.onComplete(onCompleteHandler == null ? Utils.emptyFun : onCompleteHandler)
				.onUpdate(function () {
					material.opacity = this.alpha;
				}).start();
		} else {
			material.opacity = 0.5;
			mesh.rotation.alpha = 1;

			if (onCompleteHandler != null) setTimeout(onCompleteHandler, 2000);
		}


		return this;
	};

	function init() {

		geom = new THREE.Geometry();
		var xRotationPivotShift = 0;
		var yRotationPivotShift = 0;
		var locShiftX = 0;
		var locShiftY = 0;

		if (direction == Direction.LEFT) {
			xRotationPivotShift = -1;
			locShiftX = 1;
		} else if (direction == Direction.RIGHT) {
			xRotationPivotShift = 1;
			locShiftX = -1;
		} else if (direction == Direction.TOP) {
			yRotationPivotShift = 1;
			locShiftY = -1;
		} else if (direction == Direction.BOTTOM) {
			yRotationPivotShift = -1;
			locShiftY = 1;
		}

		// geom.vertices.push(new THREE.Vector3(-1.0 + xRotationPivotShift, 1.0 + yRotationPivotShift, 0.0));
		// geom.vertices.push(new THREE.Vector3(-1.0 + xRotationPivotShift, -1.0 + yRotationPivotShift, 0.0));
		// geom.vertices.push(new THREE.Vector3(1.0 + xRotationPivotShift, -1.0 + yRotationPivotShift, 0.0));
		// geom.faces.push(new THREE.Face3(0, 1, 2));
		// geom.vertices.push(new THREE.Vector3(1.0 + xRotationPivotShift, -1.0 + yRotationPivotShift, 0.0));
		// geom.vertices.push(new THREE.Vector3(1.0 + xRotationPivotShift, 1.0 + yRotationPivotShift, 0.0));
		// geom.vertices.push(new THREE.Vector3(-1.0 + xRotationPivotShift, 1.0 + yRotationPivotShift, 0.0));
		// geom.faces.push(new THREE.Face3(3, 4, 5));

		geom.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
		geom.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
		geom.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
		geom.faces.push(new THREE.Face3(0, 1, 2));
		geom.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
		geom.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));
		geom.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
		geom.faces.push(new THREE.Face3(3, 4, 5));
		geom.translate(xRotationPivotShift, yRotationPivotShift, 0);

		mesh = new THREE.Mesh(geom, getBasicMaterial());

		mesh.position.x = x + locShiftX;
		mesh.position.y = y + locShiftY;
	}

	function getBasicMaterial() {
		material = new THREE.MeshBasicMaterial({
			color: 0xFFFFFF,
			side: THREE.DoubleSide
		});
		material.opacity = 0.0;
		material.transparent = true;
		material.side = THREE.DoubleSide;
		return material;
	}
}