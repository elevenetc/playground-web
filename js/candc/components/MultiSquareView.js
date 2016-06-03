/**
 * Created by eleven on 03/06/2016.
 */
class MultiSquareView extends ViewComponent {

	constructor(color) {
		super();
		this.color = color;
	}
	
	onComposeFinished() {
		super.onComposeFinished();
		var dimen = super.getComposite().getDimenComponent();
		super.setView(CreateObj.matrix(
			dimen.getWidth(),
			dimen.getHeight(),
			this.color
		));
	}
}