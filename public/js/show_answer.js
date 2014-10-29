var show_answers = function(question, answers) {
  if (typeof answers === 'undefined') {
    search();
    return;
  }

  var question_obj = str_to_obj_of_words(question);
  for(var i = 0; i < answers.length; i++) {
    results.append(gen_result(answers[i].evidence.title,
                              highlighted_answer(answers[i].text,
                                                 question_obj)));
  }
};

var gen_result = function(title, answer) {
  return ('<div class="row">' +
            '<div class="col-lg-2">' +
            '</div>' +
            '<div class="col-lg-8">' +
              '<div class="result">' +
                '<div class="result-title">' +
                  '<a href="">' +
                    title +
                  '</a>' +
                '</div>' +
                '<div class="result-answer">' +
                  answer +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="col-lg-2">' +
              '<span class="result-thumb-tack">' +
                '<button type="button" class="btn btn-default thumb-tack" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">' +
                  '<i class="fa fa-thumb-tack fa-lg"></i>' +
                  '</button>' +
              '</span>' +
            '</div>' +
          '</div>'
         );
};

var highlighted_answer = function(orig_answer, question) {
  var words = orig_answer.split(" "),
      new_answer = [];

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var std_word = standardize_word(word);
    if ((std_word in question) && !(std_word in fwords)) {
      new_answer.push("<strong>"+word+"</strong>");
    } else {
      new_answer.push(word);
    }
  }

  return new_answer.join(" ");
};

var str_to_obj_of_words = function(str) {
  obj = {};
  words = str.split(" ");
  for (var i = 0; i < words.length; i++) {
    obj[standardize_word(words[i])] = 1;
  }
  return obj;
};

var standardize_word = function(word) {
  return word.toLowerCase().split(/\W+/)[0];
};
