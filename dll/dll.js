// Double linked list implementation in JavaScript.
// by Adam Shechter
// August, 2016

// DLnodeConstructor 
// properties:
// .value - value of node
// .next  - reference to next node
// .prev  - reference to previous node
function DLnodeConstructor(value) {
	if (!(this instanceof DLnodeConstructor)) {
		return new DLnodeConstructor(value);
	}
	this.value = value || null;
	this.prev = null;
	this.next = null;
}

// listConstructor
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


function DLlistConstructor() {
	if (!(this instanceof DLlistConstructor)) {
		return new DLlistConstructor();
	}
	// properties
	this.head = null;
	this.tail = null;
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
DLlistConstructor.prototype.addBack = function (value) {
	// add node to the back of the list.
	var newNode = new DLnodeConstructor(value);
	// empty list
	if (!this.tail) {
		this.head = newNode;
		this.tail = newNode;
	} else {
		newNode.prev = this.tail;
		this.tail.next = newNode;
		this.tail = newNode;
	}
	this.length(1);
	return this;
}
DLlistConstructor.prototype.removeBack = function () {
	// remove node from back of the list. returns value;
	var value, tempRef;

	if (!this.tail) {
		// empty list
		return null;
	} 
	if (!this.tail.prev) {
		// list contains only 1 node.  alternatively, you could check if length is 1.
		value = this.tail.value;
		this.head = null;
		this.tail = null;
	} else {
		// list contains multiple nodes.  remove last node and return value.
		value = this.tail.value;
		tempRef = this.tail;
		this.tail = this.tail.prev;
		this.tail.next = null;
		tempRef.prev = null;
	}
	this.length(-1);
	return value;
}
DLlistConstructor.prototype.addFront = function (value) {
	// add node to the front of the list.
	var newNode = new DLnodeConstructor(value);
	if (!this.head) {
		this.head = newNode;
		this.tail = newNode;
	} else {
		newNode.next = this.head;
		this.head.prev = newNode;
		this.head = newNode;
	}
	this.length(1);
	return this;
}
DLlistConstructor.prototype.removeFront = function () {
	// removes a node from the front of the list.  returns the value.
	var value, tempRef;
	if (!this.head) {
		return null;
	}
	if (!this.head.next) {
		// list contains only 1 node.  alternatively, you could check if length is 1.
		value = this.head.value;
		this.head = null;
		this.tail = null;
	} else {
		// list contains multiple nodes.  remove last node and return value.
		value = this.head.value;
		tempRef = this.head;
		this.head = this.head.next;
		this.head.prev = null;
		tempRef.next = null;
	}
	this.length(-1);
	return value;
}
DLlistConstructor.prototype.contains = function (value) {
	// search for value in list.  if found, return true. else, return false;
	// utilizes two runners, so search time is O(N/2),
	var runner = this.head;
	var runner2 = this.tail;
	if (!runner) {
		// empty list
		return null;
	}
	while ((runner != runner2) || (runner.prev != runner2)){
		if ((runner.value == value) || (runner2.value == value)) {
			return true;
		}
		runner = runner.next;
		runner2 = runner2.prev;
	}
	return false;
}
DLlistConstructor.prototype.nodeAtIndex = function (indexIn) {
	// default to 0 if no index argument
	// if index is greater than half, uses tail to move backwards.
	var index = indexIn || 0;
	var length = this.length();
	var runner, i;
	if ((!this.head) || (index >= length)) {
		return null;
	}
	if (index < Math.floor((length - 1) / 2)) {
		runner = this.head;
		i = 0;
		while (i < indexIn) {
			runner = runner.next;
			i += 1;
		}
	} else {
		runner = this.tail;
		i = length - 1;
		while (i > indexIn) {
			runner = runner.prev;
			i -= 1;
		}
	}
	return runner;
}
DLlistConstructor.prototype.valueAtIndex = function (indexIn) {
	// default to 0 if no index argument
	// if index is greater than half, uses tail to move backwards.
	var index = indexIn || 0;
	var length = this.length();
	var runner;
	if ((!this.head) || (index >= length)) {
		return null;
	}
	runner = this.nodeAtIndex(index);
	return runner.value;
}
DLlistConstructor.prototype.removeAtIndex = function (indexIn) {
	// default to 0 if no index argument
	// if index is greater than half, uses tail to move backwards.
	var index = indexIn || 0;
	var value, tempRef;
	var runner, i;
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
	runner = this.nodeAtIndex(index);
	value = runner.value;
	tempRef = runner.prev;
	tempRef.next = runner.next;
	runner.next.prev = tempRef;
	runner.next = null;
	runner.prev = null;
	this.length(-1);
	return value;
}

DLlistConstructor.prototype.insertAtIndex = function (indexIn, value) {
	// default to 0 if no index argument
	// if index is greater than half, uses tail to move backwards.
	var index = indexIn || 0;
	var runner, i;
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
	runner = this.nodeAtIndex(index);
	newNode = new DLnodeConstructor(value);
	newNode.next = runner;
	newNode.prev = runner.prev;
	runner.prev.next = newNode;
	runner.prev = newNode;
	this.length(1);
	return this;	
}
DLlistConstructor.prototype.max = function () {
	var max;
	var runner = this.head, runner2 = this.tail;
	// if not number, return null
	if (typeof(this.head.value) != "number") {
		return null;
	}
	if (!this.head) {
		// empty list
		return null;
	} else if (!this.head.next) {
		// 1 node in the list
		return this.head.value;
	}
	max = runner.value;
	while ((runner != runner2) && (runner.prev != runner2)) {
		max = runner.value > max ? runner.value : max;
		max = runner2.value > max ? runner2.value : max;
		runner = runner.next;
		runner2 = runner2.prev;
	}
	max = runner.value > max ? runner.value : max;
	return max;
}
DLlistConstructor.prototype.min = function () {
	var min;
	var runner = this.head, runner2 = this.tail;
	// if not number, return null
	if (typeof(this.head.value) != "number") {
		return null;
	}
	if (!this.head) {
		// empty list
		return null;
	} else if (!this.head.next) {
		// 1 node in the list
		return this.head.value;
	}
	min = runner.value;
	while ((runner != runner2) && (runner.prev != runner2)) {
		min = runner.value < min ? runner.value : min;
		min = runner2.value < min ? runner2.value : min;
		runner = runner.next;
		runner2 = runner2.prev;
	}
	min = runner.value < min ? runner.value : min;
	return min;
}
DLlistConstructor.prototype.avg = function () {
	var sum, avg;
	var runner = this.head, runner2 = this.tail;
	var length = this.length();
	// if not number, return null
	if (typeof(this.head.value) != "number") {
		return null;
	}
	if (!this.head) {
		// empty list
		return null;
	} else if (!this.head.next) {
		// 1 node in the list
		return this.head.value;
	}
	sum = 0;
	while ((runner != runner2) && (runner.prev != runner2))  {
		sum += runner.value;
		sum += runner2.value;
		runner = runner.next;
		runner2 = runner2.prev; 
	}
	if (runner == runner2) {
		sum += runner.value;
	}
	avg = sum / length;
	return avg;
}
DLlistConstructor.prototype.reverse = function () {
	// two ways to go about this.
	// first is to start reversing the pointers starting for the last node to the first.
	// this takes O(N) times.  
	// This uses pointers alone.
	// second is to swap the values from first to last, then second to second last, and so on.
	// this takes O(N/2) times.  
	// This uses length to determine how far down to go and swap values.
	var runner = this.head, runner2 = this.tail;
	var length = this.length();
	var i = 0;
	var swapVal;
	if (!this.head) {
		return null;
	}
	else if (!this.head.next) {
		return this;
	}
	while ((runner != runner2) && (runner.prev != runner2)) {
		swapVal = runner.value;
		runner.value = runner2.value;
		runner2.value = swapVal;
		runner = runner.next;
		runner2 = runner2.prev;
	}
	return this;
}
DLlistConstructor.prototype.shiftBy = function (shiftAmount) {
	var runner;

	if (!this.head) {
		return null;
	}
	else if (!this.head.next) {
		return this;
	}
	for (var i = 0; i < Math.abs(shiftAmount); i += 1) {
		this.tail.next = this.head;
		this.head.prev = this.tail;
		if (shiftAmount > 0) {
			this.tail = this.tail.prev;
			this.tail.next = null;
			this.head = this.head.prev;
			this.head.prev = null;
		} else {
			this.head = this.head.next;
			this.head.prev = null;
			this.tail = this.tail.next;
			this.tail.next = null;
		}	
	}
	return this;
}
DLlistConstructor.prototype.printList = function () {
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
	console.log("tail", this.tail.value);
	return this;
}

// Main Program
var myList = new DLlistConstructor();
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
console.log("remove front", myList.removeFront());
console.log("remove back", myList.removeBack());
myList.printList();
console.log(myList.removeAtIndex(3));
myList.printList();
console.log("min",myList.min());
console.log("max",myList.max());
console.log("avg",myList.avg());
console.log("value at at index 1", myList.valueAtIndex(1));