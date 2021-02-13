let express = require('express');
let app = express();
let mongo = require('mongodb').MongoClient;
let config = require('./config');
let path = require('path');
let bodyparser = require('body-parser');
let morgan = require('morgan');

let init = async () =>{
  try{
    await mongo.connect(config.pool, (err, client) => {
      let database = client.db('studentskaSluzba');
      initServer(database);
    });

  }catch (e){
    console.error('Problem connecting to database');
    console.log(e);
  }
}


let initServer = async (db) => {
  app.use(bodyparser.urlencoded({extended: true}));
  app.use(bodyparser.json());

  app.use(express.static(__dirname + '/public/app'));

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
  });

  app.use(morgan('dev'));

  const apiRouter = require('./app/routes/api')(express, config.pool, db);
  const curriculumRouter = require('./app/routes/curriculum')(express, config.pool, db);
  const newsRouter = require('./app/routes/news')(express, config.pool, db);

  apiRouter.use((req, res, next) => {
    console.log('Zahtjev na: ' + req.url);
    next();
  });

  app.use('/api', apiRouter);
  app.use('/curriculum', curriculumRouter);
  app.use('/news', newsRouter);

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
  })

  app.listen(config.port);
  console.log('Server running on port: ' + config.port)
};

init();
