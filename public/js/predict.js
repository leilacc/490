var MIN_PREDICT_CONFIDENCE_LVL = 40;

function predict(question) {
  // remove "how likely is/are"
  question = question.split(" ").slice(3).join(" ");

  case_id = 0;
  issues = get_issues(case_id);
  var case_answers = [];
  var context_answers = [];
  case_answers.push(['http://www.canlii.org/en/ca/scc/doc/2001/2001scc59/2001scc59.html', '671122 Ontario Ltd. v. Sagaz Industries Canada Inc., [2001] 2 SCR 983, 2001 SCC 59', 'There is no one conclusive test which can be universally applied to determine whether a person is an employee or an independent contractor. What must always occur is a search for the total relationship of the parties. The central question is whether the person who has been engaged to perform the services is performing them as a person in business on his own account. In making this determination, the level of control the employer has over the worker’s activities will always be a factor. However, other factors to consider include whether the worker provides his or her own equipment, whether the worker hires his or her own helpers, the degree of financial risk taken by the worker, the degree of responsibility for investment and management held by the worker, and the worker’s opportunity for profit in the performance of his or her tasks.']);
  case_answers.push(['http://www.canlii.org/en/ca/fca/doc/2013/2013fca85/2013fca85.html', '1392644 Ontario Inc. (Connor Holmes) v. Canada (National Revenue), 2013 FCA 85', "However, properly understood, the approach set out in Royal Winnipeg Ballet simply emphasises the well-know principle that persons are entitled to organize their affairs and relationships as they best deem fit. The relationship of parties who enter into a contract is generally governed by that contract. Thus the parties may set out in a contract their respective duties and responsibilities, the financial terms of the services provided, and a large variety of other matters governing their relationship. However, the legal effect that results from that relationship, i.e. the legal effect of the contract, as creating an employer-employee or an independent contactor relationship, is not a matter which the parties can simply stipulate in the contract. In other words, it is insufficient to simply state in a contract that the services are provided as an independent contractor to make it so."]);
  case_answers.push(['http://www.canlii.org/en/ca/tcc/doc/2000/2000canlii460/2000canlii460.html', 'McCrimmon Holdings Ltd. v. M.N.R., 2000 CanLII 460 (TCC)', 'The payment for playing hockey is modest but all their expenses are covered, including room and board. However, the requirement to play hockey is not inextricably bound to a condition of scholarship as may be the case with a university since attendance at a post-secondary educational institution was not mandatory for remaining on the roster. In the case of Charron v. M.N.R., [1994] T.C.J. No. 47 - Archambault T.C.J. heard an appeal from a determination by the Minister that the appellant - a graduate student employed by Laval University on a research project - was not engaged in insurable employment because she was receiving university credit for the work. Judge Archambault held that the existence of an academic benefit did not prevent the existence of a contract of employment and at paragraph 14 of his judgment stated:"...Further, the fact that s. 3(1)(a) refers to employment " under any express or implied contract of service or apprenticeship, written or oral, whether the earnings of the employed person are received from the employer or some other person" indicates that Parliament clearly intended the idea of insurable employment to be as wide as possible for the purposes of the Act."']);
  context_answers.push(['http://www.canlii.org/en/on/laws/stat/so-2000-c-41/latest/so-2000-c-41.html', 'CanLII - Employment Standards Act, 2000, SO 2000, c 41', 'For the purposes of clause (c) of the definition of “employee” in subsection (1), an individual receiving training from a person who is an employer is an employee of that person if the skill in which the individual is being trained is a skill used by the person’s employees, unless all of the following conditions are met:       1. The training is similar to that which is given in a vocational school.         2. The training is for the benefit of the individual.      3. The person providing the training derives little, if any, benefit from the activity of the individual while he or she is being trained.      4. The individual does not displace employees of the person providing the training.      5. The individual is not accorded a right to become an employee of the person providing the training.      6. The individual is advised that he or she will receive no remuneration for the time that he or she spends in training. 2000, c. 41, s. 1 (2).']);

  // fake timeout for hardcoded answers
  setTimeout(function() {show_prediction(case_answers, context_answers);
                          spin_div.hide();
                        }, 3000);
  results.empty();
  spin_div.show();
  /*
  $.ajax({
    url: "http://128.100.31.200:8080/",
    dataType: "json",
    data: { question: question},//, issues: issues },
    type: "POST"
  }).done(function (data) {
    // data is the javascript object from the json response
    console.log(data);

    var similar_case_questions = data['similar_case_questions'];
    var context_questions = data['context_questions'];
    var case_answers = get_relevant_answers(similar_case_questions);
    var context_answers = get_relevant_answers(context_questions);

    show_prediction();
    spin_div.hide();
    pushNewQuestion(question, answers);
  });
  */
}

