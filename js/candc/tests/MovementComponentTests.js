/**
 * Created by eleven on 10/06/2016.
 */

var BaseTest = require('./BaseTest');
var GroundModel = require('../components/GroundModel');
var MovementComponent = require('../components/MovementComponent');
var Composite = require('../components/Composite');
var PositionComponent = require('../components/PositionComponent');
var DimenComponent = require('../components/DimenComponent');
var should = require('chai').should();

class MovementComponentTests extends BaseTest {

	constructor() {
		super();
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

	testBasicMovement() {
		const fromX = 0;
		const fromY = 0;
		const toX = 1;
		const toY = 1;
		this.movementComponent.moveTo(fromX, fromY, toX, toY);
		this.positionComponent.getX().should.equal(toX);
		this.positionComponent.getY().should.equal(toY);
		this.groundModel.isAvailable(toX, toY).should.equal(false);
		this.groundModel.isAvailable(fromX, fromY).should.equal(true);
	}
}

module.exports = MovementComponentTests;