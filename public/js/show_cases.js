var next_id = 10;
var cache = {};

var cases = [{
  type: "folder",
  name: "Players vs CHL",
  id: 1,
  children: [{
    type: "question",
    name: "How likely is the court to define CHL players as employees of the League?",
    id: next_id++,
    answers: [{
      section: "Outcome",
      text: "It is approximately 68% likely that the court will define CHL players as employees."
    }, {
      section: "Evidence",
      question: "What is the legal test that determines if a person is an employee?",
      title: "671122 Ontario Ltd. v. Sagaz Industries Canada Inc., [2001] 2 SCR 983, 2001 SCC 59",
      url: "http://www.canlii.org/en/ca/scc/doc/2001/2001scc59/2001scc59.html",
      text: "There is no one conclusive test which can be universally applied to determine whether a person is an employee or an independent contractor.  What must always occur is a search for the total relationship of the parties.  The central question is whether the person who has been engaged to perform the services is performing them as a person in business on his own account.  In making this determination, the level of control the employer has over the worker’s activities will always be a factor.  However, other factors to consider include whether the worker provides his or her own equipment, whether the worker hires his or her own helpers, the degree of financial risk taken by the worker, the degree of responsibility for investment and management held by the worker, and the worker’s opportunity for profit in the performance of his or her tasks." },
      {
      question: "Does signing a contract make someone a contractor?",
      title: "1392644 Ontario Inc. (Connor Holmes) v. Canada (National Revenue), 2013 FCA 85",
      url: "http://www.canlii.org/en/ca/fca/doc/2013/2013fca85/2013fca85.html",
      text: "However, properly understood, the approach set out in Royal Winnipeg Ballet simply emphasises the well-know principle that persons are entitled to organize their affairs and relationships as they best deem fit. The relationship of parties who enter into a contract is generally governed by that contract. Thus the parties may set out in a contract their respective duties and responsibilities, the financial terms of the services provided, and a large variety of other matters governing their relationship. However, the legal effect that results from that relationship, i.e. the legal effect of the contract, as creating an employer-employee or an independent contactor relationship, is not a matter which the parties can simply stipulate in the contract. In other words, it is insufficient to simply state in a contract that the services are provided as an independent contractor to make it so."
      },
      {
      question: "Must players with scholarships be paid minimum wage?",
      title: "McCrimmon Holdings Ltd. v. M.N.R., 2000 CanLII 460 (TCC)",
      url: "http://www.canlii.org/en/ca/tcc/doc/2000/2000canlii460/2000canlii460.html",
      text: 'The payment for playing hockey is modest but all their expenses are covered, including room and board. However, the requirement to play hockey is not inextricably bound to a condition of scholarship as may be the case with a university since attendance at a post-secondary educational institution was not mandatory for remaining on the roster. In the case of Charron v. M.N.R., [1994] T.C.J. No. 47 - Archambault T.C.J. heard an appeal from a determination by the Minister that the appellant - a graduate student employed by Laval University on a research project - was not engaged in insurable employment because she was receiving university credit for the work. Judge Archambault held that the existence of an academic benefit did not prevent the existence of a contract of employment and at paragraph 14 of his judgment stated:"...Further, the fact that s. 3(1)(a) refers to employment " under any express or implied contract of service or apprenticeship, written or oral, whether the earnings of the employed person are received from the employer or some other person" indicates that Parliament clearly intended the idea of insurable employment to be as wide as possible for the purposes of the Act.""...Further, the fact that s. 3(1)(a) refers to employment \" under any express or implied contract of service or apprenticeship, written or oral, whether the earnings of the employed person are received from the employer or some other person\" indicates that Parliament clearly intended the idea of insurable employment to be as wide as possible for the purposes of the Act.\"'},
    ]
  }, {
    type: "question",
    name: "What is the definition of an employee?",
    id: next_id++,
    answers: [{
      title: "Employment Standards Act, 2000, SO 2000",
      text: "For the purposes of clause (c) of the definition of 'employee' in subsection (1), an individual receiving training from a person who is an employer is an employee of that person if the skill in which the individual is being trained is a skill used by the person's employees, unless all of the following conditions are met: 1. The training is similar to that which is given in a vocational school. 2. The training is for the benefit of the individual."
    }]
  }, {
    type: "question",
    name: "How does the TCC define an employee?",
    id: next_id++,
    answers: [{
      title: "Employee or Self-Employed? : Employee or Self-Employed? : Determining a worker's employment status in a province or territory other than Quebec : Step 2",
      text: "We ask the worker and the payer questions that will help us understand the working relationship and allow us to verify whether the intent of the parties is reflected in the facts. These questions relate to the following elements: the level of control the payer has over the worker's activities; whether the worker provides the tools and equipment; whether the worker can subcontract the work or hire assistants; the degree of financial risk the worker takes; the degree of responsibility for investment and management the worker holds; the worker's opportunity for profit; and. any other relevant factors, such as written contracts. We look at the answers separately for each element and then together. We consider whether they reflect the stated intention and we decide if the actual working conditions are more consistent with a contract of service or with a contract for services."
    }]
  }, {
    type: "question",
    name: "How is the level of control of an employer calculated?",
    id: next_id++,
    answers: [{
      title: "Employee or Self-Employed? : Employee or Self-Employed? : Determining a worker's employment status in the province of Quebec : Factors to consider : Relationship of subordination",
      text: "This factor helps distinguish the employer-employee relationship from a business relationship. The relationship of subordination is the capacity, the authority, or the right of a payer to exercise a control over the worker's activities and the manner in which the work is done. Degree of control or autonomy. Consider the degree of control held by the payer or the degree of autonomy held by the worker. The actual degree of control will vary with the type of work and the skills of the worker. Determining the degree of control can be difficult when examining the employment of professionals such as engineers, doctors, and IT consultants. Because of their expertise and specialized training, they may require little or no specific direction in their daily activities. When examining the factor of control, it is necessary to focus on both the payer's control over the worker's daily activities, and the payer's influence over the worker. Payer's right to exercise control. It is the right of the payer to exercise control that is relevant, not whether the payer actually exercises this right. It is the control of a payer over a worker that is relevant, and not the control of a payer over the end result of a product or service that he or she has purchased. Indicators showing that the worker is an employee. The payer directs and controls many elements of how the work is performed (such as what, who, where, when, and how). The payer controls the worker's absences, such as sick leave or vacation leave. The payer controls the worker with respect to the results of the work and the method used to do the work. The payer creates the work schedule and establishes the worker's rules of conduct. The worker has to perform the work personally. The worker has to remit activity reports to the payer. The worker's activities are reserved to a single payer (exclusivity of services). The payer can impose disciplinary actions on a worker. The worker receives training or direction from the payer on how to perform the work. The worker accepts integration in the payer's business to have the latter benefit from his work. The parties have inserted a non-competition clause in their written contract. Indicators showing that the worker is a self-employed individual. The worker is usually free to work when and for whom he or she chooses and may provide his or her services to different payers at the same time. The worker does not have to perform the services personally. He or she can hire another party to either complete the work or help complete the work. The worker can generally choose the time and the manner the work will be performed. The worker does not need to be at the payer's premises. The worker can accept or refuse work from the payer. The working relationship between the payer and the worker does not present a degree of continuity, loyalty, security, subordination, or integration, all of which are generally associated with an employer-employee relationship."
    }]
  }]
}, {
  type: "folder",
  name: "Tercon",
  id: 5,
  children: [{
    type: "question",
    name: "What were the compliancy issues with Brentwood's bid in 2006?",
    id: 2,
    answers: [{
      title: "CanLII - 2010 SCC 4 (CanLII) : Tercon Contractors Ltd. v. British Columbia (Transportation and Highways), [2010] 1 SCR 69, 2010 SCC 4 (CanLII) : Decisions cited",
      text: "Analysis. A. Was the Brentwood Bid Ineligible? [14] The first issue is whether the Brentwood bid was from an eligible bidder. The judge found that the bid was in substance, although not in form, from a joint venture of Brentwood and EAC and that it was, therefore, an ineligible bid. The Province attacks this finding on three grounds: (i) a joint venture is not a legal person and therefore the Province could not and did not contract with a joint venture; (ii) it did not award the contract to EAC and EAC had no contractual responsibility to the Province for failure to perform the contract; (iii) there was no term of the RFP that restricted the right of proponents to enter into joint venture agreements with others; this arrangement merely left Brentwood, the original proponent, in place and allowed it to"
    }, {
      title: "Other Answer",
      text: "This provides some more information that may or may not be useful."
    }]
  }, {
    type: "question",
    name: "Why did the judge decide that the Tercon contract was breached?",
    id: 3,
    answers: [{
      title: "CanLII - 2010 SCC 4 (CanLII) : Tercon Contractors Ltd. v. British Columbia (Transportation and Highways), [2010] 1 SCR 69, 2010 SCC 4 (CanLII) : Decisions cite",
      text: "In my view, it is the Province's position that better deserves that description. It had a bid which it knew to be on behalf of a joint venture, encouraged the bid to proceed and took steps to obfuscate the reality that it was on behalf of a joint venture. Permitting the bid to proceed in this way gave the joint venture a competitive advantage in the bidding process, and the record could not be clearer that the joint venture nature of the bid was one of its attractions during the selection process. The Province nonetheless submits that so long as only the name of Brentwood appears on the bid and ultimate Contract B, all is well."
    }]
  }]
}, {
  type: "folder",
  name: "Alfred vs Manning",
  id: 7,
  children: []
}, {
  type: "folder",
  name: "Ontario vs Landscaping Ltd",
  id: 8,
  children: []
}];

