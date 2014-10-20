var socket = io('http://localhost:3000'),
  results = $('#results');

socket.on("new answers", function (qa) {
  var question = qa[question];
  var answers = qa[answers];
  for(i = 0; i < answers.length; i++) { 
    results.append(gen_result(answers[i].evidence.title, answers[i].text));
  }
});

socket.on("error", function(error) {
    console.log("AN ERROR OCCURRED: " + error);
});

var search = function() {
  var question = $("input[name=question]")[0].value;
  if (question.length == 0) {
      return;
  }

  socket.emit("ask question", question);
  results.empty();
}

var gen_result = function(title, answer) {
  return ('<div class="result">' + 
            '<span class="result-thumb-tack">' + 
              '<a href="">' + 
                '<i class="fa fa-thumb-tack fa-lg"></i>' +
              '</a>' + 
            '</span>' +
            '<div class="result-title">' +
              '<a href="">' +
                title + 
              '</a>' + 
            '</div>' +
            '<div class="result-answer">' +
              answer +
            '</div>' + 
          '</div>'
         );
}
