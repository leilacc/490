var MIN_PREDICT_CONFIDENCE_LVL = 5;

function predict(question) {
  // remove "how likely is/are"
  question = question.split(" ").slice(3).join(" ");

  case_id = 0;
  issues = get_issues(case_id);
  var case_answers = [];
  var context_answers = [];
  case_answers.push(['http://mynlrb.nlrb.gov/link/document.aspx/09031d4581667b6f', 'United States Government Before the National Labor Relations Board Region 13-RC-121359', 'In sum, based on the entire record in this case, I find that the Employer’s football players who receive scholarships fall squarely within the Act’s broad definition of “employee” when one considers the common law definition of “employee.” However, I find that the walk-ons do not meet the definition of “employee” for the fundamental reason that they do not receive compensation for the athletic services that they perform. Unlike the scholarship players, the walk-ons do not sign a “tender” or otherwise enter into any type of employment contract with the Employer. The walk-ons also appear to be permitted a greater amount of flexibility by the football coaches when it comes to missing portions of practices and workouts during the football season if they conflict with their class schedule. In this regard, it is noted that both scholarship players who testified, Colter and Ward, testified that they did not enroll in classes that conflicted with their football commitments. This distinction is not surprising given that the players are compelled by the terms of their “tender” to remain on the team and participate in all its activities in order to maintain their scholarship.']);
  case_answers.push(['', 'Wiebe Door Services Ltd. v. M.N.R., [1986] 3 FC 553 (CanLII)', "1. The workers worked mostly on their own. They were free to accept or refuse a call. They were not required to work or attend at the Appellant's place of business, except to pick up a door or parts. The Appellant did exercise some measure of control over the workers. Firstly, the Appellant assigned the jobs to the installer. The job was guaranteed for one year. Within that time the Appellant would require the installer to correct any faulty or defective installation or repair. On the basis of the Control Test, the evidence is indecisive.      2. Each worker owned his own truck and tools. The appellant provided only the special racks for transporting doors and the special cement drill, when required. On the basis of this test, the workers would seem to be independent contractors."]);
  case_answers.push(['http://www.canlii.org/en/ca/scc/doc/2001/2001scc59/2001scc59.html', 'CanLII - 2001 SCC 59 - 671122 Ontario Ltd. v. Sagaz Industries Canada Inc., [2001] 2 SCR 983, 2001 SCC 59 (CanLII)', "There is no one conclusive test which can be universally applied to determine whether a person is an employee or an independent contractor.  What must always occur is a search for the total relationship of the parties.  The central question is whether the person who has been engaged to perform the services is performing them as a person in business on his own account.  In making this determination, the level of control the employer has over the worker’s activities will always be a factor.  However, other factors to consider include whether the worker provides his or her own equipment, whether the worker hires his or her own helpers, the degree of financial risk taken by the worker, the degree of responsibility for investment and management held by the worker, and the worker’s opportunity for profit in the performance of his or her tasks."]);
  context_answers.push(['http://www.canlii.org/en/on/laws/stat/so-2000-c-41/latest/so-2000-c-41.html', 'CanLII - Employment Standards Act, 2000, SO 2000, c 41', 'For the purposes of clause (c) of the definition of “employee” in subsection (1), an individual receiving training from a person who is an employer is an employee of that person if the skill in which the individual is being trained is a skill used by the person’s employees, unless all of the following conditions are met:       1. The training is similar to that which is given in a vocational school.         2. The training is for the benefit of the individual.      3. The person providing the training derives little, if any, benefit from the activity of the individual while he or she is being trained.      4. The individual does not displace employees of the person providing the training.      5. The individual is not accorded a right to become an employee of the person providing the training.      6. The individual is advised that he or she will receive no remuneration for the time that he or she spends in training. 2000, c. 41, s. 1 (2).']);

  // fake timeout for hardcoded answers
  setTimeout(function() {show_prediction(case_answers, context_answers);
                          spin_div.hide();
                        }, 3000);
  results.empty();
  spin_div.show();
  /*
  $.ajax({
    url: "example.com/data",
    dataType: "json",
    data: { question: question, issues: issues }
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
  var id=0;
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

var keywords = str_to_obj_of_words('employee employees employer player players wage contract contractors wages pay paid overtime vacation league standard');
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
                    '<div class="panel-body">';
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
  prediction = prediction.concat(show_likelihood('74'));
  prediction = prediction.concat(get_panel('Evidence', case_answers));
  prediction = prediction.concat(get_panel('Context', context_answers));
  results.append(prediction);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