var root_folder = {
  type: "folder",
  id: 0,  
  name: "My Cases",
  children: cases
}

var current_contents = cases;
var current_path = [{id: 0, name: "My Cases"}];

var cases_container = $('#saved-cases'),
    path_div = $("#path");

var get_name_width = function(name) {
  var base_width = name.width("18px helvetica neue");
  return (name === root_folder.name.toUpperCase()) ? base_width + 10 : base_width + 40; 
}

var gen_path_part = function(index, path_part) {
  var name = path_part.name;
  var id = path_part.id;

  return ('<span class="path-part">' +
            (index == 0 ? '' : '<span class="separator">&gt;</span>') +
            '<span class="name" onclick="go_up_to_folder(' + id + ')">' + name + '</span>' +
          '</span>')
};

var show_path = function(path) {
  path_div.empty();

  for (var i = 0; i < path.length; i++) {
    path_div.append(gen_path_part(i, path[i]));
  }
};

var find_folder = function(id, context) {
  if (id == 0)
    return root_folder;

  var found_folders = [];
  for (var i = 0; i < context.length; i++) {
    var item = context[i];
    if (item.id === id)
      return item;

    if (item.type === 'folder')
      found_folders.push(item);
  }

  for (var i = 0; i < found_folders.length; i++) {
    var result = find_folder(id, found_folders[i].children);
    if (result)
      return result;
  }

  return null;
}

