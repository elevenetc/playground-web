/**
 * Created by eugene.levenetc on 14/09/16.
 */
function init(canvasId) {
	const canvas = document.getElementById(canvasId);
	const context = canvas.getContext('2d');

	window.requestAnimationFrame(draw);

	function draw() {
		context.clearRect(0, 0, 500, 500);
		window.requestAnimationFrame(draw);
	}
}