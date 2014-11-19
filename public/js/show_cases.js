var cases = [{
  type: "folder",
  name: "Tercon",
  id: 1,
  children: [{
    type: "question",
    name: "What were the compliancy issues with Brentwood's bid in 2006?",
    id: 2,
    answers: [{
      title: "CanLII - 2010 SCC 4 (CanLII) : Tercon Contractors Ltd. v. British Columbia (Transportation and Highways), [2010] 1 SCR 69, 2010 SCC 4 (CanLII) : Decisions cited",
      text: "Analysis. A. Was the Brentwood Bid Ineligible? [14] The first issue is whether the Brentwood bid was from an eligible bidder. The judge found that the bid was in substance, although not in form, from a joint venture of Brentwood and EAC and that it was, therefore, an ineligible bid. The Province attacks this finding on three grounds: (i) a joint venture is not a legal person and therefore the Province could not and did not contract with a joint venture; (ii) it did not award the contract to EAC and EAC had no contractual responsibility to the Province for failure to perform the contract; (iii) there was no term of the RFP that restricted the right of proponents to enter into joint venture agreements with others; this arrangement merely left Brentwood, the original proponent, in place and allowed it to"
    }]
  }, {
    type: "question",
    name: "Why did the judge decide that the Tercon contract was breached?",
    id: 3,
    answers: [{
      title: "CanLII - 2010 SCC 4 (CanLII) : Tercon Contractors Ltd. v. British Columbia (Transportation and Highways), [2010] 1 SCR 69, 2010 SCC 4 (CanLII) : Decisions cite",
      text: "In my view, it is the Province's position that better deserves that description. It had a bid which it knew to be on behalf of a joint venture, encouraged the bid to proceed and took steps to obfuscate the reality that it was on behalf of a joint venture. Permitting the bid to proceed in this way gave the joint venture a competitive advantage in the bidding process, and the record could not be clearer that the joint venture nature of the bid was one of its attractions during the selection process. The Province nonetheless submits that so long as only the name of Brentwood appears on the bid and ultimate Contract B, all is well."
    }]
  }, {
    type: "folder",
    name: "Other Stuff",
    id: 4, 
    children: []
  }] 
}, {
  type: "folder",
  name: "Some Other Folder",
  id: 5,
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
  return 18 * name.length;
};

var gen_path_part = function(index, path_part) {
  var name = path_part.name;
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

var show_cases = function(cases) {
  cases_container.empty();

  for(var i = 0; i < cases.length; i++) {
    cases_container.append(gen_case(i, cases[i]));
  }
};

var gen_case = function(i, case_to_gen) {
  return ('<div class="row" onclick="enter_folder( ' + case_to_gen.id + ')">' +
    case_to_gen.name +
  '</div>');
};

window.onload = function() {
  show_cases(current_contents);
  show_path(current_path);
};

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
