var results = $('#results');
var lastDate;

var format_history_result = function(result) {
  var question = result.name;
  var updatedAt = new Date(result.updatedAt);
  if (updatedAt.getDate() < lastDate.getDate()) {
    lastDate = updatedAt;
    add_date_header();
  }

  var index = result.index;

  var scrubbed = question;
  scrubbed = scrubbed.replace('"', "&quot;").split(' ').join("+");
  var minutes = updatedAt.getMinutes().toString();
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }

  return ('<div class="row">' +
            '<div class="col-md-2">' +
              '<p style="margin-left: 20px; margin-top: 18px; font-size: 20px">' + (updatedAt.getHours() % 12) + ':' + minutes + ' PM</p>' +
            '</div>' +
            '<div class="col-md-8">' +
              '<div class="result">' +
                '<div class="result-title">' +
                  '<a href="/search?' + scrubbed + '">' +
                    question +
                  '</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>'
         );
}

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November',
              'December'];
function add_date_header() {
  var day = days[lastDate.getDay()];
  var month = months[lastDate.getMonth()];
  var date_header = '<div class="row"><h3 class="date-header">' +
    day + ' ' + month + ' ' + lastDate.getDate() +
    '</h3></div>';
  results.append(date_header);
}

$.post("/history", function(data) {
  // spacing
  results.append('<div class="row" style="margin-top:-60px"></div>');

  if (data.length == 0) {
    results.append('<div class="row">You haven\'t asked any questions yet!</div>');
    return
  }

  lastDate = new Date(data[0].updatedAt);
  add_date_header();
  for (var i = 0; i < data.length; i++) {
    var result = data[i];
    result.index = i + 1;
    results.append(format_history_result(result));
  }
});