function get_issues(case_id) {
  return ['back wages', 'overtime pay', 'holiday pay', 'vacation pay',
          'weekly allowance'];
}

function get_relevant_answers(questions) {
  var all_answers = [];
  for (i = 0; i < questions.length; i++) {
    $.post("/ask", {"question": question, "currentPath[]": []}).done(
        function(data) {
      var answers = data['answers'];
      var relevant_answers = []

      for (j = 0; j < answers.length; j++) {
        if (answers[j].confidence > MIN_PREDICT_CONFIDENCE_LVL) {
          relevant_answers.push(answers[j]);
        }
      }
      all_answers.push(relevant_answers);
    });
  }

  return all_answers;
}

function show_likelihood(likelihood) {
  var id=1;
  return ('<div class="row">' +
            '<div class="col-lg-2">' +
            '</div>' +
            '<div class="col-lg-8 predict prediction">' +
              '<div class="result likelihood">' +
                'It is approximately ' +
                '<span id="percent">' + likelihood + '%</span>' +
                ' likely that the court will define CHL players ' +
                'as employees.' +
              '</div>' +
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
}
keywords_str = 'employee employees employer player players wage contract contractors wages pay paid overtime vacation league standard'
var keywords = str_to_obj_of_words(keywords_str);

function get_panel(title, answers) {
  panel = '<div class="row">' +
            '<div class="col-lg-2">' +
            '</div>' +
            '<div class="col-lg-8 predict">' +
              '<div id="accordion" class="panel-group">' +
                '<div id="panel1" class="panel panel-default">' +
                  '<div class="panel-heading">' +
                    '<h4 class="panel-title">' +
                      '<a data-toggle="collapse", data-target="#collapse' + title + '", class="saved-q">' +
                        title +
                      '</a>' +
                    '</h4>' +
                  '</div>' +
                  '<div id="collapse' + title + '" class="panel-collapse collapse">' +
                    '<div class="panel-body" onmouseup="highlightSelection()">';
  for (i = 0; i < answers.length; i++) {
    if (i == 0) {
      panel = panel + gen_result(answers[i][0], answers[i][1], highlighted_answer(answers[i][2], keywords), false);
    } else {
      panel = panel + gen_result(answers[i][0], answers[i][1], highlighted_answer(answers[i][2], keywords), true);
    }
  }

  // close panel-body, collapseOne, panel, accordian, col, row
  return panel + '</div></div></div></div></div></div>';
}

function show_prediction(case_answers, context_answers) {
  prediction = "";
  prediction = prediction.concat(show_likelihood('68'));
  prediction = prediction.concat(get_panel('Evidence', case_answers));
  prediction = prediction.concat(get_panel('Context', context_answers));
  results.append(prediction);

  var thumbtack = $('#thumbtack' + '1');
  thumbtack.clickover({
    html: true,
    global_close: true,
    esc_close: true,
    placement: 'bottom',
    content: get_popover_content(i),
    onShown: function() {setClickoverHandlers($(this)[0]['$element'][0]['id'].replace( /^\D+/g, ''))}
  });
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
