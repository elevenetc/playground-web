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

CreateObj.plane = function (width, height, material) {
	"use strict";

	var geometry = new THREE.PlaneGeometry(width, height, 3, 3);
	if (Utils.isNotDefined(material))
		material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
	
	return new THREE.Mesh(geometry, material);
};