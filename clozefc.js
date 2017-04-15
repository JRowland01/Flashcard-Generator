var fs = require('fs');

function Cloze(clozeQ, remaining) {
    this.clozeQ = clozeQ;
    this.remaining = remaining;
}

Cloze.prototype.printClozeInfo = function() {
    console.log("Cloze: " + this.clozeQ + "\nRemaining Text: " + this.remaining + "\nThe flashcard database now includes this card.");
};

module.exports = Cloze;