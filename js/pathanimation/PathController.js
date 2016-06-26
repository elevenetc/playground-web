function PathController(camera, scene, objectsArray) {

	var locX = 0;
	var locY = 0;

	this.run = function () {
		addAndRun(Direction.LEFT);
	};

	function addAndRun(direction) {

		console.log("dir:" + Direction.toString(direction) + " x:" + locX + " y:" + locY);

		new TWEEN.Tween(camera.position)
			.to({x: locX, y: locY}, GlobalConfig.ANIM_MID)
			.easing(TWEEN.Easing.Cubic.InOut)
			.onUpdate(function () {
				//
			}).start();

		objectsArray.push(new PathCell(direction, locX, locY).addTo(scene).run(function () {
			// addRandom();
			addDirect();
		}));
	}

	function addDirect() {
		var dir = Utils.random() ? Direction.TOP : Direction.RIGHT;
		if (dir == Direction.TOP) locY += 2;
		else locX += 2;
		addAndRun(dir);
	}

	function addRandom() {
		var dir = Direction.random();

		if (dir == Direction.LEFT) {
			locX -= 2;
		} else if (dir == Direction.RIGHT) {
			locX += 2;
		} else if (dir == Direction.TOP) {
			locY += 2;
		} else if (dir == Direction.BOTTOM) {
			locY -= 2;
		}

		addAndRun(dir);
	}
}