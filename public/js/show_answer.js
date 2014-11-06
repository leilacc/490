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
    thumbtack.clickover({
      html: true,
      global_close: true,
      esc_close: true,
      placement: 'bottom',
      content: get_popover_content(i),
      onShown: function() {setClickoverHandlers($(this)[0]['$element'][0]['id'].replace( /^\D+/g, ''))}
    });

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
  var folder_links = "";
  return new_folder_form + folder_links;
           "<span class='folder-link'>" +
             "<a class='folder-link' data-dismiss='clickover' onclick='save_case(0, 0)'>My Cases</a>" +
            "</span>" +
           "<span class='folder-link'>" +
             "<a class='folder-link' data-dismiss='clickover'>&nbsp&nbsp&nbspTercon</a>" +
            "</span>" +
           "<span class='folder-link'>" +
             "<a class='folder-link' data-dismiss='clickover'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspHighway Act</a>" +
            "</span>" +
           "<span class='folder-link'>" +
             "<a class='folder-link' data-dismiss='clickover'>&nbsp&nbsp&nbspKnapp</a>" +
            "</span>";
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
            '<div class="col-lg-2 pin-col">' +
              '<span class="result-thumb-tack">' +
                '<a href="#" id="thumbtack' + id + '" class="thumbtack" rel="clickover">' +
                  '<i class="fa fa-thumb-tack fa-lg"></i>' +
                '</a>' +
                '<span class="pin-name">Tercon</span>' +
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
