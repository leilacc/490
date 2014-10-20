exports = module.exports = function(express, app){
  var path = require('path');
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('css', path.join(__dirname, 'public/css'));
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public')));

  var bodyParser = require('body-parser')
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/search', function (req, res) {
    res.render('search');
  });

  app.get('/report', function (req, res) {
    res.render('report');
  });
}
