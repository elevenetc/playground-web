function PathController(camera, scene, objectsArray) {

	var locX = 6;
	var locY = 6;

	this.run = function () {
		addAndRun(Direction.LEFT);
	};

	function addAndRun(direction) {

		console.log(Direction.toString(direction));

		new TWEEN.Tween(camera.position)
			.to({x: locX - 1, y: locY - 1}, 1500)
			.easing(TWEEN.Easing.Cubic.InOut)
			.onUpdate(function () {
				//console.log(this.x);
				//material.opacity = this.alpha;
			}).start();

		// camera.position.set(locX, 0, 10);
		objectsArray.push(new Triangle(direction, locX, locY).addTo(scene).run(function () {

			var changeX = Math.random() > 0.5;
			var changeY = Math.random() > 0.5;
			var directionX = Math.random() > 0.5;
			var directionY = Math.random() > 0.5;

			locX -= changeX ? 2 * (directionX ? -1 : 1) : 0;
			locY -= changeY ? 2 : 0;

			if (!changeX && !changeY) {
				if (Math.random() > 0.5)locX += 2;
				else locY += 2;
			}


			addAndRun(directionX ? Direction.RIGHT : Direction.LEFT);
		}));
	}
}