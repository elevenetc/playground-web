/**
 * Created by eleven on 15/05/2016.
 */
class Compositor {
	constructor() {
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
}
