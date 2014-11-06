var results = $('#results');
var time = "3:14 PM";

var format_history_result = function(result) {
  var question = result.name;
  var updatedAt = new Date(result.updatedAt);

  var index = result.index;

  var scrubbed = question;
  scrubbed = scrubbed.replace('"', "&quot;").replace(' ', "+");
  var minutes = updatedAt.getMinutes().toString();
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }

  return ('<div class="row">' +
            '<div class="col-md-2">' +
              '<p style="margin-left: 90px; margin-top: 18px; font-size: 20px">' + (updatedAt.getHours() % 12) + ':' + minutes + ' PM</p>' +
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

$.post("/history", function(data) {
  results.append('<div class="row"><p style="font-size: 30px; margin-top: -40px; text-align: center;" >NOVEMBER 6</p></div>');
  for (var i = 0; i < data.length; i++) {
    var result = data[i];
    result.index = i + 1;
    results.append(format_history_result(result));
  }
});
