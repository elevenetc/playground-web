/**
 * Created by eleven on 11/06/2016.
 */
class Animator {

	constructor(startParams) {
		this.startParams = startParams;
		this.endParams = null;
		this.updateHandler = null;
		this.completeHandler = null;
		this.time = 0;
	}

	to(endParams, time) {
		this.endParams = endParams;
		this.time = time;
		return this;
	}

	onUpdate(updateHandler) {
		this.updateHandler = updateHandler;
		return this;
	}

	onComplete(completeHandler) {
		this.completeHandler = completeHandler;
		return this;
	}

	start() {
		var ref = this;
		setTimeout(function () {
			ref.completeHandler();
		}, this.time);
	}

	static empty() {
		return new Animator({});
	}

	static tween() {

	}
}

module.exports = Animator;