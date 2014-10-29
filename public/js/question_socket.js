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
var focus_color = "#1abc9c",
    blur_color = "#bdc3c7";
var searchbar_color_animation = function(color) {
  return function() {
    search_btn.animate({backgroundColor: color}, 1);
    input.animate({borderColor: color}, 1);
  };
};
input.hover(searchbar_color_animation(focus_color),
            searchbar_color_animation(blur_color));
search_btn.hover(searchbar_color_animation(focus_color),
                 searchbar_color_animation(blur_color));