var enter_folder = function(id) {
  var folder = find_folder(id, cases);
  current_contents = folder.children;
  show_cases(current_contents);

  current_path.push({name: folder.name, id: folder.id});
  show_path(current_path);
};

var go_up_to_folder = function(id) {
  var new_path = [];

  var i;
  for (i = 0; i < current_path.length; i++) {
    if (current_path[i].id === id)
      break;

    new_path.push(current_path[i]);
  }

  current_path = new_path;
  enter_folder(id);
}

var create_new_folder = function(name) {
  current_contents.unshift({id: next_id++, name: name, type: "folder", children: []});
  show_cases(current_contents)
}

var show_cases = function(cases) {
  cases_container.empty();

  for(var i = 0; i < cases.length; i++) {
    var generated_case = $(gen_case(i, cases[i]));
    cases_container.append(generated_case);

    var highlights = store.get('highlights');
    var textContent = generated_case.find('.result-answer');
    if (highlights && textContent.length > 0) {

      for (var j = 0; j < highlights.length; j++) {
          if (highlights[j] === "")
              continue;

          for (var k = 0; k < textContent.length; k++) {
            var startOffset = textContent[k].innerHTML.indexOf(highlights[j]);
            if (startOffset !== -1) {
              // var strongAmount = textContent[j].innerHTML.split("<strong>").length - 1;
              var endOffset = startOffset + highlights[j].length  //+ strongAmount * ("<strong>".length + "</strong>".length);
              highlightSelection(textContent[k].childNodes[0], startOffset, endOffset);
            }
          }
        }
    }

    var acl = $('#acl' + i);
    acl.clickover({
      html: true,
      global_close: true,
      esc_close: true,
      placement: 'right',
      content: get_acl_content(i),
      onShown: function() {setClickoverHandlers($(this)[0]['$element'][0]['id'].replace( /^\D+/g, ''))}
    });
  }
};

