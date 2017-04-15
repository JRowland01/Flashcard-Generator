var fs = require('fs');

function Basic(basicQ, remaining) {
    this.basicQ = basicQ;
    this.remaining = remaining;
}

Basic.prototype.printInfo = function() {
    console.log("Question: " + this.basicQ + "\nAnswer: " + this.remaining + "\nThe flashcard database now includes this card.");
};

module.exports = Basic;