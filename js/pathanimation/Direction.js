function Direction() {

}

Direction.random = function () {
	var result;

	if (Utils.random())
		result = Utils.random() ? Direction.LEFT : Direction.RIGHT;
	else
		result = Utils.random() ? Direction.TOP : Direction.BOTTOM;

	return result;
};

Direction.toString = function (value) {
	if (value == Direction.LEFT) return "left";
	if (value == Direction.RIGHT) return "right";
	if (value == Direction.TOP) return "top";
	if (value == Direction.BOTTOM) return "bottom";
};

Direction.LEFT = 0;
Direction.RIGHT = 1;
Direction.TOP = 2;
Direction.BOTTOM = 3;