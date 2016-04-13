function Algorithms() {

}



/**
 * sample(1.0, 0.7, 0.5, 0.25, 0.25)
 * @returns {Array} array of coordinate points
 */
Algorithms.genRandomPolygon = function (maxHeight, maxWidth, midHeight, maxXStep, maxYStep) {
	var x = -1;
	var y = -1;
	var tmpX = 0;
	var tmpY = 0;
	var points = [];
	var i = 0;
	var leftBound = (maxWidth / 2) * -1;
	var rightBound = (maxWidth / 2);
	var isBack = false;

	while (x != 0 && y != 0) {

		tmpX = Math.random() * maxXStep;
		tmpY = Math.random() * maxYStep;

		if (x == -1 && y == -1) {
			x = 0;
			y = 0;
			points[i++] = new Point(x, y);
		}

		if (isBack) {
			if (y < midHeight) {
				x -= tmpX;
				y -= tmpY;

				if (x < 0) x = tmpX;

				if (y < 0) {
					x = 0;
					y = 0;
				}

			} else if (y < maxHeight) {
				x += tmpX;
				y -= tmpY;

				if (x > rightBound) x = rightBound - tmpX;
			}
		} else {
			if (y < midHeight) {
				x -= tmpX;
				y += tmpY;

				if (x < leftBound) x = leftBound + tmpX;

			} else if (y < maxHeight) {
				x += tmpX;
				y += tmpY;

				if (x > 0) x = -tmpX;
			} else {
				isBack = true;

				x += tmpX;
				y -= tmpY;
			}
		}

		points[i++] = new Point(x, y);
	}
	return points;
};