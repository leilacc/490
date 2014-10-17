var express = require('express');
var watson = require('./watson.js');
var app = express();

var print = console.log;

app.get('/ask', function (req, res) {
    question = req.query.question;

    watson.askAndPoll(req.query.question, 20, 2000, function(error, watsonResponse) {
        if (error) {
            res.status(500).send({error: "Watson blew up"});
            return;
        }

        print(watsonResponse.question);
    });
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('listening at http://%s:%s', host, port);
});

/*
(def answer-body (j/read-str (:body get-result)))

(def answer-question (get answer-body "question"))
(keys answer-question)

(def evidence (get answer-question "evidenceRequest"))
(prn evidence)
(def answers (get answer-question "answers"))
(prn answers)
(get answer-question "items")
(get answer-question "pipelineid")
*/
