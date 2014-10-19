var request = require('request');

var API = "https://watson-wdc01.ihost.com";

var params = {
    auth: {
        user: "ut_approver",
        pass: "QiNy9MCE"
    },
    json: true
};

var requestURL = function(appended) {
    return API + appended;
}

var ask = function(question, callback) {
    params.url = requestURL("/instance/507/deepqa/v1/question");
    params.body = { question: { questionText: "What is a strike?" } }

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

/*
(def result (c/post (str api "instance/507/deepqa/v1/question")
                    {:basic-auth ["ut_approver" "QiNy9MCE"]
                     :body "{\"question\" : { \"questionText\" : \"What is a strike?\" } }"
                     :content-type :json
                     :socket-timeout 30000
                     :conn-timeout 30000
                     :accept :json}))

(def body (j/read-str (:body result)))
(def data (get body "question"))

(def get-more-data-request (get-in data ["links" "self"]))

(def get-result (c/get (str api get-more-data-request)
                   {:basic-auth ["ut_approver" "QiNy9MCE"]
                    :content-type :json
                    :socket-timeout 30000
                    :conn-timeout 30000
                    :accept :json}))
(get answer-question "synonymList")
*/
