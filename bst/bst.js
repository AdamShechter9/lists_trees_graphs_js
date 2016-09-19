// Binary Search Tree implementation in JavaScript.
// by Adam Shechter
// August, 2016

// BTNodeConstructor
// properties:
// .value - value of node
// .left  - reference to child node left
// .right  - reference to child node right
function BTnodeConstructor(value) {
	if (!(this instanceof BTnodeConstructor)) {
		return new BTnodeConstructor(value);
	}
	this.value = value || null;
	this.left = null;
	this.right = null;
}

// BSTConstructor
// PROPERTIES:
// .root - reference to root of the tree

// METHODS: 


function BSTConstructor() {
	if (!(this instanceof BSTConstructor)) {
		return new BSTConstructor();
	}
	// properties
	this.root = null;

}
// BST Prototype methods
BSTConstructor.prototype.isEmpty = function () {
	return (this.root == null);
};
BSTConstructor.prototype.add = function (value) {
	// adding nodes to a Binary Search tree.
	var newValue = value || null;
	var newLeafNode = new BTnodeConstructor(value);
	var runner;
	var foundLeafLocation = false;

	if (!this.root) {
		// BST is empty
		this.root = newLeafNode;
		return this;
	}
	if (!newValue) {
		console.log("error, no value given.");
		return null;
	}
	runner = this.root;
	while (!foundLeafLocation) {
		if (value < runner.value) {
			// value is less than current node
			if (runner.left) {
				// left node exists. move into the left node
				runner = runner.left;
			} else {
				// left node doesn't exist.  insert new node into left node and exit.
				runner.left = newLeafNode;
				foundLeafLocation = true;
			}
		} else {
			// value is greater or equal to current node
			if (runner.right) {
				// right node exists. move into the right node
				runner = runner.right;
			} else {
				// right node doesn't exist.  insert new node into right node and exit.
				runner.right = newLeafNode;
				foundLeafLocation = true;
			}
		}
	}
	return this;
};
BSTConstructor.prototype.contains = function (value) {
	var runner;
	var foundLeafLocation = false;
	if (value === undefined) {
		return null;
	} else if (!this.root) {
		// BST is empty
		return null;
	}
	runner = this.root;
	while ((!foundLeafLocation) && (runner != null)) {
		if (runner.value == value) {
			foundLeafLocation = true;
		} else if (value < runner.value) {
			// value is less than current node
			runner = runner.left;
		} else {
			// value is greater or equal to current node
			runner = runner.right;
		}
	}
	return foundLeafLocation;
};
BSTConstructor.prototype.remove = function (value) {
	// removing nodes from a binary search tree.
	// In this case, we default to moving left one level, and then keep going right until we find
	// a proper node with no right children.
	var runner, runner2;
	var foundLeafLocation = false;
	var foundOnLeft = false;
	if (value === undefined) {
		console.log("no value given to delete");
		return null;
	} else if (!this.root) {
		// BST is empty
		return null;
	}
	runner = this.root;
	if (runner.value == value) {
		// value to delete is at the root;
		if (runner.left) {
			
		}
		
	}
	while ((!foundLeafLocation) && (runner != null)) {
		if (runner.left) {
			if (runner.left.value == value) {
				foundLeafLocation = true;
				foundOnLeft = true;
			}
		}
		if (runner.right) {
			if (runner.right.value == value) {
				foundLeafLocation = true;
				foundOnLeft = false;
			}
		}
		if (!foundLeafLocation) {
			if (value < runner.value) {
				// value is less than current node
				runner = runner.left;
			} else {
				// value is greater or equal to current node
				runner = runner.right;
			}	
		}
	}
	if (!foundLeafLocation) {
		console.log("value not found for deletion");
		return false;
	}
	// value was found, and runner is pointing to the value
	if (foundOnLeft) {
		// console.log("node found on left");
		// value is on the left of parent node
		// runner2 is assigned to target node
		runner2 = runner.left;
		if ((!runner2.left) && (!runner2.right)) {
			// node is a leaf.
			runner.left = null;
		} else if (!runner2.right) {
			// node only has left branch.  
			runner.left = runner2.left;
		} else if (!runner2.left) {
			runner.left = runner2.right;
		} else {
			runner2 = runner2.left;
			if (runner2.right) {
				while (runner2.right.right) {
					runner2 = runner2.right;
				}
				runner.left.value = runner2.right.value;
				runner2.right = runner2.right.left;
			} else {
				runner.left = runner2.left;
			}
		}
	} else {
		// console.log("node found on right");
		// value is on the right of parent node
		runner2 = runner.right;
		if ((!runner2.left) && (!runner2.right)) {
			// node is a leaf.
			runner.right = null;
		} else if (!runner2.right) {
			// node only has left branch.  
			runner.right = runner2.left;
		} else if (!runner2.left) {
			runner.right = runner2.right;
		} else {
			runner2 = runner2.left;
			if (runner2.right) {
				while (runner2.right.right) {
					runner2 = runner2.right;
				}
				runner.right.value = runner2.right.value;
				runner2.right = runner2.right.left;
			} else {
				runner.right = runner2.left;
			}
		}
	}
	return true;
};
BSTConstructor.prototype.size = function (countIn, nodeIn) {
	// recursive function to return size.  passes count by reference.
	var count = countIn || [0];
	var node = nodeIn || this.root;
	if (!this.root) {
		// BST is empty
		return 0;
	}
	// increment count
	count[0] += 1;
	if (node.left) {
		// if there is a left node, initiate recursive call left
		this.size(count, node.left);
	}
	if (node.right) {
		// if there is a right node, initiate recursive call right
		this.size(count, node.right);
	}
	// return size
	return count[0]
};
BSTConstructor.prototype.heightMax = function (heightIn, nodeIn) {
	// recursive function to return maximum height.
	var height = heightIn || 0;
	var heightLeft = 0, heightRight = 0;
	var node = nodeIn || this.root;
	if (!this.root) {
		// BST is empty
		return 0;
	}
	height += 1;
	if ((!node.left) && (!node.right)) {
		return height;
	}
	if (node.left) {
		// if there is a left node, initiate recursive call left
		heightLeft = this.heightMax(height, node.left);
	}
	if (node.right) {
		// if there is a right node, initiate recursive call right
		heightRight = this.heightMax(height, node.right);
	}
	height = heightLeft > heightRight ? heightLeft : heightRight;
	return height;
};
BSTConstructor.prototype.heightMin = function (heightIn, nodeIn) {
	// recursive function to return minimum height.
	var height = heightIn || 0;
	var heightLeft = 0, heightRight = 0;
	var node = nodeIn || this.root;
	if (!this.root) {
		// BST is empty
		return 0;
	}
	height += 1;
	if ((!node.left) && (!node.right)) {
		return height;
	}
	if (node.left) {
		// if there is a left node, initiate recursive call left
		heightLeft = this.heightMax(height, node.left);
	}
	if (node.right) {
		// if there is a right node, initiate recursive call right
		heightRight = this.heightMax(height, node.right);
	}
	height = heightLeft < heightRight ? heightLeft : heightRight;
	return height;
};
BSTConstructor.prototype.isBalanced = function (nodeIn) {
	// a Binary search tree is balanced if height of its left subtree and right subtree 
	// differ by one at most.
	var node = nodeIn || this.root;
	var heightLeftMax = 0, heightRightMax = 0,
		heightLeftMin = 0, heightRightMin = 0;
	var isBalanced;

	if (!this.root) {
		// BST is empty
		return 0;
	}
	if ((!node.left) && (!node.right)) {
		// single node tree
		return true;
	}
	if (node.left) {
		heightLeftMax = this.heightMax(0, node.left);
		heightLeftMin = this.heightMin(0, node.left);
	}
	if (node.right) {
		heightRightMax = this.heightMax(0, node.right);
		heightRightMin = this.heightMin(0, node.right);
	}
	isBalanced = (((heightLeftMax - heightLeftMin) <= 1) && ((heightRightMax - heightRightMin) <= 1));
	return isBalanced;
};
BSTConstructor.prototype.min = function (nodeIn) {
	// recursive function to return minimum value.
	var min, minLeft, minRight;
	var node = nodeIn || this.root;
	if (!this.root) {
		// BST is empty
		return 0;
	}
	minLeft = node.value;
	minRight = node.value;
	if (node.left) {
		minLeft = this.min(node.left);
	}
	if (node.right) {
		minRight = this.min(node.right);
	}
	min = node.value < minLeft ? node.value : minLeft;
	min = minRight < min ? minRight : min;
	return min;
};
BSTConstructor.prototype.max = function (nodeIn) {
	// recursive function to return maximum value.
	var max, maxLeft, maxRight;
	var node = nodeIn || this.root;
	if (!this.root) {
		// BST is empty
		return 0;
	}
	maxLeft = node.value;
	maxRight = node.value;
	if (node.left) {
		maxLeft = this.max(node.left);
	}
	if (node.right) {
		maxRight = this.max(node.right);
	}
	max = node.value > maxLeft ? node.value : maxLeft;
	max = maxRight > max ? maxRight : max;
	return max;
};
BSTConstructor.prototype.printTree = function (modeIn, nodeIn, outStringIn) {
	// printing the BS Tree contents.
	// 0 - in order (Node, left, right)
	// 1 - pre order (left, node, right)
	// 2 - post order (left, right, node)
	var mode = modeIn || 0;
	var node = nodeIn || this.root;
	var outString = outStringIn || "";
	if (!this.root) {
		// BST is empty
		return null;
	}
	switch (mode) {
		case 0:
		// in order

			//console.log("node:", node.value);
			outString += String(node.value) + " ";
			if (node.left) {
				//console.log("going left");
				outString = this.printTree(mode, node.left, outString);
			}
			if (node.right) {
				//console.log("going right");
				outString = this.printTree(mode, node.right, outString);
			}
			break;
		case 1:
		// pre order
			if (node.left) {
				//console.log("going left");
				outString = this.printTree(mode, node.left, outString);
			}
			//console.log("node:", node.value);
			outString += String(node.value) + " ";
			if (node.right) {
				//console.log("going right");
				outString = this.printTree(mode, node.right, outString);
			}
			break;
		case 2:
		// post order
			if (node.left) {
				//console.log("going left");
				outString = this.printTree(mode, node.left, outString);
			}
			if (node.right) {
				//console.log("going right");
				outString = this.printTree(mode, node.right, outString);
			}
			//console.log("node:", node.value);
			outString += String(node.value) + " ";
			break;
		default:
			//console.log("node:", node.value);
			outString += String(node.value) + " ";
			if (node.left) {
				//console.log("going left");
				outString = this.printTree(mode, node.left, outString);
			}
			if (node.right) {
				//console.log("going right");
				outString = this.printTree(mode, node.right, outString);
			}
			break;
	}
	return outString;
};
// Main Body - testing
var myTree = new BSTConstructor();
console.log("isempty", myTree.isEmpty());
myTree.add(10).add(20).add(30).add(40).add(6).add(2).add(5).add(9).add(1).add(-5).add(-10).add(6);
console.log("min:", myTree.min());
console.log("max:", myTree.max());
console.log("size:", myTree.size());
console.log("isempty", myTree.isEmpty());
console.log("heightMax", myTree.heightMax());
console.log("heightMin", myTree.heightMin());
console.log("isBalanced", myTree.isBalanced());
console.log("order");
console.log(myTree.printTree(0));
console.log("pre order");
console.log(myTree.printTree(1));
console.log("post order");
console.log(myTree.printTree(2));
console.log("contains 9", myTree.contains(9));
console.log("deleting 9", myTree.remove(9));
console.log("contains 9", myTree.contains(9));
console.log("contains 20", myTree.contains(20));
console.log("deleting 20", myTree.remove(20));
console.log("contains 20", myTree.contains(20));
console.log("contains 40", myTree.contains(40));
console.log("deleting 40", myTree.remove(40));
console.log("contains 40", myTree.contains(40));
