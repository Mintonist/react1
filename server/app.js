const express = require('express');
const chalk = require('chalk');
const path = require('path');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose');
const initDatabase = require('./startup/initDatabase.js');
const routes = require('./routes');

const PORT = config.get('port') ?? 8080;
const app = express();

//app.set('view engine', 'ejs');
//app.set('views', 'pages');

app.use(express.json());
app.use(cors());
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, 'build')));
  const indexPath = path.resolve(__dirname, 'build', 'index.html');
  app.get('*', async (req, res) => {
    res.sendFile(indexPath);
  });
}

app.use(
  express.urlencoded({
    extended: false,
  })
);

// app.get('/', async (req, res) => {
//   res.render('index', {
//     title: 'Express App',
//     // notes: await getNotes(),
//     created: false,
//   });
// });

// app.post('/', async (req, res) => {
//   await addNote(req.body.title);
//   res.render('index', {
//     title: 'Express App',
//     notes: await getNotes(),
//     created: true,
//   });
// });

// app.put('/:id', async (req, res) => {
//   console.log('PUT', req.params.id, req.body.title);
//   await editNote(req.params.id, req.body.title);
//   res.render('index', {
//     title: 'Express App',
//     // notes: await getNotes(),
//     created: false,
//   });
// });

// app.delete('/:id', async (req, res) => {
//   await removeNote(req.params.id);
//   res.render('index', {
//     title: 'Express App',
//     // notes: await getNotes(),
//     created: false,
//   });
// });

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });

    await mongoose.connect(config.get('mongoUrl'));
    console.log(chalk.yellow(`MongoDB connected!`));
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}. ENV_MODE = ${process.env.NODE_ENV}`));
  });
}

start();
