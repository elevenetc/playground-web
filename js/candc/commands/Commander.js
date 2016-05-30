/**
 * Created by eleven on 30/05/2016.
 */
class Commander extends Component {
	constructor() {
		super();
		/*** @type {Command} */
		this.activeCommand = null;
	}

	/**
	 * @param command {Command}
	 */
	setCommand(command) {
		this.activeCommand = command;
		this.activeCommand.start();
	}
}