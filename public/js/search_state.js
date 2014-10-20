var stateObj = {};

var pushNewQuestion = function(question, answers) {
  no_space_question = question.split(' ').join('+');
  stateObj[no_space_question] = answers;
  history.pushState(stateObj, question,
                    "/search?" + no_space_question);
}
