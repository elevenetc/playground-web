function PointsPath() {

	var points = [];
	var first = null;
	var last = null;
	var view = null;

	this.addPoint = function (point) {
		points[points.length] = point;

		if (points.length == 1) {
			first = point;
			last = point;
		} else {
			last.setNext(point);
			point.setPrevious(last);
			last = point;
		}
	};

	this.getPoints = function () {
		return points;
	};

	this.getView = function () {
		return view;
	};

	this.setView = function (value) {
		view = value;
	};

	this.setPoints = function (value) {
		points = value;
		first = points[0];
		last = points[points.length - 1];
	}
}

PointsPath.create = function () {
	return new PointsPath();
};