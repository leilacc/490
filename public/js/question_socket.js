socket = io('http://localhost:3000');

socket.on("new answers", function (answers) {
  var results = $('#results');
  for(i = 0; i < answers.length; i++) { 
    results.append(gen_result('title', answers[i].text));
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

  socket.emit("ask question", { "question": question });
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
