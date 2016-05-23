/**
 * Created by eleven on 15/05/2016.
 */
class Component {

	constructor() {
		/*** @type {Composite} */
		this.composite = null;
	}

	update() {

	}

	setComposite(composite) {
		this.composite = composite;
	}

	/*** @returns {Composite} */
	getComposite() {
		return this.composite;
	}

	onComposeFinished() {
		
	}
}