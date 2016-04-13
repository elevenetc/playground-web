function Point(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = Utils.isNotDefined() ? 0 : z;

	var nextPoint = null;
	var previousPoint = null;

	this.setNext = function (point) {
		nextPoint = point;
	};

	this.setPrevious = function (point) {
		previousPoint = point;
	};

	this.getNext = function () {
		return nextPoint;
	};

	this.getPreviud = function () {
		return previousPoint;
	}

	this.hasNext = function(){
		return nextPoint != null;
	}
}