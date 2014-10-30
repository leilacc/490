var show_answers = function(question, answers) {
  if (typeof answers === 'undefined') {
    search();
    return;
  }

  var question_obj = str_to_obj_of_words(question);
  for(var i = 0; i < answers.length; i++) {
    results.append(gen_result(answers[i].evidence.title,
                              highlighted_answer(answers[i].text,
                                                 question_obj),
                              i));

    var thumbtack = $('#thumbtack' + i);
    //thumbtack.attr('data-content', get_popover_content(i));
    thumbtack.clickover({
      html: true,
      global_close: true,
      content: get_popover_content(i)
    });
  }
};

var get_popover_content = function(id) {
  return "<input type='text' class='new_folder' placeholder='New folder'>" +
         "<a href=''>My Cases</a><br>" +
         "<a href=''>Tercon</a><br>" +
         "<a href=''>Knapp</a><br>";
};

var gen_result = function(title, answer, id) {
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
                '<a href="#" id="thumbtack' + id + '" rel="clickover" ' +
             //       'data-content="' + get_popover_content(id) + '"' +
                    'data-original-title="Save to...">' +
                  '<i class="fa fa-thumb-tack fa-lg"></i>' +
                '</a>' +
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
