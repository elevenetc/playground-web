function Point(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = Utils.isNotDefined() ? 0 : z;
}