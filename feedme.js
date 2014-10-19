//1
var http = require('http'),
    express = require('express'),
    path = require('path');
 
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('css', path.join(__dirname, 'css'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public'))); // use html files in test subdir

// Routing
app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function (req, res) { //login
  // TODO: check login
  // req.email
  // req.password
  res.redirect('/order');
});

app.get('/order', function (req, res) {
  res.render('order');
});

app.post('/order', function (req, res) {
  //res.render('choose');
});

app.get('/logout', function (req, res) {
  // TODO: logout
  res.redirect('/');
});

// 404
app.use(function (req,res) { //1
    res.render('404', {url:req.url}); //2
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
