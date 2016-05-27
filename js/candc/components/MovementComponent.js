/**
 * Created by eleven on 23/05/2016.
 */
class MovementComponent extends Component {

	constructor() {
		super();
		/** @type {Array} */
		this.path = [];
	}

	/** @returns {Array} */
	getPath() {
		return this.path;
	}
}