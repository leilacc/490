var socket = io('localhost:3000'),
  results = $('#results'),
  input = $("#question"),
  search_btn = $("#search");

socket.on("new answers", function (qa) {
  var question = qa['question'];
  var answers = qa['answers'];

  pushNewQuestion(question, answers);
  show_answers(answers);

  spin_div.hide();
});

socket.on("error", function(error) {
    console.log("AN ERROR OCCURRED: " + error);
});

var show_answers = function(answers) {
  if (typeof answers === 'undefined') {
    search();
    return;
  }
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

// color animations
input.blur(function() {
    search_btn.animate({backgroundColor: "#bdc3c7"}, 100);
});
input.focus(function() {
    search_btn.animate({backgroundColor: "#1abc9c"}, 50);
});
