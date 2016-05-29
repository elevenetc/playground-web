/**
 * Created by eleven on 28/05/2016.
 */
class ConflictResolver {
	constructor() {
		/** @type {Array} */
		this.zzz = {};//id of not stopped: array of stopped
		this.entitiesMap = {};//id: composite
		this.conflictMap = {};
		this.conflictCounterMap = {};
	}

	/**
	 * @param entityHasConflict {Composite}
	 * @param entityWith {Composite}
	 * @param atX {int}
	 * @param atY {int}
	 */
	pushConflict(entityHasConflict, entityWith, atX, atY) {

		this.entitiesMap[entityHasConflict.getId()] = entityHasConflict;
		this.entitiesMap[entityWith.getId()] = entityWith;

		if (!this.zzz.hasOwnProperty(entityWith.getId())) {
			this.zzz[entityWith.getId()] = [];
		}

		/*** @type {Array} */
		var array = this.zzz[entityWith.getId()];
		if (array.indexOf(entityHasConflict.getId()) == -1) {
			array.push(entityHasConflict.getId());
		}

		this.conflictMap[entityHasConflict.getId()] = entityWith;
		this.updateConflictCounter(entityHasConflict, entityWith);
		console.log('conflict ' + entityHasConflict.getId() + ' with ' + entityWith.getId() + ' at ' + atX + ':' + atY);
	}

	updateConflictCounter(entityA, entityB) {
		var key = entityA.getId() + ':' + entityB.getId();
		var count = this.conflictCounterMap[key];
		if (count == undefined) {
			this.conflictCounterMap[key] = 0;
		} else {
			count++;
			this.conflictCounterMap[key] = count;
		}

	}

	/**
	 * @param entityHasNoConflict {Composite}
	 */
	resolveConflict(entityHasNoConflict) {
		var id = entityHasNoConflict.getId();

		if (this.zzz.hasOwnProperty(id)) {
			/*** @type {Array.<String>} */
			var arrayOfStoppedIds = this.zzz[id];
			var stoppedByAnother = true;

			for (var i = 0; i < arrayOfStoppedIds.length; i++) {
				var stoppedId = arrayOfStoppedIds[i];
				stoppedByAnother = this.isOtherBlocks(stoppedId, id);

				if (!stoppedByAnother) {//release
					/*** @type {Composite} */
					var entity = this.entitiesMap[stoppedId];
					entity.getMovementComponent().releaseStop();
				}
			}

			arrayOfStoppedIds.length = 0;
		}

	}

	/**
	 * @param stoppedId {string}
	 * @param hasNoConflict {string}
	 * @returns {boolean}
	 */
	isOtherBlocks(stoppedId, hasNoConflict) {
		for (var blockerId in this.zzz) {
			if (blockerId === hasNoConflict) continue;
			/*** @type {Array.<String>} */
			var blockedEntitiesIds = this.zzz[blockerId];
			for (var i = 0; i < blockedEntitiesIds.length; i++) {
				if (blockedEntitiesIds[i] === stoppedId) {
					console.log('still blocked by ' + blockerId);
					return true;
				}
			}
		}
		console.log('released by all');
		return false;
	}
}