var MIN_CONFIDENCE_LVL = 0;

var show_answers = function(question, answers) {
  if (typeof answers === 'undefined') {
    search();
    return;
  }

  var question_obj = str_to_obj_of_words(question);
  for(var i = 0; i < answers.length; i++) {
    results.append(gen_result_row(answers[i].evidence.title,
                              highlighted_answer(answers[i].evidence.text,
                                                 question_obj),
                              answers[i].confidence,
                              i));

    var thumbtack = $('#thumbtack' + i);
    thumbtack.clickover({
      html: true,
      global_close: true,
      esc_close: true,
      placement: 'bottom',
      content: get_popover_content(i),
      onShown: function() {setClickoverHandlers($(this)[0]['$element'][0]['id'].replace( /^\D+/g, ''))}
    });

  $('[data-toggle="tooltip"]').tooltip();
  }
};

var setClickoverHandlers = function(id) {
  $( "#new_folder" + id ).submit(function( event ) {
      event.preventDefault();
  });
}

var get_popover_content = function(id) {
  var new_folder_form = "<form id='new_folder" + id + "'>" +
                          "<input type='text' class='new_folder' id='new_folder_input"
                            + id +
                            "' placeholder='New folder' autofocus='autofocus'>" +
                        "</form>";
  var folder_links  = "<span class='folder-link'>" +
             "<a class='folder-link' data-dismiss='clickover' onclick='save_case(" + id + ", \"Players vs CHL\")'>Players vs CHL</a>" +
            "</span>" +
           "<span class='folder-link'>" +
             "<a class='folder-link' data-dismiss='clickover' onclick='save_case(" + id + ", \"Tercon\")'>Tercon</a>" +
            "</span>" +
             "<a class='folder-link' data-dismiss='clickover' onclick='save_case(" + id + ", \"Landmark vs Ontario\")'>Landmark vs Ontario</a>" +
            "</span>";
  return new_folder_form + folder_links;
};

function get_canlii_href(title) {
  var tokens = title.split(" ");
  var year = tokens[2];
  var court = tokens[3].toLowerCase();
  var num = tokens[4];
  if (court.length == 4) {
    var jurisdiction = court.substr(0, 2);
  } else {
    var jurisdiction = 'ca';
  }
  var ycn = year + court + num;
  return 'http://www.canlii.org/en/' + jurisdiction + '/' + court +
         '/doc/' + year + '/' + ycn + '/' + ycn + '.html';
}

var gen_result_row = function(title, answer, confidence, id) {
  confidence = Math.round(confidence * 100);
  if (confidence < MIN_CONFIDENCE_LVL) {
    return
  }

  var href = get_canlii_href(title);
  return ('<div class="row">' +
            '<div class="col-lg-1">' +
            '</div>' +
            '<div class="col-lg-1 confidence">' +
              '<a href="#" class="confidence"' +
                  'data-toggle="tooltip" data-placement="left"' +
                  'title="We\'re ' + confidence + '% sure this is the right answer">' +
                  confidence + '%' +
              '</a>' +
            '</div>' +
            '<div class="col-lg-8">' +
              gen_result(href, title, answer, true) +
            '</div>' +
            '<div class="col-lg-2 pin-col">' +
              '<span class="result-thumb-tack" id="result' + id + '">' +
                '<a href="#" id="thumbtack' + id + '" class="thumbtack" rel="clickover">' +
                  '<i class="fa fa-thumb-tack fa-lg"></i>' +
                '</a>' +
              '</span>' +
            '</div>' +
          '</div>'
         );
};

function gen_result(href, title, answer, use_result_div) {
  var inner_result = '<div class="result-title">' +
                        '<a href="' + href + '" target="_blank">' +
                          title +
                        '</a>' +
                      '</div>' +
                      '<div class="result-answer">' +
                        answer +
                      '</div>';
  if (use_result_div) {
    return '<div class="result">' +
              inner_result +
            '</div>';
  } else {
    return inner_result
  }
}

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
