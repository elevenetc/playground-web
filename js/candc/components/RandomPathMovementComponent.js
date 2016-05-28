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
		var currentX = this.positionComponent.getX();
		var currentY = this.positionComponent.getY();

		var width = this.groundControl.getWidth();
		var height = this.groundControl.getHeight();

		var rndX = this.getRandomInt(0, width - 1);
		var rndY = this.getRandomInt(0, height - 1);

		if (currentX != rndX && currentY != rndY) this.moveTo(currentX, currentY, rndX, rndY);
		else this.waitForNext();
	}

	moveTo(fromX, fromY, toX, toY) {
		console.log('moveTo');
		if (this.log) console.log('move (' + fromX + ':' + fromY + ')-(' + toX + ':' + toY + ')');
		this.path = this.groundControl.findPath(fromX, fromY, toX, toY);
		if (this.log) console.log('path length: ' + this.path.length);

		if (this.path.length > 0) {
			this.targetPoint = [toX, toY];
			this.moveToPoint();
		} else {
			this.waitForNext();
		}

	}

	waitForNext() {
		console.log('waitForNext');
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

	getPath() {
		return this.path;
	}

	moveToPoint() {
		console.log('moveToPoint');
		var x = 0;
		var y = 0;
		var composite = super.getComposite();
		var positionComponent = composite.getPositionComponent();
		var fromX = positionComponent.getX();
		var fromY = positionComponent.getY();
		var ref = this;

		if (this.path.length == 0) {
			this.path = null;
			this.nextRandomPosition();
			return;
		} else {
			var point = this.path.splice(0, 1);
			x = point[0][1];
			y = point[0][0];

			if (!(fromX == x && fromY == y) && !this.groundControl.isAvailable(x, y)) {
				this.path = [];
				this.moveTo(fromX, fromY, this.targetPoint[0], this.targetPoint[1]);
				console.log('found obstancle');
				return;
			}
		}

		this.groundControl.clear(fromX, fromY);
		this.groundControl.occupy(x, y);

		new TWEEN.Tween({x: fromX * CConfig.Unit, y: fromY * CConfig.Unit})
			.to({x: x * CConfig.Unit, y: y * CConfig.Unit}, ref.animTime)
			.onUpdate(function () {
				positionComponent.setX(this.x);
				positionComponent.setY(this.y);
			})
			.onComplete(function () {
				ref.moveToPoint();
			})
			.start();
	}
}

