var socket = io('104.131.251.143:3000'),
  results = $('#results'),
  input = $("#question"),
  search_btn = $("#search_btn");

socket.on("new answers", function (qa) {
  var question = qa['question'];
  var answers = qa['answers'];

  pushNewQuestion(question, answers);
  show_answers(question, answers);

  spin_div.hide();
});

socket.on("error", function(error) {
    console.log("AN ERROR OCCURRED: " + error);
});

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
};

// color animations
input.blur(function() {
    search_btn.animate({backgroundColor: "#bdc3c7"}, 100);
});
input.focus(function() {
    search_btn.animate({backgroundColor: "#1abc9c"}, 50);
});
