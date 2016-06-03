/**
 * Created by eleven on 15/05/2016.
 */
class SampleCompositor extends Compositor {
	constructor() {
		super();
		var conflictResolver = new ConflictResolver();
		var groundModel = new GroundModel();
		super.addComposite(groundModel);
		// super.addComposite(new Tank(conflictResolver, groundModel, 0, 3, 3, 3, 'a'));
		// super.addComposite(new Tank(conflictResolver, groundModel, 0, 3, 3, 0, 'b'));
		// super.addComposite(new Tank(conflictResolver, groundModel, CConfig.Unit * 2, CConfig.Unit * 2, 'b'));
		// super.addComposite(new Tank(conflictResolver, groundModel, CConfig.Unit * 3, CConfig.Unit * 3, 'c'));
		super.addComposite(new Ground(groundModel));
		super.addComposite(new BuildingComposite('x', 0, 0, 2, 2));
	}
}