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
}