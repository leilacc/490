var results = $('#results'),
  input = $("#question"),
  search_btn = $("#search_btn");

var search = function() {
  var question = input[0].value;
  if (question.length == 0) {
      return;
  }

  $.post("/ask", {"question": question, "currentPath[]": []}).done(function(data) {
    var question = data['question'];
    var answers = data['answers'];

    pushNewQuestion(question, answers);
    show_answers(question, answers);

    $('#thumbtack0').click(function() {
      $('#thumbtack0').css('color', '#EC6363');
    });

    spin_div.hide();
  });

  spin_div.show();
  input.blur();
  results.empty();
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
