var express = require('express');

var app = express();

//핸들바 뷰 엔진설정
var handlebars = require('express-handlebars').create({ defaultLayout:'main'});

//fortunes cookies
var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs",
  "Do not fear what you don't know",
  "You will have a pleasant surprise",
  "Whenever possible, keep it simple"
];

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//메인
app.get('/', function(req, res) {
  res.render('home');
  //res.type('text/plain');
  //res.send('Meadowlark Travel');
});

//about
app.get('/about', function(req, res) {
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortunes: randomFortune});
  //res.render('about');
  //res.type('text/plain');
  //res.send('About Meadowlark Travel');
});

//about
app.get('/about/contact', function(req, res) {
  res.type('text/plain');
  res.send('About Contact eadowlark Travel');
});

//커스텀 404페이지
app.use(function(req, res) {
  console.error('404');
  res.status(404);
  res.render('404');
  //res.type('text/plain');
  //res.status(404);
  //res.send('404', 'Not Found');
});

//커스텀 500페이지
app.use(function(req, res, next) {
  console.error(err.stack);
  //res.type('text/plain');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
})
