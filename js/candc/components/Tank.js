/**
 * Created by eleven on 15/05/2016.
 */
function Tank() {
	"use strict";
	this.addComponent(new BoxViewComponent());
}

Tank.prototype = new Composite();
Tank.prototype.constructor = Tank;