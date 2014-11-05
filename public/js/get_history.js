var results = $('#results');

var format_history_result = function(result) {
  var question = result.name;
  var updatedAt = new Date(result.updatedAt);

  var scrubbed = question;
  scrubbed.replace('"', "&quot;");

  return ('<div class="row">' +
            '<div class="col-lg-2">' +
            '</div>' +
            '<div class="col-lg-8">' +
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
  for (var i = 0; i < data.length; i++) {
    var result = data[i];
    results.append(format_history_result(result));
  }
});
