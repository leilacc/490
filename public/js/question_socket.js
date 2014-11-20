var results = $('#results'),
  input = $("#question"),
  search_btn = $("#search_btn");

// define startsWith function for strings
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

var search = function() {
  var question = input[0].value;
  if (question.length == 0) {
      return;
  }

  results.empty();
  spin_div.show();
  input.blur();

  var lowerq = question.toLowerCase();
  if (lowerq.startsWith("how likely")) {
    // Get prediction
    predict(question);
  } else {
    // Get regular answers
    $.post("/ask", {"question": question, "currentPath[]": []}).done(
        function(data) {
      var question = data['question'];
      var answers = data['answers'];

      show_answers(question, answers);
      spin_div.hide();
      pushNewQuestion(question, answers);
    });
  }

  return false;
}

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
