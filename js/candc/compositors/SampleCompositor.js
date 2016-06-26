/**
 * Created by eleven on 15/05/2016.
 */

var Compositor = require('./Compositor');
var GroundModel = require('../components/GroundModel');
var LargeTank = require('../components/LargeTank');
var Tank = require('../components/Tank');
var Ground = require('../components/Ground');

class SampleCompositor extends Compositor {
	constructor() {
		super();
		var groundModel = new GroundModel();
		super.addComposite(groundModel);
		var max = 5;
		super.addComposite(new LargeTank(groundModel, 0, 0, 4, 4, 'large-a'));

		super.addComposite(new Tank(groundModel, max, max, 0, 0, 'small-a'));
		// super.addComposite(new Tank(groundModel, 0, 0, max, max, 'small-b'));
		// super.addComposite(new Tank(groundModel, 0, max, max, 0, 'small-c'));
		// super.addComposite(new Tank(groundModel, max, 0, 0, max, 'small-d'));

		// super.addComposite(new Tank(groundModel, 1, 2, 3, 0, 'c'));
		// super.addComposite(new Tank(groundModel, Config.Unit * 2, Config.Unit * 2, 'b'));
		// super.addComposite(new Tank(groundModel, Config.Unit * 3, Config.Unit * 3, 'c'));
		super.addComposite(new Ground(groundModel));
		// super.addComposite(new BuildingComposite('x', groundModel, 0, 0, 2, 2));
	}
}

module.exports = SampleCompositor;