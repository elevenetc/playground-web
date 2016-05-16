/**
 * Created by eleven on 15/05/2016.
 */
function Compositor() {
	"use strict";
	this.composits = [];
}

Compositor.prototype.addComposite = function (composite) {
	"use strict";
	this.composits.push(composite);
};

Compositor.prototype.addToScene = function (scene) {
	"use strict";
	for (var c in this.composits) {
		var composite = this.composits[c];
		var viewComponent = composite.getViewComponent();
		if (viewComponent != null) {
			var view = viewComponent.getView();
			scene.add(view);
		}
	}
};