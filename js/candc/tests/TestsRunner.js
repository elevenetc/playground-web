/**
 * Created by eleven on 11/06/2016.
 */
class TestsRunner {

	constructor() {

	}

	run() {
		var testRunnerFileName = this.constructor.name + '.js';
		var ignore = [testRunnerFileName, 'BaseTest.js'];

		TestsRunner.walkSync('./', function (path, obj) {
			var TestClass = require('./' + path);
			var test = new TestClass();
			var methodsAmount = 0;
			var methods = Object.getOwnPropertyNames(TestClass.prototype);

			console.log(path + ':');

			for (var index in methods) {
				if (methods[index].indexOf('test') == 0) {
					methodsAmount++;
					test['before']();
					test[methods[index]]();
					test['after']();
					console.log('  ' + methods[index] + ': ok');
				}
			}

			// test.run();
			if (methodsAmount == 0) {
				console.log('Not found test methods in ' + path);
			}

		}, ignore);
	}

	static walkSync(currentDirPath, callback, skip) {
		var fs = require('fs');
		var path = require('path');
		fs.readdirSync(currentDirPath).forEach(function (name) {
			var filePath = path.join(currentDirPath, name);
			var stat = fs.statSync(filePath);
			if (stat.isFile()) {

				if (skip !== null && skip !== undefined) {
					for (var i = 0; i < skip.length; i++) {
						if (skip[i] === filePath) return;
					}
				}

				callback(filePath, stat);
			} else if (stat.isDirectory()) {
				TestsRunner.walkSync(filePath, callback);
			}
		});
	}

	static create() {
		return new TestsRunner();
	}
}

module.exports = TestsRunner;

TestsRunner.create().run();