/**
 * Created by eleven on 26/05/2016.
 */
class RandomPathMovementComponent extends MovementComponent {

	constructor(groundControl) {
		super();
		/** @type {PositionComponent} */
		this.positionComponent = null;
		this.animTime = 100;
		/** @type {GroundModel} */
		this.groundControl = groundControl;
		this.log = false;
	}

	onComposeFinished() {
		this.positionComponent = super.getComposite().getPositionComponent();
		this.nextRandomPosition();
	}

	nextRandomPosition() {
		var currentX = this.positionComponent.x / CConfig.Unit;
		var currentY = this.positionComponent.y / CConfig.Unit;

		var width = this.groundControl.getWidth();
		var height = this.groundControl.getHeight();

		var rndX = this.getRandomInt(0, width - 1);
		var rndY = this.getRandomInt(0, height - 1);

		if (currentX != rndX && currentY != rndY) this.moveTo(currentX, currentY, rndX, rndY);
		else this.waitForNext();
	}

	moveTo(fromX, fromY, toX, toY) {

		if (this.log) console.log('move (' + fromX + ':' + fromY + ')-(' + toX + ':' + toY + ')');
		var path = this.groundControl.findPath(fromX, fromY, toX, toY);
		if (this.log) console.log('path length: ' + path.length);

		if (path.length > 0) {
			this.moveToPoint(path);
		} else {
			this.waitForNext();
		}
	}

	waitForNext() {
		var ref = this;
		new TWEEN.Tween({})
			.to({}, ref.animTime)
			.onComplete(function () {
				ref.nextRandomPosition();
			})
			.start();
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	moveToPoint(path) {

		var x = 0;
		var y = 0;

		if (path.length == 0) {
			this.nextRandomPosition();
			return;
		} else {
			var point = path.splice(0, 1);
			x = point[0][1] * CConfig.Unit;
			y = point[0][0] * CConfig.Unit;
		}

		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.x;
		var fromY = positionComponent.y;
		var ref = this;

		new TWEEN.Tween({x: fromX, y: fromY})
			.to({x: x, y: y}, ref.animTime)
			.onUpdate(function () {
				positionComponent.setX(this.x);
				positionComponent.setY(this.y);
			})
			.onComplete(function () {
				ref.moveToPoint(path);
			})
			.start();
	}
}

