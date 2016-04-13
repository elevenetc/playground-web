/**
 *
 * @param line instance of THREE.Line
 * @param points array of Point
 * @constructor
 */
function Fragment(view, points) {
	this.getView = function () {
		return view;
	};

	this.getPoints = function () {
		return points;
	}
}