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

Utils.getMaterial = function (opacity, color, wireframe) {

    color = Utils.isNotDefined(color) ? 0xFF0000 : color;
    wireframe = Utils.isNotDefined(wireframe) ? false : wireframe;

    material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide
    });

    material.opacity = (opacity === undefined || opacity === null) ? 1.0 : opacity;
    material.transparent = true;
    material.wireframe = wireframe;
    material.side = THREE.DoubleSide;
    return material;
};

Utils.createCircle = function (radius, segments, material) {
    var circleGeometry = new THREE.CircleGeometry(radius, segments);
    return new THREE.Mesh(circleGeometry, material);
};

Utils.createSquareAt = function (width, height, x, y, color) {
    var result = Utils.createSquare(width, height, color);
    result.translateX(x);
    result.translateY(y);
    return result;
};

/**
 * @param polygonCoordinates {Array}
 * @param color {number}
 * @param wireframe {boolean}
 * @returns {THREE.Mesh}
 */
Utils.createPolygon = function (polygonCoordinates, color, wireframe) {
    var i;
    var geom = new THREE.Geometry();

    for (i = 0; i < polygonCoordinates.length; i++) {
        var p = polygonCoordinates[i];
        geom.vertices.push(new THREE.Vector3(p.x, p.y, 0.0));
    }

    var triangles = THREE.ShapeUtils.triangulateShape(geom.vertices, []);

    for (i = 0; i < triangles.length; i++)
        geom.faces.push(new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2]));

    return new THREE.Mesh(geom, Utils.getMaterial(1, color, wireframe));
};

/**
 * @param width {number}
 * @param height {number}
 * @param color {number}
 * @returns {THREE.Mesh}
 */
Utils.createSquare = function (width, height, color) {
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
    return new THREE.Mesh(geom, Utils.getMaterial(1, color));
};

Utils.isNotDefined = function (param) {
    return param === undefined || param === null;
};

Utils.lineMat = function (color) {
    color = Utils.isNotDefined(color) ? 0xFF0000 : color;
    return new THREE.LineBasicMaterial({color: color, transparent: true});
};

/**
 * @param points {Array<Point>}
 * @param color {number}
 * @returns {THREE.Line}
 */
Utils.createLineViewFromArray = function (points, color) {
    var geom = new THREE.Geometry();

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        geom.vertices.push(new THREE.Vector3(point.x, point.y, point.z));
    }

    return new THREE.Line(geom, Utils.lineMat(color));
};

Utils.createLine = function (x0, y0, x1, y1, color) {
    var geom = new THREE.Geometry();
    geom.vertices.push(new THREE.Vector3(x0, y0, 0));
    geom.vertices.push(new THREE.Vector3(x1, y1, 0));
    return new THREE.Line(geom, Utils.lineMat(color));
};

/**
 * @param first {Point}
 * @param color {number}
 * @returns {THREE.Line}
 */
Utils.createLineViewFromHead = function (first, color) {
    var geom = new THREE.Geometry();
    var point = first;

    while (point != null) {
        geom.vertices.push(new THREE.Vector3(point.x, point.y, point.z));
        point = point.getNext();
    }

    return new THREE.Line(geom, Utils.lineMat(color));
};

/**
 *
 * @param o {Object}
 * @return {string}
 */
Utils.toString = function (o) {
    var cache = [];
    return JSON.stringify(o, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
};

Utils.printArray = function (obj, objName) {
    "use strict";
    if (objName != null) console.log(objName + " {");
    else console.log("{");

    for (var name in obj)console.log("   " + name + ": " + obj[name]);

    console.log("}");
};

/**
 * @param array {Array}
 * @param fun {function}
 */
Utils.iterate = function (array, fun) {
    for (var i = 0; i < array.length; i++) {
        fun(array[i]);
    }
};