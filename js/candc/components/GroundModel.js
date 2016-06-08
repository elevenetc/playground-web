/**
 * Created by eleven on 24/05/2016.
 */

var PF = require('../../../bower_components/pathfinding/pathfinding-browser');
var Composite = require('./Composite');

class GroundModel extends Composite {

	constructor(matrix = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]) {
		super();

		this.matrix = matrix;
		this.occupants = this.matrix.slice();
		this.entitiesMap = {};
		this.clearListeners = {};
		this.logAvaialability = false;
		this.width = this.matrix.length;
		this.height = this.matrix[0].length;
		this.grid = new PF.Grid(this.matrix);
	}

	findPath(fromX, fromY, toX, toY) {
		this.validatePathParams(fromX, fromY, toX, toY);
		var result = new PF.AStarFinder().findPath(fromY, fromX, toY, toX, new PF.Grid(this.matrix));
		if (result.length > 0 && result[0][1] == fromY && result[0][0] == fromX)//cut first same point
			result.splice(0, 1);
		return result;
	}

	updateMatrix(path) {
		for (var i = 0; i < path.length; i++) {
			var occupied = path[i];
			this.matrix[occupied[1]][occupied[0]] = GroundModel.PATH;
		}
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}

	getType(x, y) {

		//check map boundaries
		if (x < 0 || y < 0 || x > this.matrix.length - 1 || y > this.matrix[0].length - 1)
			return GroundModel.OBS;

		return this.matrix[x][y];
	}

	isAvailable(x, y) {
		var result = this.getType(x, y) == GroundModel.CLEAR;
		if (this.logAvaialability)
			console.log(x + ':' + y + ' - ' + (result ? 'available' : 'not available'));
		return result;
	}

	/**
	 * @param x
	 * @param y
	 * @returns {Composite}
	 */
	getOccupant(x, y) {
		if (x < 0 || y < 0 || x > this.matrix.length - 1 || y > this.matrix[0].length - 1)
			return null;
		return this.occupants[x][y];
	}

	/**
	 * @param entity {Composite}
	 * @param x {int}
	 * @param y {int}
	 */
	occupy(entity, x, y) {
		this.occupants[x][y] = entity;
		this.matrix[x][y] = GroundModel.UNIT;
	}

	/**
	 * @param entity {Composite}
	 * @param x {int}
	 * @param y {int}
	 */
	clear(entity, x, y) {
		this.occupants[x][y] = entity;
		this.matrix[x][y] = GroundModel.CLEAR;

		for (var waiterId in this.clearListeners) {
			if (this.clearListeners.hasOwnProperty(waiterId)) {
				if (this.clearListeners[waiterId][0] == x && this.clearListeners[waiterId][1] == y) {
					if (this.entitiesMap.hasOwnProperty(waiterId)) {
						/*** @type {Composite} */
						var entity = this.entitiesMap[waiterId];
						delete this.clearListeners[waiterId];
						entity.getMovementComponent().releaseStop();
						break;
					}
				}
			}

		}
	}

	/**
	 * @param entity {Composite}
	 * @param x {int}
	 * @param y {int}
	 */
	waitFor(entity, x, y) {
		this.entitiesMap[entity.getId()] = entity;
		this.clearListeners[entity.getId()] = [x, y];
	}

	validatePathParams(fromX, fromY, toX, toY) {

		var w = this.matrix.length;
		var h = this.matrix[0].length;
		if (fromX > w || toX > w || fromY > h || toY > h)
			throw new Error('Out of map: ' + fromX + ':' + fromY + ':' + toX + ':' + toY);

		if (fromX === undefined || fromY === undefined || toX === undefined || toY === undefined)
			throw new Error('Undefined param: ' + fromX + ':' + fromY + ':' + toX + ':' + toY);

		var fromXInt = fromX | 0;
		var fromYInt = fromY | 0;
		var toXInt = toX | 0;
		var toYInt = toY | 0;

		if (fromX - fromXInt > 0) throw new Error('Invalid fromX: ' + fromX);
		if (fromY - fromYInt > 0) throw new Error('Invalid fromY: ' + fromY);
		if (toX - toXInt > 0) throw new Error('Invalid toX: ' + toX);
		if (toY - toYInt > 0) throw new Error('Invalid toY: ' + toY);

	}
}

GroundModel.CLEAR = 0;
GroundModel.UNIT = 1;
GroundModel.OBS = 2;
GroundModel.PATH = 3;

module.exports = GroundModel;