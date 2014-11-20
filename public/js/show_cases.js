var next_id = 10;

var cases = [{
  type: "folder",
  name: "Players vs CHL",
  id: 1,
  children: [{
    type: "question",
    name: "How likely is the court to define CHL players as employees of the League?",
    id: next_id++,
    answers: [{
      title: "Outcome",
      text: "It is approximately 74% likely that the court will define CHL players as employees.<br><br>"
    }, {
      title: "Evidence",
      text: "<h4>McCrimmon Holdings Ltd. v. M.N.R., 2000 CanLII 460 (TCC)</h4>" +
      "The payment for playing hockey is modest but all their expenses are covered, including room and board. However, the requirement to play hockey is not inextricably bound to a condition of scholarship as may be the case with a university since attendance at a post-secondary educational institution was not mandatory for remaining on the roster. In the case of Charron v. M.N.R., [1994] T.C.J. No. 47 - Archambault T.C.J. heard an appeal from a determination by the Minister that the appellant - a graduate student employed by Laval University on a research project - was not engaged in insurable employment because she was receiving university credit for the work. Judge Archambault held that the existence of an academic benefit did not prevent the existence of a contract of employment and at paragraph 14 of his judgment stated:\"...Further, the fact that s. 3(1)(a) refers to employment \" under any express or implied contract of service or apprenticeship, written or oral, whether the earnings of the employed person are received from the employer or some other person\" indicates that Parliament clearly intended the idea of insurable employment to be as wide as possible for the purposes of the Act.\"<br>" +
      "<h4>671122 Ontario Ltd. v. Sagaz Industries Canada Inc., [2001] 2 SCR 983, 2001 SCC 59</h4>" +
      "There is no one conclusive test which can be universally applied to determine whether a person is an employee or an independent contractor.  What must always occur is a search for the total relationship of the parties.  The central question is whether the person who has been engaged to perform the services is performing them as a person in business on his own account.  In making this determination, the level of control the employer has over the worker’s activities will always be a factor.  However, other factors to consider include whether the worker provides his or her own equipment, whether the worker hires his or her own helpers, the degree of financial risk taken by the worker, the degree of responsibility for investment and management held by the worker, and the worker’s opportunity for profit in the performance of his or her tasks." +
      "<h4>1392644 Ontario Inc. (Connor Holmes) v. Canada (National Revenue), 2013 FCA 85</h4>" +
      "However, properly understood, the approach set out in Royal Winnipeg Ballet simply emphasises the well-know principle that persons are entitled to organize their affairs and relationships as they best deem fit. The relationship of parties who enter into a contract is generally governed by that contract. Thus the parties may set out in a contract their respective duties and responsibilities, the financial terms of the services provided, and a large variety of other matters governing their relationship. However, the legal effect that results from that relationship, i.e. the legal effect of the contract, as creating an employer-employee or an independent contactor relationship, is not a matter which the parties can simply stipulate in the contract. In other words, it is insufficient to simply state in a contract that the services are provided as an independent contractor to make it so."
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
  name: "Yana Davis",
  children: cases
}

var current_contents = cases;
var current_path = [{id: 0, name: "Yana Davis"}];

var cases_container = $('#saved-cases'),
  path_div = $("#path");

var get_name_width = function(name) {
  var base_width = name.width("18px helvetica neue");
  return (name === root_folder.name.toUpperCase()) ? base_width : base_width + 40; 
}

var gen_path_part = function(index, path_part) {
  var name = path_part.name.toUpperCase();
  var id = path_part.id;

  return ('<div class="path-part" style="width: ' + get_name_width(name) + 'px">' +
            (index == 0 ? '' : '<div class="separator">&gt;</div>') +
            '<div class="name" onclick="go_up_to_folder(' + id + ')">' + name + '</div>' +
          '</div>')
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
    cases_container.append(gen_case(i, cases[i]));

    var acl = $('#acl' + i);
    acl.clickover({
      html: true,
      global_close: true,
      esc_close: true,
      placement: 'bottom',
      content: get_acl_content(i),
      onShown: function() {setClickoverHandlers($(this)[0]['$element'][0]['id'].replace( /^\D+/g, ''))}
    });
  }
};

var gen_case = function(i, case_to_gen) {
  if (case_to_gen.type == 'folder')
    return ('<div class="row case folder panel">' +
      '<div class="folder_icon"></div>' +
      '<a href="#" onclick="enter_folder(' + case_to_gen.id + ')">' + case_to_gen.name + '</a>' +
      '<a href="#" id="acl' + i + '" rel="clickover" class="acl" data-original-title="" title=""><i class="fa fa-users fa-lg"></i></a>' +
    '</div>');

  var collapse_div_id = "collapse" + i;
  return '<div class="row case panel panel-default">' +
    // '<div class="icon question_icon"></div>' +
    '<div class="panel-heading">' +
      '<h4 class="panel-title">' +
        '<a data-toggle="collapse" data-target="#' + collapse_div_id + '" class="saved-q">' + case_to_gen.name + '</a></h4>' +
    '</div>' +
    '<div id="' + collapse_div_id + '" class="panel-collapse collapse">' +
      '<div class="panel-body">' +
        gen_answers(case_to_gen) +
      '</div>' +
    '</div>' + 
  '</div>';
};

var gen_answers = function(case_to_gen) {
  result = "";
  var answers = case_to_gen.answers;
  for (var i = 0; i < answers.length; i++) {
    result += '<div class="result-title"><a href="">' + answers[i].title + '</a></div>' +
      '<div class="result-answer">' + answers[i].text + '</div>';
  }
  return result;
};

            //   <div class="panel-body">
            //     <div class="result-title"><a href="">Landmark II Inc v 1535709 Ontario Limited</a></div>
            //     <div class="result-answer">
            //       The trial judge found that 1535709 had breached
            //       the contract by failing to pay and that Landmark
            //       was not obligated to continue its work without
            //       payment. The trial judge found that Landmark's
            //       work as of the date of abandonment was valued at
            //       $16,000 and, after deducting the amount of the
            //       first payment, she determined that 1535709 owed
            //       Landmark $1,287.50. 1535709's counterclaim was
            //     </div>
            //     <div class="result">
            //       <div class="result-title"><a href="">Landmark II Inc v 1535709 Ontario Limited</a></div>
            //       <div class="result-answer">
            //         The trial judge found that 1535709 had breached
            //         the contract by failing to pay and that Landmark
            //         was not obligated to continue its work without
            //         payment. The trial judge found that Landmark's
            //         work as of the date of abandonment was valued at
            //         $16,000 and, after deducting the amount of the
            //         first payment, she determined that 1535709 owed
            //         Landmark $1,287.50. 1535709's counterclaim was
            //         dismissed. On appeal, the Divisional Court upheld
            //       </div>
            //     </div>
            //   </div>
            // </div>

window.onload = function() {
  show_cases(current_contents);
  show_path(current_path);

  var new_folder_btn = $('#new-folder');
  new_folder_btn.clickover({
    html: true,
    global_close: true,
    esc_close: true,
    placement: 'bottom',
    content: "<form id='new_folder_form'>" +
                "<input id='new_folder_name_input' type='text' autofocus='autofocus' placeholder='New Folder Name'>" +
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

/*
        .row
          .col-lg-1
          .col-lg-1.new-folder
          .col-lg-8
            .panel.panel-default
              .panel-heading
                a(href='#' class='acl' id='acl0' rel='clickover')
                  i.fa.fa-users.fa-lg
                h4.panel-title Landmark vs 1535709 Ontario
              .panel-body
                div#accordion.panel-group
                  div#panel2.panel.panel-default
                    div.panel-heading
                      h4.panel-title
                        a(data-toggle='collapse',
                          data-target='#collapseFour', class='saved-q')
                          | Why did the judge decide that 1535709 breached its contract with Landmark?
                    div#collapseFour.panel-collapse.collapse
                      div.panel-body
                        .result-title
                          a(href='http://www.canlii.org/en/on/onca/doc/2011/2011onca567/2011onca567.html' target='blank')
                            | Landmark II Inc. v. 1535709 Ontario Limited, 2011 ONCA 567 (CanLII): Introduction
                        .result-answer
                          | The trial judge found that 1535709 had breached
                          | the contract by failing to pay and that Landmark
                          | was not obligated to continue its work without
                          | payment. The trial judge found that Landmark's
                          | work as of the date of abandonment was valued at
                          | $16,000 and, after deducting the amount of the
                          | first payment, she determined that 1535709 owed
                          | Landmark $1,287.50. 1535709's counterclaim was
                        .result
                          .result-title
                            a(href='http://www.canlii.org/en/on/onca/doc/2011/2011onca567/2011onca567.html' target='blank')
                              | Landmark II Inc. v. 1535709 Ontario Limited,
                              2011 ONCA 567 (CanLII): Analysis
                          .result-answer
                            | In this case, the Court found that Landmark had not indicated it was pursuing alternative remedies with the intention of making an election. Further, there was no obligation on the trial judge to provide an election. If Landmark was seeking damages for breach of contract as an alternative to its claim for quantum meruit, it was required to so elect. Without the election, Landmark was not entitled to damages for the breach of contract as an alternative to the trial judge's assessment of damages under the claim for quantum meruit.
                  div#panel1.panel.panel-default
                    div.panel-heading
                      h4.panel-title
                        a(data-toggle='collapse',
                          data-target='#collapseThree', class='saved-q')
                          | What was the result of Landmark vs 1535709 Ontario?
                    div#collapseThree.panel-collapse.collapse
                      div.panel-body
                        .result-title
                          a(href='')
                            | Landmark II Inc v 1535709 Ontario Limited
                        .result-answer
                          | The trial judge found that 1535709 had breached
                          | the contract by failing to pay and that Landmark
                          | was not obligated to continue its work without
                          | payment. The trial judge found that Landmark's
                          | work as of the date of abandonment was valued at
                          | $16,000 and, after deducting the amount of the
                          | first payment, she determined that 1535709 owed
                          | Landmark $1,287.50. 1535709's counterclaim was
*/






/*
'<div class="row">'
  <div class="col-lg-1"></div>
  <div class="col-lg-1 new-folder"><a id="new-folder" href="" class="btn btn-primary"><i class="fa fa-plus fa-lg"></i>&nbsp;&nbsp;Folder</a></div>
  <div class="col-lg-8">
    <div class="panel panel-default">
      <div class="panel-heading"><a href="#" id="acl0" rel="clickover" class="acl"><i class="fa fa-users fa-lg"></i></a>
        <h4 class="panel-title">Tercon RFEI</h4>
      </div>
      <div class="panel-body">
        <div id="accordion" class="panel-group">
          <div id="panel1" class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title"><a data-toggle="collapse" data-target="#collapseOne" class="saved-q">What was the result of Landmark vs Ontario?</a></h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse">
              <div class="panel-body">
                <div class="result-title"><a href="">Landmark II Inc v 1535709 Ontario Limited</a></div>
                <div class="result-answer">
                  The trial judge found that 1535709 had breached
                  the contract by failing to pay and that Landmark
                  was not obligated to continue its work without
                  payment. The trial judge found that Landmark's
                  work as of the date of abandonment was valued at
                  $16,000 and, after deducting the amount of the
                  first payment, she determined that 1535709 owed
                  Landmark $1,287.50. 1535709's counterclaim was
                </div>
                <div class="result">
                  <div class="result-title"><a href="">Landmark II Inc v 1535709 Ontario Limited</a></div>
                  <div class="result-answer">
                    The trial judge found that 1535709 had breached
                    the contract by failing to pay and that Landmark
                    was not obligated to continue its work without
                    payment. The trial judge found that Landmark's
                    work as of the date of abandonment was valued at
                    $16,000 and, after deducting the amount of the
                    first payment, she determined that 1535709 owed
                    Landmark $1,287.50. 1535709's counterclaim was
                    dismissed. On appeal, the Divisional Court upheld
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="panel2" class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title"><a data-toggle="collapse" data-target="#collapse2" class="saved-q">Why did the judge decide that the contract was breached?</a></h4>
            </div>
            <div id="collapse2" class="panel-collapse collapse">
              <div class="panel-body">
                <div class="result-title"><a href="">Landmark II Inc v 1535709 Ontario Limited</a></div>
                <div class="result-answer">
                  The trial judge found that 1535709 had breached
                  the contract by failing to pay and that Landmark
                  was not obligated to continue its work without
                  payment. The trial judge found that Landmark's
                  work as of the date of abandonment was valued at
                  $16,000 and, after deducting the amount of the
                  first payment, she determined that 1535709 owed
                  Landmark $1,287.50. 1535709's counterclaim was
                </div>
                <div class="result">
                  <div class="result-title"><a href="">Landmark II Inc v 1535709 Ontario Limited</a></div>
                  <div class="result-answer">
                    The trial judge found that 1535709 had breached
                    the contract by failing to pay and that Landmark
                    was not obligated to continue its work without
                    payment. The trial judge found that Landmark's
                    work as of the date of abandonment was valued at
                    $16,000 and, after deducting the amount of the
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
*/
