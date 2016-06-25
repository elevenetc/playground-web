/**
 * Created by eleven on 25/06/2016.
 */
var WeightComponent = require('../components/WeightComponent');

class con {
	static log(id, message) {

		var idValue;

		if (id.hasOwnProperty('getId')) idValue = id.getId();
		else idValue = id;

		con.internalLog(idValue, message);
	}

	static internalLog(id, message) {
		console.log(id + ': ' + message);
	}
}

module.exports = con;