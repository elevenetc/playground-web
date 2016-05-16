/**
 * Created by eleven on 15/05/2016.
 */
function BoxViewComponent() {
	"use strict";

	this.setView(CreateObj.box(200, 200, 200, new THREE.MeshBasicMaterial({
		color: 0xff0000,
		wireframe: true
	})));
}

BoxViewComponent.prototype = new ViewComponent();
BoxViewComponent.prototype.constructor = BoxViewComponent;