var gen_case = function(i, case_to_gen) {
  if (cache[case_to_gen.id])
      return cache[case_to_gen.id];

  var result = "";
  if (case_to_gen.type == 'folder')
    result = ('<div class="row folder" id="case-' + case_to_gen.id + '">' +
          '<div class="col-lg-2"></div>' +
          '<div class="col-lg-8 case">' +
          '<div class="folder_icon"><i class="fa fa-folder"></i></div>' +
          '<a href="#" onclick="enter_folder(' + case_to_gen.id + ')">' + case_to_gen.name + '</a>' +
          '<a href="#" id="acl' + i + '" rel="clickover" class="acl" data-original-title="" title=""><i class="fa fa-users fa-lg"></i></a>' +
        '</div></div>');
  else {
    var collapse_div_id = "collapse" + i;
    result = '<div class="row" id="case-' + case_to_gen.id + '">' +
          '<div class="col-lg-2"></div>' +
          '<div class="col-lg-8">' +
               '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
              '<h4 class="panel-title">' +
                '<a data-toggle="collapse" data-target="#' + collapse_div_id + '" class="saved-q">' + case_to_gen.name + '</a></h4>' +
            '</div>' +
            '<div id="' + collapse_div_id + '" class="panel-collapse collapse">' +
              '<div class="panel-body">' +
                gen_answers(case_to_gen) +
              '</div>' +
            '</div>' + 
        '</div>' + 
        '</div>' + 
      '</div>';
  }

  return result;
};

var keywords_str = 'employee employees employer player players wage contract contractors wages pay paid overtime vacation league standard';
var keywords = str_to_obj_of_words(keywords_str);
var gen_answers = function(case_to_gen) {
  result = "";
  var answers = case_to_gen.answers;
  for (var i = 0; i < answers.length; i++) {
    if (i > 0) {
      result += "<div class='result'>";
    }
    if (answers[i].section) {
      result += '<h4>' + answers[i].section + '</h4>';
    }
    if (answers[i].title) {
      result += '<div class="result-title"><a href="' + answers[i].url + '">' + answers[i].title + '</a></div>';
    }
    if (answers[i].question) {
      result += '<div class="result-answer">' + answers[i].text + '</div>';
    } else {
      result += '<div class="result-answer">' + answers[i].text + '</div>';
    }
    if (i > 0) {
      result += "</div>";
    }
  }
  return result;
};

window.onload = function() {
  show_cases(current_contents);
  show_path(current_path);

  var new_folder_btn = $('#new-folder');
  new_folder_btn.clickover({
    html: true,
    global_close: true,
    esc_close: true,
    placement: 'right',
    content: "<form id='new_folder_form'>" +
                "<input id='new_folder_name_input' type='text' autofocus='autofocus' placeholder='New Case Name'>" +
              "</form>",
    onShown: function() {
      $("#new_folder_form").submit(function(event) {
        event.preventDefault();

        var new_folder_name = $("#new_folder_name_input").val();
        create_new_folder(new_folder_name);

        $(".popover").fadeOut(200, function() {
          new_folder_btn.removeAttr('data-clickover-open');
          new_folder_btn.removeAttr('aria-describedby');
          $(".popover").remove();
        });
      });
    }
  });
};

String.prototype.width = function(font) {
  var f = font || '12px arial',
      o = $('<div>' + this + '</div>')
            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
            .appendTo($('body')),
      w = o.width();

  o.remove();

  return w;
}

