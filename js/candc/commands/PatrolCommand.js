/**
 * Created by eleven on 30/05/2016.
 */
var Command = require('./Command');

class PatrolCommand extends Command {

	constructor(movementComponent,
	            positionComponent,
	            fromX, fromY,
	            toX, toY) {
		super();
		/*** @type {MovementComponent} */
		this.movementComponent = movementComponent;
		/*** @type {PositionComponent} */
		this.positionComponent = positionComponent;
		this.fromX = fromX;
		this.fromY = fromY;
		this.toX = toX;
		this.toY = toY;
		this.currentTarget = [toX, toY];
	}

	start() {
		super.start();
		this.setCurrentTarget();
		this.moveToCurrentTarget();
	}

	moveToCurrentTarget() {
		var ref = this;
		var x = this.positionComponent.getX();
		var y = this.positionComponent.getY();
		this.movementComponent.moveTo(
			x, y,
			this.currentTarget[0], this.currentTarget[1],
			function () {
				ref.setCurrentTarget();
				ref.moveToCurrentTarget();
			}
		);
	}

	setCurrentTarget() {
		var x = this.positionComponent.getX();
		var y = this.positionComponent.getY();

		if (x == this.fromX && y == this.fromY)
			this.currentTarget = [this.toX, this.toY];
		else
			this.currentTarget = [this.fromX, this.fromY];
	}
}

module.exports = PatrolCommand;