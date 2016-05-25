/**
 * Created by eleven on 15/05/2016.
 */
class Compositor {
	constructor() {
		/**
		 * @type {Array.<Composite>}
		 */
		this.composits = [];
	}

	addComposite(composite) {
		this.composits.push(composite);
	}

	addToScene(scene) {

		for (var c in this.composits) {
			var composite = this.composits[c];
			var viewComponent = composite.getViewComponent();
			if (viewComponent != null) {
				var view = viewComponent.getView();
				scene.add(view);
			}
		}
	}

	update() {
		for (var i = 0; i < this.composits.length; i++)
			this.composits[i].update();
	}
}
