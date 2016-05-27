/**
 * Created by eleven on 15/05/2016.
 */
class Compositor {
	constructor() {
		/*** @type {Array.<Composite>} */
		this.composites = [];
		/*** @type {Array.<Composite>} */
		this.movingComposites = []
	}

	/*** @param composite {Composite} */
	addComposite(composite) {
		this.composites.push(composite);
		if (composite.getMovementComponent() != null) this.movingComposites.push(composite);
	}

	/**
	 * @returns {Array.<Composite>}
	 */
	getMovingComposites() {
		return this.movingComposites;
	}

	addToScene(scene) {

		for (var c in this.composites) {
			var composite = this.composites[c];
			var viewComponent = composite.getViewComponent();
			if (viewComponent != null) {
				var view = viewComponent.getView();
				scene.add(view);
			}
		}
	}

	update() {
		for (var i = 0; i < this.composites.length; i++)
			this.composites[i].update();
	}
}
