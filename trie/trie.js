// Trie implementation in JavaScript.
// by Adam Shechter
// September, 2016
// Trie is also called Radix Tree

// TrieNodeConstructor
// properties:
// .word = contains the word if our node is a proper word
// .children = an array of references to potential children nodes.
//             [0] corresponds to 'a', [1] corresponds to 'b'...[25] corresponds to 'z'

function TrieNodeConstructor (wordIn) {
    if (!(this instanceof TrieNodeConstructor)) {
        return new TrieNodeConstructor(word);
    }
    this.word = wordIn || null;
    this.children = [];

    for (var i = 0; i < 26; i+=1) {
        this.children[i] = null;
    }
    //console.log("adding node", this.word);
}

// TrieSetConstructor
// properties:
// .root = root of our Trie Tree
// .radixTable = a hash table containing letter:number pairs
//               going from ASCII 97 to 123 (26).
//               you can make any range of characters applicable by expanding the range.
function TrieSetConstructor () {
    if (!(this instanceof TrieSetConstructor)) {
        return new TrieSetConstructor(word);
    }
    this.root = new TrieNodeConstructor("");
    this.trieSize = 0;
    this.radixTable = {};
    this.radixLength = 26;
    for (var i = 0; i < this.radixLength; i+=1) {
        var letter = String.fromCharCode(97 + i);
        this.radixTable[letter] = i;
    }
}

// Trie Set Methods
TrieSetConstructor.prototype.contains = function (searchWord) {
    console.log("contains->",searchWord);
    if (!searchWord) { return {err: "error bad input"}}
    var word = searchWord.toLowerCase();
    var wordNode = "", currIndex = 0, currChar;
    var runner = this.root;

    while (currIndex < word.length) {
        currChar = word.charAt(currIndex);
        //console.log("wordNode", wordNode,"currChar",currChar, "currIndex", currIndex);
        //console.log(runner);
        if (runner.children[this.radixTable[currChar]]) {
            runner = runner.children[this.radixTable[currChar]];
            wordNode += currChar;
            currIndex += 1;
        } else {
            return false;
        }
    }
    //console.log(runner.word);
    return (runner.word != null);
};

TrieSetConstructor.prototype.size = function () {
    return this.trieSize;
};

TrieSetConstructor.prototype.sizeRecursive = function (countO, node) {
    var countObj = countO || {count: 0};
    var currNode = node || this.root;
    if (currNode.word) {
        countObj.count += 1;
    }
    for (var i = 0; i < this.radixLength; i += 1) {
        if (currNode.children[i]) {
            this.sizeRecursive(countObj, currNode.children[i]);
        }
    }
    return countObj.count;
};

TrieSetConstructor.prototype.insert = function (newWord) {
    if (!newWord || newWord === undefined) {
        return {err: "error in input"};
    } else if (newWord === "") {
        return null;
    }
    var runner = this.root;
    var wordNode = "",
        word = newWord.toLowerCase(),
        currIndex = 0,
        currChar;
    console.log("inserting word", word, "to trie set");
    while (currIndex < word.length) {
        currChar = word.charAt(currIndex);
        //console.log("wordNode", wordNode,"currChar",currChar, "currIndex", currIndex);
        if (!runner.children[this.radixTable[currChar]]) {
            runner.children[this.radixTable[currChar]] = new TrieNodeConstructor();
        }
        runner = runner.children[this.radixTable[currChar]];
        wordNode += currChar;
        currIndex += 1;
    }
    if (!runner.word) {
        runner.word = word;
        this.trieSize += 1;
        return true;
    } else {
        return false;
    }
};

TrieSetConstructor.prototype.insertRecursive = function (newWord, runnerNode, Index) {
    if (!newWord || newWord === undefined) {
        return {err: "error in input"};
    } else if (newWord === "") {
        return null;
    }
    var runner = runnerNode || this.root;
    var word = newWord.toLowerCase(),
        currIndex = Index || 0,
        currChar = word.charAt(currIndex);
    if (runner === this.root) {
        console.log("inserting word", word, "to trie set");
    }
    if (currIndex === word.length) {
        if (!runner.word) {
            runner.word = word;
            this.trieSize += 1;
            return true;
        } else {
            return false;
        }
    }
    //console.log("currChar",currChar, "currIndex", currIndex);
    if (!runner.children[this.radixTable[currChar]]) {
        runner.children[this.radixTable[currChar]] = new TrieNodeConstructor();
    }
    runner = runner.children[this.radixTable[currChar]];
    currIndex += 1;
    return this.insertRecursive(word, runner, currIndex);
};

TrieSetConstructor.prototype.delete = function (deleteWord) {
    if (!deleteWord || deleteWord === undefined) {
        return {err: "error in input"};
    } else if (deleteWord === "") {
        return null;
    }
    var runner = this.root,
        childrenCount;
    var nodeTag = {};
    var wordNode = "",
        word = deleteWord.toLowerCase(),
        currIndex = 0,
        currChar;

    console.log("deleting word", word, "from trie set");

    while (currIndex < word.length) {
        currChar = word.charAt(currIndex);
        //console.log("wordNode", wordNode,"currChar",currChar, "currIndex", currIndex);
        childrenCount = 0;
        for (var i = 0; i < this.radixLength; i += 1) {
            if (runner.children[i]) {
                childrenCount += 1;
            }
        }
        // set recent node tag
        if (runner.word || childrenCount > 1) {
            nodeTag.index = currIndex;
            nodeTag.node = runner;
        }
        if (!runner.children[this.radixTable[currChar]]) {
            return {err: "error.  Path to word was broken."};
        }
        runner = runner.children[this.radixTable[currChar]];
        wordNode += currChar;
        currIndex += 1;
    }
    var deleteNodeHasChildren = false;
    for (var j = 0; j < this.radixLength; j += 1) {
        if (runner.children[j]) {
            deleteNodeHasChildren = true;
            break;
        }
    }
    // case 1 - erase word where node has children
    if (deleteNodeHasChildren && runner.word) {
        runner.word = null;
        this.trieSize -= 1;
        return true;
    } else if (runner.word) {
        // case 2 - erase connection as most recent node to satisfy 2 conditions. (multiple children, or word).
        //console.log(nodeTag);
        nodeTag.node.children[this.radixTable[word.charAt(nodeTag.index)]] = null;
        this.trieSize -= 1;
        return true;
    }
    return false;
};

