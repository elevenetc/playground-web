/**
 * Created by eleven on 15/05/2016.
 */
var Utils = require('./Utils');
var CConfig = require('../candc/Config');
var Modules = require('../candc/Modules');
var THREE = Modules.getThree();

class CreateObj {

	static box(width, height, depth, material) {
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
			material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false});

		var result = new THREE.Mesh(geometry, material);
		return result;
	};

	/**
	 *
	 * @param wUnits {int}
	 * @param hUnits {int}
	 * @param color {int}
	 * @returns {THREE.Object3D}
	 */
	static matrix(wUnits, hUnits, color = 0x000000) {

		if (wUnits === undefined || hUnits === undefined)
			throw new Error('Undefined params: ' + wUnits + ',' + hUnits);

		var group = new THREE.Object3D();
		var mat = {color: color, wireframe: false};

		for (var w = 0; w < wUnits; w++) {

			for (var h = 0; h < hUnits; h++) {
				var material = new THREE.MeshBasicMaterial(mat);
				var geometry = new THREE.PlaneGeometry(CConfig.Unit, CConfig.Unit, 1, 1);
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.x = CConfig.Unit * w;
				mesh.position.y = CConfig.Unit * h;
				group.add(mesh);
			}
		}

		return group;
	};

	static plane(width, height, material) {

		var geometry = new THREE.PlaneGeometry(width, height, 3, 3);
		if (Utils.isNotDefined(material))
			material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

		return new THREE.Mesh(geometry, material);
	};

}

module.exports = CreateObj;
