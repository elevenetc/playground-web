/**
 * Created by eleven on 03/06/2016.
 */
var ViewComponent = require('./ViewComponent');
var Modules = require('../Modules');

class MultiSquareView extends ViewComponent {

	constructor(color) {
		super();
		this.color = color;
	}

	onComposeFinished() {

		var dimen = super.getComposite().getDimenComponent();
		super.setView(Modules.getObjectCreator().matrix(
			dimen.getWidth(),
			dimen.getHeight(),
			this.color
		));
		super.onComposeFinished();
	}


	attachComposite() {
		var composite = this.getComposite();
		for(var i = 0; i < this.view.children.length; i++){
			this.view.children[i].composite = composite;
		}
	}
}

module.exports = MultiSquareView;