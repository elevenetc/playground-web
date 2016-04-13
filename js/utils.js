function Utils() {

}

Utils.toRad = function (degrees) {
	return degrees * (Math.PI / 180);
};

Utils.toDeg = function (radians) {
	return radians * 180 / Math.PI;
};

Utils.emptyFun = function () {

};

Utils.random = function () {
	return Math.random() > 0.5;
};

Utils.getMaterial = function (opacity) {
	material = new THREE.MeshBasicMaterial({
		color: 0xFFFFFF,
		side: THREE.DoubleSide
	});

	material.opacity = (opacity === undefined || opacity === null) ? 1.0 : opacity;
	material.transparent = true;
	material.wireframe = true;
	material.side = THREE.DoubleSide;
	return material;
};


Utils.createCircle = function (radius, segments, material) {
	var circleGeometry = new THREE.CircleGeometry(radius, segments);
	return new THREE.Mesh(circleGeometry, material);
};

Utils.createSquare = function (width, height, material) {
	width /= 2;
	height /= 2;
	var geom = new THREE.Geometry();
	geom.vertices.push(new THREE.Vector3(-width, height, 0.0));
	geom.vertices.push(new THREE.Vector3(-width, -height, 0.0));
	geom.vertices.push(new THREE.Vector3(width, -height, 0.0));
	geom.faces.push(new THREE.Face3(0, 1, 2));
	geom.vertices.push(new THREE.Vector3(width, -height, 0.0));
	geom.vertices.push(new THREE.Vector3(width, height, 0.0));
	geom.vertices.push(new THREE.Vector3(-width, height, 0.0));
	geom.faces.push(new THREE.Face3(3, 4, 5));
	return new THREE.Mesh(geom, material);
};

Utils.isNotDefined = function (param) {
	return param === undefined || param === null;
};

Utils.lineMat = function (color) {
	color = Utils.isNotDefined(color) ? 0xFF0000 : color;
	return new THREE.LineBasicMaterial({color: color});
};

Utils.createFragment = function (points) {

	var geom = new THREE.Geometry();

	for (var i = 0, len = points.length; i < len; i++) {
		var point = points[i];
		geom.vertices.push(new THREE.Vector3(point.x, point.y, point.z));
	}

	return new Fragment(new THREE.Line(geom, Utils.lineMat()));
};