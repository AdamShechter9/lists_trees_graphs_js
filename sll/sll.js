// Single linked list implementation in JavaScript.
// by Adam Shechter
// August, 2016

// SLnodeConstructor 
// properties:
// .value - value of node
// .next  - reference to next node
function SLnodeConstructor(value) {
	if (!(this instanceof SLnodeConstructor)) {
		return new SLnodeConstructor(value);
	}
	this.value = value || null;
	this.next = null;
}

// SLlistConstructor
// PROPERTIES:
// .head - reference to head of the list
// length - number of nodes in our list

// METHODS:
// length - returns length of the list.  if given argument, adjusts the length of the list by value.
// addBack - takes a value and adds a node to the back of the list  
// removeBack - removes a node from the back of the list and returns it  
// addFront - takes a value and adds a node to the front of the list  
// removeFront - removes a node from the front of the list and returns it  
// contains - returns true if value is found in the list  
// nodeAtIndex - returns reference to node at given index
// valueAtIndex - takes an index value and returns the value at the node  
// removeAtIndex - removes a value at given index number and returns value  
// insertAtIndex - takes a value and inserts a node at given index in the list  
// max - if list contains numbers, returns the maximum number in the list 
// min - if list contains numbers, returns the minimum number in the list 
// avg - if list contains numbers, returns the average of numbers in the list 
// printList - returns a string with all the elements in the list  
// reverse - reverses the list 
// shiftBy - shifts the list right if positive values, and left if negative values 


function SLlistConstructor() {
	if (!(this instanceof SLlistConstructor)) {
		return new SLlistConstructor();
	}
	// properties
	this.head = null;
	var length = 0;

	// local methods
	this.length = function (lengthChangeIn) {
		var lengthChange = lengthChangeIn || 0;
		// console.log("length is ", length);
		// console.log("lengthChange is ", lengthChange);
		length = length + lengthChange;
		// console.log("post length is ", length);
		return length;
	}
}
// Prototype Functions
SLlistConstructor.prototype.addBack = function (value) {
	// add node to the back of the list.
	var newNode = new SLnodeConstructor(value);
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
	this.length(1);
	return this;
};
SLlistConstructor.prototype.removeBack = function () {
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
	} else {
		// list contains multiple nodes.  remove last node and return value.
		// get to 2nd to last element.
		while (runner.next.next) {
			runner = runner.next;
		}
		value = runner.next.value;
		runner.next = null;
	}
	this.length(-1);
	return value;
};
SLlistConstructor.prototype.addFront = function (value) {
	// add node to the front of the list.
	var newNode = new SLnodeConstructor(value);
	newNode.next = this.head;
	this.head = newNode;
	this.length(1);
	return this;
};
SLlistConstructor.prototype.removeFront = function () {
	// removes a node from the front of the list.  returns the value.
	var value;
	if (!this.head) {
		return null;
	}
	value = this.head.value;
	this.head = this.head.next;
	this.length(-1);
	return value;
};
SLlistConstructor.prototype.contains = function (value) {
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
};
SLlistConstructor.prototype.nodeAtIndex = function (indexIn) {
	// default to 0 if no index argument
	var index = indexIn || 0;
	var runner = this.head;
	var length = this.length();
	var i = 0;
	if ((!this.head) || (index >= length)) {
		return null;
	}
	while (i < indexIn) {
		runner = runner.next;
		i += 1;
	}
	return runner;
};
SLlistConstructor.prototype.valueAtIndex = function (indexIn) {
	// default to 0 if no index argument
	var index = indexIn || 0;
	var runner;
	var length = this.length();
	if ((!this.head) || (index >= length)) {
		return null;
	}
	runner = this.nodeAtIndex(index);
	return runner.value;
};
SLlistConstructor.prototype.removeAtIndex = function (indexIn) {
	var index = indexIn || 0;
	var value;
	var runner;
	var length = this.length();
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
	runner = this.nodeAtIndex(index - 1);
	value = runner.next.value;
	runner.next = runner.next.next;
	this.length(-1);
	return value;
};

