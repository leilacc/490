socket = io('http://localhost:3000');

socket.on("new answers", function (answers) {
    console.log("receved new answers: " + answers[0].text);
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
