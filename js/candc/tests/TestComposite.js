/**
 * Created by eleven on 15/06/2016.
 */

var should = require('chai').should();
var BaseTest = require('./BaseTest');

var GroundModel = require('../components/GroundModel');
var Composite = require('../components/Composite');
var ViewComponent = require('../components/ViewComponent');
var MovementComponent = require('../components/MovementComponent');
var PositionComponent = require('../components/PositionComponent');
var DimenComponent = require('../components/DimenComponent');

class TestComposite extends BaseTest {

	constructor() {
		super();
	}

	testFields() {
		var id = 'id';
		var compsite = new Composite(id);

		var groundModel = new GroundModel();
		var view = new ViewComponent();
		var movement = new MovementComponent(groundModel);
		var dimen = new DimenComponent(1, 1);
		var position = new PositionComponent(0, 0, dimen, groundModel);

		view.setView({position: {x: 0, y: 0}});

		compsite.addComponent(view);
		compsite.addComponent(movement);
		compsite.addComponent(position);
		compsite.addComponent(dimen);
		compsite.compose();

		compsite.getId().should.equal(id);
		compsite.getMovementComponent().should.equal(movement);
		compsite.getViewComponent().should.equal(view);
		compsite.getDimenComponent().should.equal(dimen);
		compsite.getPositionComponent().should.equal(position);
	}
}

module.exports = TestComposite;