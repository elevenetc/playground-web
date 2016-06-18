/**
 * Created by eleven on 18/06/2016.
 */
class Stack {
	constructor(size) {
		if (size === null || size === undefined || size <= 0) throw new Error('Invalid stack size:' + size);
		this.size = size;
		this.items = [];
	}

	get(index) {
		return this.items[index];
	}

	push(value) {
		if (this.size > 0) {
			if (this.items.length == this.size) {
				this.items.shift();
			}
		}

		this.items.push(value);

	}
}

module.exports = Stack;