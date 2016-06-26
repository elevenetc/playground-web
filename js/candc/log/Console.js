/**
 * Created by eleven on 25/06/2016.
 */
var WeightComponent = require('../components/WeightComponent');

class con {

	static logError(e) {
		if (con.logMode >= con.LogModeError)
			console.log(e);
	}

	static log(id, message) {

		if (con.LogMode >= con.LogModeMessages) {
			var idValue;

			if (id.hasOwnProperty('getId')) idValue = id.getId();
			else idValue = id;

			con.internalLog(idValue, message);
		}
	}

	static internalLog(id, message) {
		console.log(id + ': ' + message);
	}
}

con.LogMode = undefined;
con.LogModeAll = 10;
con.LogModeError = 5;
con.LogModeMessages = 2.5;
con.LogModeNone = 0;

module.exports = con;