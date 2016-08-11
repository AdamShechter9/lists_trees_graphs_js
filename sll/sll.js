// single linked list implementation in JavaScript.
// by Adam Shechter
// August, 2016

// NodeConstructor 
// properties:
// .value - value of node
// .next  - reference to next node
function nodeConstructor(value) {
	this.value = value || null;
	this.next = null;
}

// listConstructor
// PROPERTIES:
// .head - reference to head of the list
// length - number of nodes in our list

// METHODS:
// length - returns length of the list  √
// addBack - takes a value and adds a node to the back of the list  √
// removeBack - removes a node from the back of the list and returns it  √
// addFront - takes a value and adds a node to the front of the list  √
// removeFront - removes a node from the front of the list and returns it  √
// contains - returns true if value is found in the list  √
// valueAtIndex - takes an index value and returns the value at the node  √
// removeAtIndex - removes a value at given index number and returns value  √
// insertAtIndex - takes a value and inserts a node at given index in the list  √
// max - if list contains numbers, returns the maximum number in the list √
// min - if list contains numbers, returns the minimum number in the list √
// avg - if list contains numbers, returns the average of numbers in the list √
// printList - returns a string with all the elements in the list  √


function listConstructor() {
	// properties
	this.head = null;
	var length = 0;

	// methods
	this.length = function () {
		return length;
	}

	this.addBack = function (value) {
		// add node to the back of the list.
		var newNode = new nodeConstructor(value);
		var runner = this.head;
		// empty list
		if (!runner) {
			this.head = newNode;
		} else {
			// get to the end of the list
			while (runner.next) {
				runner = runner.next;
			}
			runner.next = newNode;			
		}
		length += 1;
		return this;
	}

	this.removeBack = function () {
		// remove node from back of the list. returns value;
		var runner = this.head;
		var value;

		if (!runner) {
			// empty list
			return null;
		} 
		if (!this.head.next) {
			// list contains only 1 node.  alternatively, you could check if length is 1.
			value = runner.value;
			this.head = null;
			length = 0;
			return value;
		} else {
			// list contains multiple nodes.  remove last node and return value.
			// get to 2nd to last element.
			while (runner.next.next) {
				runner = runner.next;
			}
			value = runner.next.value;
			runner.next = null;
			length -= 1;
			return value;
		}
	}

	this.addFront = function (value) {
		// add node to the front of the list.
		var newNode = new nodeConstructor(value);
		newNode.next = this.head;
		this.head = newNode;
		length += 1;
		return this;
	}

	this.removeFront = function () {
		// removes a node from the front of the list.  returns the value.
		var value;
		if (!this.head) {
			return null;
		}
		value = this.head.value;
		this.head = this.head.next;
		length -= 1;
		return value;
	}

	this.contains = function (value) {
		// search for value in list.  if found, return true. else, return false;
		var runner = this.head;
		if (!runner) {
			// empty list
			return null;
		}
		while (runner) {
			if (runner.value == value) {
				return true;
			}
			runner = runner.next;
		}
		return false;
	}

	this.valueAtIndex = function (indexIn) {
		var index = indexIn || 0;
		var runner = this.head;
		var i = 0;
		if ((!this.head) || (index >= length)) {
			return null;
		}
		while (i < indexIn) {
			runner = runner.next;
			i += 1;
		}
		return runner.value;
	}

	this.removeAtIndex = function (indexIn) {
		var index = indexIn || 0;
		var value;
		var runner = this.head;
		var i = 0;
		if ((!this.head) || (index >= length)) {
			return null;
		} 
		if (index == 0) {
			// remove front node
			return this.removeFront();
		} else if (index == (length - 1)) {
			// remove last element in the list
			return this.removeBack();
		}
		while (i < (index - 1)) {
			runner = runner.next;
			i += 1;
		}
		value = runner.next.value;
		runner.next = runner.next.next;
		return value;
	}

	this.insertAtIndex = function (indexIn, value) {
		var index = indexIn || 0;
		var runner = this.head;
		var newNode;
		var i = 0;

		if ((!this.head) || (index >= length)) {
			return null;
		} 
		if (index == 0) {
			// adds front node
			return this.addFront(value);
		} else if (index == (length - 1)) {
			// adds node as element in the list
			return this.removeBack();
		}
		while (i < (index - 1)) {
			runner = runner.next;
			i += 1;
		}
		newNode = new nodeConstructor(value);
		newNode.next = runner.next;
		runner.next = newNode;
		return this;	
	}

	this.max = function () {
		var max;
		var runner = this.head;
		// if not number, return null
		if (typeof(this.head.value) != "number") {
			return null;
		}
		max = runner.value;
		while (runner) {
			max = runner.value > max ? runner.value : max;
			runner = runner.next;
		}
		return max;
	}

	this.min = function () {
		var min;
		var runner = this.head;
		// if not number, return null
		if (typeof(this.head.value) != "number") {
			return null;
		}
		min = runner.value;
		while (runner) {
			min = runner.value < min ? runner.value : min;
			runner = runner.next;
		}
		return min;
	}

	this.avg = function () {
		var sum, avg;
		var runner = this.head;
		// if not number, return null
		if (typeof(this.head.value) != "number") {
			return null;
		}
		sum = 0;
		while (runner) {
			sum += runner.value;
			runner = runner.next; 
		}
		avg = sum / length;
		return avg;

	}

	this.printList = function () {
		console.log("start: ");
		var runner = this.head;
		var index = 0;
		while (runner) {
			console.log(index, runner.value);
			runner = runner.next;
			index += 1;
		}
		console.log("end: ");
		return this;
	}
}




// Main Program
var myList = new listConstructor();
myList.addFront(10).addFront(20).addFront(30).addFront(40);
myList.printList();
myList.addBack(100).addBack(1000).addBack(5000);
myList.printList();
myList.insertAtIndex(4, 333).insertAtIndex(4, 3333).printList();
console.log("my list contains 333:", myList.contains(333));
console.log(myList.removeFront());
console.log(myList.removeBack());
myList.printList();
console.log(myList.removeAtIndex(3));
myList.printList();
console.log("min",myList.min());
console.log("max",myList.max());
console.log("avg",myList.avg());