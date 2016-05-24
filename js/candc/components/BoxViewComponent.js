/**
 * Created by eleven on 15/05/2016.
 */
class BoxViewComponent extends ViewComponent {

	constructor(xSize = CConfig.Unit, ySize = CConfig.Unit) {
		super();

		var view = CreateObj.box(xSize, ySize, CConfig.Unit,
			new THREE.MeshBasicMaterial({
				color: 0x00ff00,
				wireframe: true
			})
		);

		super.setView(view);
	}
}
