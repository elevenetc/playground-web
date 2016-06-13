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

		// super.addComposite(new LargeTank(groundModel, 0, 0, 2, 2, 'a'));
		super.addComposite(new Tank(groundModel, 0, 0, 0, 3, 'a'));
		super.addComposite(new Tank(groundModel, 3, 3, 0, 0, 'b'));
		// super.addComposite(new Tank(groundModel, CConfig.Unit * 2, CConfig.Unit * 2, 'b'));
		// super.addComposite(new Tank(groundModel, CConfig.Unit * 3, CConfig.Unit * 3, 'c'));
		super.addComposite(new Ground(groundModel));
		// super.addComposite(new BuildingComposite('x', groundModel, 0, 0, 2, 2));
	}
}

module.exports = SampleCompositor;