var stateObj = {};

var pushNewQuestion = function(question, answers) {
  no_space_question = question.split(' ').join('+');
  stateObj[no_space_question] = answers;
  history.pushState(stateObj, question,
                    "/search?" + no_space_question);
};

window.onload = function() {
  var no_space_prev_question = $(location).attr('search').substring(1);
  if (no_space_prev_question != '') {
    // loading a question result page
    var prev_question = no_space_prev_question.split('+').join(' ');
    input[0].value = prev_question; // show prev question
    search();
  }
};

window.onpopstate = function() {
  var no_space_prev_question = $(location).attr('search').substring(1),
      prev_question = no_space_prev_question.split('+').join(' ');
  results.empty(); // get rid of other answers
  show_answers(prev_questions,
               stateObj[no_space_prev_question]); // show prev answers

  input[0].value = prev_question; // show prev question
};
