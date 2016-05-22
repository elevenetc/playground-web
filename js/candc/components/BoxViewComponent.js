/**
 * Created by eleven on 15/05/2016.
 */
class BoxViewComponent extends ViewComponent {

	constructor() {
		super();

		var view = CreateObj.box(200, 200, 200, new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true
		}));
		
		
		super.setView(view);
	}
}
