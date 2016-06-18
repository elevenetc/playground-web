/**
 * Created by eleven on 18/06/2016.
 */

var should = require('chai').should();
var Stack = require('../utils/Stack');
var BaseTest = require('./BaseTest');

class UtilsTest extends BaseTest {

	constructor() {
		super();
	}

	testStack() {
		var stack = new Stack(3);
		stack.push('a');
		stack.push('b');
		stack.push('c');
		stack.push('d');
		stack.get(0).should.equal('b');
		stack.get(1).should.equal('c');
		stack.get(2).should.equal('d');
	}
}

module.exports = UtilsTest;