/**
 * Created by eleven on 15/05/2016.
 */
class Composite {
	constructor() {
		this.components = [];
		this.viewComponent = null;
		this.positionComponent = null;
	}

	update() {

	}

	addComponent(component) {
		if (component instanceof ViewComponent) this.viewComponent = component;
		if (component instanceof PositionComponent) this.positionComponent = component;
		this.components.push(component);
	}

	getViewComponent() {
		return this.viewComponent;
	}

	compose() {
		if (this.positionComponent != null) {
			this.viewComponent.updatePosition(this.positionComponent);
		}
	}

}