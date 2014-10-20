var socket = io('http://104.131.251.143:3000'),
  results = $('#results'),
  input = $("#question");

socket.on("new answers", function (answers) {
  spin_div.hide();
  pushNewQuestion('question', answers);
  show_answers(answers);
});

socket.on("error", function(error) {
    console.log("AN ERROR OCCURRED: " + error);
});

var show_answers = function(answers) {
  for(i = 0; i < answers.length; i++) { 
    results.append(gen_result(answers[i].evidence.title, answers[i].text));
  }
}

var search = function() {
  var question = input[0].value;
  if (question.length == 0) {
      return;
  }

  socket.emit("ask question", question);

  spin_div.show();
  input.blur();
  results.empty();
  return false;
}

var gen_result = function(title, answer) {
  return ('<div class="result">' + 
            '<span class="result-thumb-tack">' + 
              '<a href="">' + 
                '<i class="fa fa-thumb-tack fa-lg"></i>' +
              '</a>' + 
            '</span>' +
            '<div class="result-title">' +
              '<a href="">' +
                title + 
              '</a>' + 
            '</div>' +
            '<div class="result-answer">' +
              answer +
            '</div>' + 
          '</div>'
         );
}

window.onload = function() {
  var no_space_prev_question = $(location).attr('search').substring(1);
  if (no_space_prev_question != '') {
    // loading a question result page
    var prev_question = no_space_prev_question.split('+').join(' ');
    input[0].value = prev_question; // show prev question
    search();
  }
}

window.onpopstate = function() {
  var no_space_prev_question = $(location).attr('search').substring(1);
  show_answers(stateObj[no_space_prev_question]); // show prev answers

  var prev_question = no_space_prev_question.split('+').join(' ');
  input[0].value = prev_question; // show prev question
}