SLlistConstructor.prototype.insertAtIndex = function (indexIn, value) {
	var index = indexIn || 0;
	var runner;
	var newNode;
	var length = this.length();

	if ((!this.head) || (index >= length)) {
		return null;
	} 
	if (index == 0) {
		// adds front node
		return this.addFront(value);
	} else if (index == (length - 1)) {
		// adds node as element in the list
		return this.addBack();
	}
	runner = this.nodeAtIndex(index - 1);
	newNode = new SLnodeConstructor(value);
	newNode.next = runner.next;
	runner.next = newNode;
	this.length(1);
	return this;	
};
SLlistConstructor.prototype.max = function () {
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
};
SLlistConstructor.prototype.min = function () {
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
};
SLlistConstructor.prototype.avg = function () {
	var sum, avg;
	var runner = this.head;
	var length = this.length();
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
};
SLlistConstructor.prototype.reverse = function () {
	// two ways to go about this.
	// first is to start reversing the pointers starting for the last node to the first.
	// this takes O(N) times.  
	// This uses pointers alone.
	// second is to swap the values from first to last, then second to second last, and so on.
	// this takes O(N/2) times.  
	// This uses length to determine how far down to go and swap values.
	var runner = this.head, runner2;
	var length = this.length();
	var i = 0;
	var swapVal;
	if (!this.head) {
		return null;
	}
	else if (!this.head.next) {
		return this;
	}
	while (i < Math.floor((length - 1) / 2)) {
		runner2 = runner;
		for (var index = i; index < (length - 1 - i); index += 1) {
			runner2 = runner2.next;
		}
		swapVal = runner.value;
		runner.value = runner2.value;
		runner2.value = swapVal;
		i += 1;
		runner = runner.next;
	}
	return this;
};
SLlistConstructor.prototype.shiftBy = function (shiftAmount) {
	// Two ways to go about this
	// first is to run a pointer to end of the list. Set the 2nd to last pointer next to null.
	// then, attach the original last pointer.next to the head of the list, and readjust head.
	// This takes O(N) times.
	// second is to copy values from one to the next all the way to the end, 
	// and then put the last value in the first node.
	// This takes O(N) times.
	var runner;

	if (!this.head) {
		return null;
	}
	else if (!this.head.next) {
		return this;
	}
	for (var i = 0; i < Math.abs(shiftAmount); i += 1) {
		runner = this.head;
		if (shiftAmount > 0) {
			while (runner.next.next) {
				runner = runner.next;
			}
			runner.next.next = this.head;
			this.head = runner.next;
			runner.next = null;
		} else {
			while (runner.next) {
				runner = runner.next;
			}
			runner.next = this.head;
			this.head = this.head.next;
			runner.next.next = null;
		}	
	}
	return this;
};
SLlistConstructor.prototype.printList = function () {
	var runner = this.head;
	var index = 0;
	console.log("start: ");
	while (runner) {
		console.log(index, runner.value);
		runner = runner.next;
		index += 1;
	}
	console.log("end: ");
	console.log("head", this.head.value);
	return this;
};
// Main Body - testing
var myList = new SLlistConstructor();
myList.addFront(10).addFront(20).addFront(30).addFront(40);
myList.printList();
myList.addBack(100).addBack(1000).addBack(5000);
myList.printList();
myList.insertAtIndex(4, 333).insertAtIndex(4, 3333).printList();
console.log("reversing list");
myList.reverse().printList();
console.log("shifting list right 3");
myList.shiftBy(3).printList();
console.log("shifting list left 2");
myList.shiftBy(-2).printList();
console.log("my list contains 333:", myList.contains(333));
console.log(myList.removeFront());
console.log(myList.removeBack());
myList.printList();
console.log(myList.removeAtIndex(3));
myList.printList();
console.log("min",myList.min());
console.log("max",myList.max());
console.log("avg",myList.avg());
console.log("value at at index 1", myList.valueAtIndex(1));