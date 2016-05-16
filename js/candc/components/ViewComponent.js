/**
 * Created by eleven on 15/05/2016.
 */
function ViewComponent() {
	"use strict";
	this.view = null;
	console.log("vieComponentCreated: view==null");
}

ViewComponent.prototype = new Component();
ViewComponent.prototype.constructor = ViewComponent;

ViewComponent.prototype.getView = function () {
	console.log(this.toString() + ":getView:" + this.view);
	return this.view;
};

ViewComponent.prototype.setView = function (view) {
	"use strict";
	this.view = view;
	console.log(this.toString() + ":setView:" + this.view);
};

ViewComponent.prototype.toString = function () {
	"use strict";
	return "xx22";
};