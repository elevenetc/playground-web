/**
 * Created by eleven on 10/06/2016.
 */

var GroundModel = require('../components/GroundModel');
var MovementComponent = require('../components/MovementComponent');
var Composite = require('../components/Composite');
var PositionComponent = require('../components/PositionComponent');
var DimenComponent = require('../components/DimenComponent');

class MovementComponentTests {

	constructor() {
		/** @type {MovementComponent} */
		this.movementComponent = null;
		/** @type {GroundModel} */
		this.groundModel = null;
		/** @type {Composite} */
		this.composite = null;
		/** @type {PositionComponent} */
		this.positionComponent = null;
		/** @type {DimenComponent} */
		this.dimenComponent = null;
	}

	before() {
		this.groundModel = new GroundModel([
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		]);
		this.composite = new Composite('a');
		this.movementComponent = new MovementComponent(this.groundModel);
		this.dimenComponent = new DimenComponent(1, 1);
		this.positionComponent = new PositionComponent(0, 0, this.dimenComponent, this.groundModel);

		this.composite.addComponent(this.dimenComponent);
		this.composite.addComponent(this.movementComponent);
		this.composite.addComponent(this.positionComponent);
		this.composite.compose();

		this.movementComponent.setComposite(this.composite);
	}

	run() {
		this.testBasicMovement();
	}

	testBasicMovement() {
		this.before();
		this.movementComponent.moveTo(0, 0, 2, 2, function () {

		});
	}
}

new MovementComponentTests().run();