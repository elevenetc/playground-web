/**
 * Created by eleven on 15/05/2016.
 */
function CreateObj() {

}

CreateObj.box = function (width, height, depth, material) {
	"use strict";

	if (Utils.isNotDefined(width)) {
		width = 200;
		height = 200;
		depth = 200;
	}

	if (Utils.isNotDefined(height)) {
		height = width;
		depth = width;
	}

	var geometry = new THREE.BoxGeometry(width, height, depth);
	if (Utils.isNotDefined(material))
		material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

	var result = new THREE.Mesh(geometry, material);
	return result;
};

/**
 *
 * @param wUnits {int}
 * @param hUnits {int}
 * @returns {THREE.Object3D}
 */
CreateObj.matrix = function (wUnits, hUnits) {

	var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
	var group = new THREE.Object3D();

	for (var w = 0; w < wUnits; w++) {

		for (var h = 0; h < hUnits; h++) {
			var geometry = new THREE.PlaneGeometry(CConfig.Unit, CConfig.Unit, 1, 1);
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = CConfig.Unit * w;
			mesh.position.y = CConfig.Unit * h;
			group.add(mesh);
		}
	}

	return group;
};

CreateObj.plane = function (width, height, material) {
	"use strict";

	var geometry = new THREE.PlaneGeometry(width, height, 3, 3);
	if (Utils.isNotDefined(material))
		material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

	return new THREE.Mesh(geometry, material);
};