/**
 * Created by eleven on 15/05/2016.
 */
class PlaneViewComponent extends ViewComponent {

	constructor(xSize, ySize) {
		super();

		super.setView(CreateObj.matrix(3, 3));
	}
}
