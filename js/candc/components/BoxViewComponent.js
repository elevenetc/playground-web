/**
 * Created by eleven on 15/05/2016.
 */
class BoxViewComponent extends ViewComponent {

	constructor(xSize = CConfig.Unit, ySize = CConfig.Unit, color = 0x00ff00) {
		super();

		color = '#' + Math.floor(Math.random() * 16777215).toString(16);

		var view = CreateObj.box(xSize, ySize, CConfig.Unit,
			new THREE.MeshBasicMaterial({
				color: color,
				wireframe: false
			})
		);

		super.setView(view);
	}
}
