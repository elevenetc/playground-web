/**
 * Created by eleven on 15/05/2016.
 */
class SampleCompositor extends Compositor {
	constructor() {
		super();
		super.addComposite(new Tank());
		//super.addComposite(new Tank(200, 200));
		super.addComposite(new Ground());
	}
}