/**
 * Created by eleven on 15/05/2016.
 */
function SampleCompositor() {
	"use strict";
	this.addComposite(new Tank());
}

SampleCompositor.prototype = new Compositor();
SampleCompositor.prototype.constructor = SampleCompositor;