/**
 * Created by eleven on 15/05/2016.
 */

var Compositor = require('./Compositor');
var GroundModel = require('../components/GroundModel');
var Tank = require('../components/Tank');
var Ground = require('../components/Ground');
var SampleCommander = require('../commands/SampleCommander');

class OnePatrolSmallTank extends Compositor {
	constructor() {
		super();

		var groundModel = new GroundModel();
		var max = 5;
		var initX = max;
		var initY = max;
		var toX = 0;
		var toY = 0;
		var commander = new SampleCommander(initX, initY, toX, toY);

		super.addComposite(groundModel);
		super.addComposite(new Tank(groundModel, initX, initY, 'small-tank', commander));
		super.addComposite(new Ground(groundModel));
	}
}

module.exports = OnePatrolSmallTank;