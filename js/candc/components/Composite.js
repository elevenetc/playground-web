/**
 * Created by eleven on 15/05/2016.
 */
var ViewComponent = require('./ViewComponent');
var MovementComponent = require('./MovementComponent');
var PositionComponent = require('./PositionComponent');
var WeightComponent = require('./WeightComponent');
var DimenComponent = require('./DimenComponent');

class Composite {
	constructor(id = null) {
		/** @type {Component[]} */
		this.components = [];
		/** @type {ViewComponent} */
		this.viewComponent = null;
		/** @type {PositionComponent} */
		this.positionComponent = null;
		/** @type {MovementComponent} */
		this.movementComponent = null;
		/** @type {DimenComponent} */
		this.dimenComponent = null;
		/** @type {WeightComponent} */
		this.weightComponent = null;
		/** @type {String} */
		this.id = id;

		this.activeCommand = null;
	}

	/** @returns {String} */
	getId() {
		return this.id;
	}

	update() {
		for (var i = 0; i < this.components.length; i++)
			this.components[i].update();
	}

	isVisibile() {
		return this.viewComponent != null;
	}

	/** @param component {Component} */
	addComponent(component) {
		if (component instanceof ViewComponent) this.viewComponent = component;
		if (component instanceof PositionComponent) this.positionComponent = component;
		if (component instanceof MovementComponent) this.movementComponent = component;
		if (component instanceof DimenComponent) this.dimenComponent = component;
		if (component instanceof WeightComponent) this.weightComponent = component;
		component.setComposite(this);
		this.components.push(component);
	}

	/** @returns {WeightComponent} */
	getWeightComponent() {
		return this.weightComponent;
	}

	/** @returns {DimenComponent} */
	getDimenComponent() {
		return this.dimenComponent;
	}

	/** @returns {PositionComponent} */
	getPositionComponent() {
		return this.positionComponent;
	}

	/** @returns {MovementComponent} */
	getMovementComponent() {
		return this.movementComponent;
	}

	/** @returns {ViewComponent} */
	getViewComponent() {
		return this.viewComponent;
	}

	compose() {

		for (var i = 0; i < this.components.length; i++) {
			this.components[i].onComposeFinished();
		}

		if (this.viewComponent != null) this.viewComponent.updatePosition(this.positionComponent);
	}

	toString() {
		return this.id;
	}
}

module.exports = Composite;