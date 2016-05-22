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
	//result.geometry.translate(200, 2, 2);
	return result;
};