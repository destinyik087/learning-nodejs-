const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
 const app = express();

app. set('view engine', 'pug');
app.set('views', './views'); //default

 app.use(express.json());
app.use(express.urlencoded({ extended: true})); 
app.use(express.static('public'));
app.use(helmet());

// configuration
console.log('Application name: ' + config.get('name'));
console.log('mail server: ' + config.get('mail.host'));
// console.log('mail password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
app.use (morgan('tiny'));
console.log('morgan enabled...');
}
app.use(morgan('tiny'));

app.use(logger);

  const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
  ];

  app.get('/', (req, res) => {
    res.render('index', { tittle: 'My Express App', mssage: 'Hello'});
});

app.get('/name', (req, res) => {
  res.send('my name is destiny');
})
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/course', (req, res) => {
  const { error } = validatecocurse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

    const course = {
   id: courses.length + 1,
   name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the ID was not found');

  const { error} = validatecocurse(req.body);
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

course.name = req.body.name;
res.send(course);
});

function validatecocurse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('the course with thte id was');
    res.send(course);
});

// app.get('api/posts/:year/:month', (req, res) => {
//     res.send(req.params.year);
// });

const port =  process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));


app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the ID was not found');

const index = courses.indexOf(course);
courses.splice(index, 1);

req.send(course);
})