const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;
console.log(port);
// templates
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('headerText', text => {
  console.log(text, typeof text);
  return text.toUpperCase();
});

// middleware
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  // reloads for every page
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`; // method - get
  fs.appendFile('server.log', `${log}\n`, err => {
    console.log(err);
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs'); // no routes will work
// });

// only needed express,app and app.use for creating a back end
let greeting = 'good';
app.get('/', (req, res) => {
  // res.send('<h1>Home</h1>');
  res.render('home.hbs', {
    greeting: greeting + ' ' + (new Date().getHours > 12 ? 'evening' : 'morning'),
    pageTitle: 'Home Page'
  });
});

app.get('/About', (req, res) => {
  // res.send({
  //   // content type automatically sets to json
  //   name: 'afsal',
  //   age: 23
  // });
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'the page is not found'
  });
});

app.listen(port, (port) => {
  console.log(`server runnning on ${port}`);
});