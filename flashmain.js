var inquirer = require('inquirer');
var fs = require('fs');
var Basic = require("./basicfc");
var Cloze = require('./clozefc')


var userInput = process.argv[2];
var questions = [];
var clozeQuestions = [];



if (userInput === undefined) {

    console.log('Please state of you want to create a Basic or Cloze card.');

} else if (userInput.toLowerCase() == "basic") {

    console.log('Basic Flashcard');

    var qCommands = [{
        type: "input",
        name: "question",
        message: "Provide the text for the front of the card."
    }, {
        type: "input",
        name: "answer",
        message: "Provide the text for the back of the card."
    }];

    var qResponse = function(answers) {
        var nQuestion = new Basic(answers.question, answers.answer);
        nQuestion.printInfo();
        var newJSON = JSON.stringify(nQuestion);
        questions.push(newJSON);
        fs.appendFile('basicfc.txt', newJSON + "\n");

        return inquirer.prompt([{
            name: "additional",
            message: "Would you like to create a new card?",
            type: "confirm",
            default: true
        }]);
    };

    var newResponse = function(nBasic) {
        if (nBasic.additional) {
            pQuestion();
        } else {
            console.log("Thank you for updating the flashcard database.");
        }
    };

    var catchErr = function(err) {
        console.log("This program has encountered an error.");
    };

    var pQuestion = function() {
        inquirer.prompt(qCommands)
            .then(qResponse, catchErr)
            .then(newResponse, catchErr);
    };

    pQuestion();

} else if (userInput.toLowerCase() == "cloze") {

    console.log('Cloze Flashcard');

    var clozeQuestionPrompts = [{
        type: "input",
        name: "cloze",
        message: "What part of the question would you like hidden?"
    }, {
        type: "input",
        name: "remaining",
        message: "Please provide the remaining text in the question."
    }];

    var clozeReponse = function(clozeAnswers) {
        var newClozeQuestion = new Cloze(clozeAnswers.cloze, clozeAnswers.remaining);
        newClozeQuestion.printClozeInfo();
        var newClozeQJSON = JSON.stringify(newClozeQuestion);
        clozeQuestions.push(newClozeQJSON);
        fs.appendFile('clozefc.txt', newClozeQJSON + "\n");

        return inquirer.prompt([{
            name: "additionalClz",
            message: "Would you like to create a new card?",
            type: "confirm",
            default: true
        }]);
    };

    var newClozeResponse = function(newC) {
        if (newC.additionalClz) {
            pClozeQ();
        } else {
            console.log("Thank you for updating the flashcard database.");
        }
    };

    var catchClozeErr = function() {
        console.log("There has been an error.");
    };

    var pClozeQ = function() {
        inquirer.prompt(clozeQuestionPrompts)
            .then(clozeReponse, catchClozeErr)
            .then(newClozeResponse, catchClozeErr);
    };

    pClozeQ();

} else {
    console.log('Would you like to create a Basic or Cloze card?');
}