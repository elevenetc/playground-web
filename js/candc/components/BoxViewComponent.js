/**
 * Created by eleven on 15/05/2016.
 */
class BoxViewComponent extends ViewComponent {

	constructor() {
		super();

		super.setView(CreateObj.box(200, 200, 200, new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true
		})));
	}
}
