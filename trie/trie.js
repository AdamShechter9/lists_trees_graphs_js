// Trie implementation in JavaScript.
// by Adam Shechter
// September, 2016
// Trie is also called Radix Tree

// TrieNodeConstructor
// properties:
// .word = contains the word if our node is a proper word
// .children = an array of references to potential children nodes.
//             [0] corresponds to 'a', [1] corresponds to 'b'...[25] corresponds to 'z'

function TrieNodeConstructor (word) {
    if (!(this instanceof TrieNodeConstructor)) {
        return new TrieNodeConstructor(word);
    }
    this.word = word || null;
    this.children = [];

    for (var i = 0; i < 26; i+=1) {
        this.children[i] = null;
    }
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
    var word = searchWord.toLowerCase();
    var wordNode = "", currIndex = 0, currChar;
    var runner = this.root;

    while (wordNode != word) {
        currChar = word.charAt(currIndex);
        if (runner.children[this.radixTable[currChar]]) {
            runner = runner.children[this.radixTable[currChar]];
            wordNode += currChar;
            currIndex += 1;
        } else {
            return false;
        }
    }
    return (this.word != null);
};





// Main Body - Testing
var trie1 = new TrieSetConstructor();
console.log(trie1.radixTable);