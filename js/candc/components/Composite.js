/**
 * Created by eleven on 15/05/2016.
 */
function Composite() {
	"use strict";

	this.components = [];
	this.viewComponent = null;
}

Composite.prototype.update = function () {
	"use strict";

};

Composite.prototype.addComponent = function (component) {
	"use strict";

	if (component instanceof ViewComponent) {
		this.viewComponent = component;
	}

	this.components.push(component);
};

Composite.prototype.getViewComponent = function () {
	"use strict";
	return this.viewComponent;
};