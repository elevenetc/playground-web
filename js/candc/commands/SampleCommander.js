/**
 * Created by eleven on 30/05/2016.
 */

var Commander = require('./Commander');
var PatrolCommand = require('./PatrolCommand');

class SampleCommander extends Commander {

	constructor(fromX, fromY, toX, toY) {
		super();
		this.fromX = fromX;
		this.fromY = fromY;
		this.toX = toX;
		this.toY = toY;
	}

	onComposeFinished() {
		super.onComposeFinished();
		var ref = this;
		var composite = super.getComposite();
		super.setCommand(new PatrolCommand(
			composite.getMovementComponent(),
			composite.getPositionComponent(),
			ref.fromX, ref.fromY,
			ref.toX, ref.toY
		));
	}
}

module.exports = SampleCommander;