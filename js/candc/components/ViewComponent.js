/**
 * Created by eleven on 15/05/2016.
 */
class ViewComponent extends Component {

	constructor() {
		super();
		this.view = null;
	}

	getView() {
		return this.view;
	}

	setView(view) {
		this.view = view;
	}

	updatePosition(positionComponent) {
		this.view.geometry.translate(
			positionComponent.x,
			positionComponent.y,
			positionComponent.z
		);
	}
}