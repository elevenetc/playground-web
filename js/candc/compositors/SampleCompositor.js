/**
 * Created by eleven on 15/05/2016.
 */
class SampleCompositor extends Compositor {
	constructor() {
		super();
		var conflictResolver = new ConflictResolver();
		var groundControl = new GroundModel();
		super.addComposite(groundControl);
		super.addComposite(new Tank(conflictResolver, groundControl, 0, 0, 'a'));
		super.addComposite(new Tank(conflictResolver, groundControl, CConfig.Unit * 3, CConfig.Unit * 3, 'b'));
		// super.addComposite(new Tank(groundControl, CConfig.Unit * 2, CConfig.Unit * 2));
		super.addComposite(new Ground(groundControl));
		// super.addComposite(new PathGround(groundControl, this));
	}
}