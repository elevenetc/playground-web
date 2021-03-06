/**
 * Created by eleven on 15/05/2016.
 */
var DimenComponent = require('./DimenComponent');
var MultiSquareView = require('./MultiSquareView');
var MovementComponent = require('./MovementComponent');
var PositionComponent = require('./PositionComponent');
var BoxViewComponent = require('./BoxViewComponent');
var WeightComponent = require('./WeightComponent');
var Composite = require('./Composite');
var SampleCommander = require('../commands/SampleCommander');

class Tank extends Composite {

	constructor(groundModel, initX, initY, id, commander) {
		super(id);

		var dimenComponent = new DimenComponent(1, 1);

		super.addComponent(new WeightComponent(1));
		super.addComponent(new PositionComponent(initX, initY, dimenComponent, groundModel));
		super.addComponent(new BoxViewComponent());
		super.addComponent(new MovementComponent(groundModel));
		super.addComponent(dimenComponent);
		super.addComponent(commander);
		super.compose();


	}
}

module.exports = Tank;