TrieSetConstructor.prototype.first = function () {
    var runner = this.root,
        isDeadEnd = false;
    while (!runner.word && !isDeadEnd) {
        for (var i = 0; i < this.radixLength; i += 1) {
            if (runner.children[i] != null) {
                runner = runner.children[i];
                break;
            }
        }
        if (i === this.radixLength) {
            isDeadEnd = true;
        }
    }
    if (!isDeadEnd) {
        console.log("first word:",runner.word);
        return runner.word;
    } else {
        console.log("dead end");
        return false;
    }

};

TrieSetConstructor.prototype.last = function () {
    var runner = this.root,
        isDeadEnd = false;
    while (!runner.word && !isDeadEnd) {
        for (var i = this.radixLength - 1; i > -1; i -= 1) {
            if (runner.children[i] != null) {
                runner = runner.children[i];
                break;
            }
        }
        if (i === -1) {
            isDeadEnd = true;
        }
    }
    if (!isDeadEnd) {
        console.log("last word:",runner.word);
        return runner.word;
    } else {
        console.log("dead end");
        return false;
    }
};

TrieSetConstructor.prototype.next = function (wordIn) {
    if (!wordIn || wordIn === undefined) {
        return {err: "error in input"};
    } else if (wordIn === "") {
        return null;
    }
    var runner = this.root,
        isDeadEnd = false,
        word = wordIn.toLowerCase();
    // find location of current string
    var wordNode = "", currIndex = 0, currChar;

    while (currIndex < word.length) {
        currChar = word.charAt(currIndex);
        //console.log("wordNode", wordNode,"currChar",currChar, "currIndex", currIndex);
        //console.log(runner);
        if (runner.children[this.radixTable[currChar]]) {
            runner = runner.children[this.radixTable[currChar]];
            wordNode += currChar;
            currIndex += 1;
        } else {
            console.log("input:", word, "| not found");
            return null;
        }
    }
    // search for next word
    while (!runner.word && !isDeadEnd) {
        for (var i = 0; i < this.radixLength; i += 1) {
            if (runner.children[i] != null) {
                runner = runner.children[i];
                break;
            }
        }
        if (i === this.radixLength) {
            isDeadEnd = true;
        }
    }
    if (!isDeadEnd) {
        console.log("input:", word, "| next word:",runner.word);
        return runner.word;
    } else {
        console.log("input:", word, "| not found");
        return null;
    }
};

TrieSetConstructor.prototype.autoComplete = function (wordIn, words, node) {
    // recursive function that returns results of potential words
    if (!wordIn || wordIn === undefined) {
        return {err: "error in input"};
    } else if (wordIn === "") {
        return null;
    }
    var wordStorage = words || [],
        currNode = node || this.root,
        word = wordIn.toLowerCase();
    // find location of current string
    var wordNode = "", currIndex = 0, currChar;
    if (currNode === this.root) {
        while (currIndex < word.length) {
            currChar = word.charAt(currIndex);
            if (currNode.children[this.radixTable[currChar]]) {
                currNode = currNode.children[this.radixTable[currChar]];
                wordNode += currChar;
                currIndex += 1;
            } else {
                console.log("input:", word, "| not found");
                return null;
            }
        }
    }
    if (currNode.word) {
        wordStorage.push(currNode.word);
    }
    // send recursive calls to add words to word bank
    for (var i = 0; i < this.radixLength; i += 1) {
        if (currNode.children[i]) {
            this.autoComplete(word, wordStorage, currNode.children[i]);
        }
    }
    return wordStorage;
};

// Main Body - Testing
var trie1 = new TrieSetConstructor();
trie1.insert("hello");
trie1.insert("world");
trie1.insert("xylophone");
trie1.insertRecursive("aberaham");
trie1.insertRecursive("abe");
console.log(trie1.contains("hell"));
console.log(trie1.contains("hello"));
console.log(trie1.contains("world"));
trie1.insert("abbey");
trie1.insertRecursive("ADAM");
//trie1.insertRecursive("battery");
trie1.insertRecursive("zebra");
// console.log((trie1.contains("adam")));
// trie1.delete("adam");
// console.log((trie1.contains("adam")));

// trie1.insert("as");
trie1.insert("ass");
// console.log(trie1.contains("as"));
console.log(trie1.contains("ass"));
console.log(trie1.delete("ass"));
// console.log(trie1.contains("as"));
console.log(trie1.contains("ass"));
console.log(trie1.delete("xylophone"));
console.log("size", trie1.size());
console.log("size", trie1.sizeRecursive());
trie1.next("batter");
trie1.next("ab");
trie1.next("zeb");
trie1.first();
trie1.last();
console.log("ab ->", trie1.autoComplete("ab"));