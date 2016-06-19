/**
 * Created by eleven on 15/05/2016.
 */
var Component = require('./Component');
var CConfig = require('../CConfig');

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

	setX(x) {
		this.view.position.x = x;
	}

	setY(y) {
		this.view.position.y = y;
	}

	updatePosition(positionComponent) {
		this.view.position.x = positionComponent.x * CConfig.Unit;
		this.view.position.y = positionComponent.y * CConfig.Unit;
	}


	onComposeFinished() {
		super.onComposeFinished();
		this.view.composite = this.getComposite();
	}
}

module.exports = ViewComponent;