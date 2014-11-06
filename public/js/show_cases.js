cases_container = $('#saved-cases');
var show_folders = function(folders) {
  for(var i = 0; i < folders.length; i++) {
    cases_container.append(gen_folder(i, folders[i]));

  }
};

var gen_folder = function(i, folder) {
  folder_html = "";
};

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
