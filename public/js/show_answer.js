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
  console.log(word);
  console.log(word.toLowerCase().split(/\W+/)[0]);
  return word.toLowerCase().split(/\W+/)[0];
};
