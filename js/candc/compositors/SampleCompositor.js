/**
 * Created by eleven on 15/05/2016.
 */
class SampleCompositor extends Compositor {
	constructor() {
		super();
		var groundControl = new GroundModel();
		super.addComposite(groundControl);
		super.addComposite(new Tank(groundControl, 0, 0));
		super.addComposite(new Tank(groundControl, CConfig.Unit, CConfig.Unit));
		super.addComposite(new Tank(groundControl, CConfig.Unit * 2, CConfig.Unit * 2));
		super.addComposite(new Ground(groundControl));
	}
}