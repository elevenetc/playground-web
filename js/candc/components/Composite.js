/**
 * Created by eleven on 15/05/2016.
 */
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
		/** @type {String} */
		this.id = id;
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
		component.setComposite(this);
		this.components.push(component);
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

		if (this.viewComponent != null) this.viewComponent.updatePosition(this.positionComponent);

		for (var i = 0; i < this.components.length; i++) {
			this.components[i].onComposeFinished();
		}
	}

}