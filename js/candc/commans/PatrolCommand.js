/**
 * Created by eleven on 30/05/2016.
 */
class PatrolCommand extends Command {

	constructor(entity, fromX, fromY, toX, toY) {
		this.entity = entity;
		this.fromX = fromX;
		this.fromY = fromY;
		this.toX = toX;
		this.toY = toY;
	}

	start() {
		super.start();

	}
}