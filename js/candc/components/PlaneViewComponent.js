/**
 * Created by eleven on 15/05/2016.
 */
class PlaneViewComponent extends ViewComponent {

	constructor(xSize, ySize) {
		super();

		var view = CreateObj.plane(xSize, ySize, new THREE.MeshBasicMaterial({
			color: 0x0000ff,
			wireframe: true
		}));


		super.setView(view);
	}
}
