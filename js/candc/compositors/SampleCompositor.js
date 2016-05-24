/**
 * Created by eleven on 15/05/2016.
 */
class SampleCompositor extends Compositor {
	constructor() {
		super();
		var groundControl = new GroundControl();
		super.addComposite(groundControl);
		super.addComposite(new Tank(groundControl, 0, 0));
		super.addComposite(new Ground(groundControl));
	}
}