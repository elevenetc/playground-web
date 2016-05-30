/**
 * Created by eleven on 30/05/2016.
 */
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
		super.setCommand(new PatrolCommand(super.getComposite(),
			ref.fromX, ref.fromY,
			ref.toX, ref.toY
		));
	}
}