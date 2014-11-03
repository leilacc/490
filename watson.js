var request = require('request');

var API = "https://watson-wdc01.ihost.com";

var params = {
    auth: {
        user: "ut_student1",
        pass: "Q72lSnoC"
    },
    json: true
};

var requestURL = function(appended) {
    return API + appended;
}

var ask = function(question, callback) {
    params.url = requestURL("/instance/507/deepqa/v1/question");
    params.body = {
        question: {
            questionText: question,
            evidenceRequest: { items: 1, profile: "YES" }
        }
    }

    request.post(params, function(error, request, body) {
        callback(error, body);
    });
}

var askAgainAfterDelay = function(body, delay, callback) {
    setTimeout(function() {
        params.url = requestURL(body.question.links.self);
        params.body = undefined;

        request(params, function(error, response, body) {
            callback(error, body);
        });
    }, delay);
}

var askAndPoll = function(question, numTimes, delay, callback) {
    ask(question, function(error, body) {
        if (error) {
            callback(error, body);
            return;
        }

        var done = false;
        for (var i = 0; !done && i < numTimes; i++) {
            askAgainAfterDelay(body, i * delay, function(error, body) {
                var status = body.question.status;
                done = (status != "Queued");
                
                if (["Timeout", "Failed"].indexOf(status) != -1) {
                    error = "Could not get answer to question.";
                }

                callback(error, body);
            });
        }
    });
}

module.exports.ask = ask;
module.exports.askAndPoll = askAndPoll;
