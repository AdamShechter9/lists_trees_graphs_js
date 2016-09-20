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
function TrieSetConstructor () {
    if (!(this instanceof TrieSetConstructor)) {
        return new TrieSetConstructor(word);
    }
    this.root = new TrieNodeConstructor("");
    this.radixTable = {};
    for (var i = 0; i < 26; i+=1) {
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
    console.log("inserting word", word, "to trie set");
    if (currIndex === word.length) {
        if (!runner.word) {
            runner.word = word;
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


// Main Body - Testing
var trie1 = new TrieSetConstructor();
trie1.insert("hello");
trie1.insert("world");
//console.log(trie1.contains("hell"));
console.log(trie1.contains("hello"));
console.log(trie1.contains("world"));
console.log((trie1.contains("adam")));
console.log(trie1.contains("wor"));
console.log(trie1.contains("hel"));
trie1.insertRecursive("ADAM");
console.log((trie1.contains("adam")));