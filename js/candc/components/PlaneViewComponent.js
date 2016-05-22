/**
 * Created by eleven on 15/05/2016.
 */
class PlaneViewComponent extends ViewComponent {

	constructor() {
		super();

		var view = CreateObj.plane(600, 600, new THREE.MeshBasicMaterial({
			color: 0x0000ff,
			wireframe: true
		}));


		super.setView(view);
	}
}
