let mongo = require('mongodb').MongoClient;

module.exports = function (express, pool, db) {
  let ObjectId = require('mongodb').ObjectId;
  const router = express.Router();

  router.get('/', function (req, res) {
    console.log('Welcome to the api!');
  });

// /curriculum/courses ruta
  router.route('/courses').get(async function (req, res) {
    try{
      let rows = await db.collection('courses').find({}).toArray();
      res.json({status: 'OK', courses: rows});
    }catch(e) {
      console.log(e);
      return res.json({code: 100, status: 'Error with query'});
    }
  }).post(async function (req, res) {
    try{
      let data = await db.collection('courses').insertOne(req.body.c);
      res.json({status: 'OK', insertId: data.insertedId});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  }).put(async function (req, res) {
    try{
      let data = await db.collection('courses').updateOne({
        _id: ObjectId(req.body.c.id)
      }, {
        $set : req.body.c
      });
      res.json({status: 'OK', changes: data.nModified});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  });

  router.route('courses/:id').delete(async function (req, res) {
    try{
      let data = await db.collection('courses').removeOne({
        _id: ObjectId(req.params.id)
      });
      res.json({status: 'OK', changes: data});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  });



// /curriculum/classes ruta
  router.route('/classes').get(async function (req, res) {
    try{
      let rows = await db.collection('classes').find({}).toArray();
      res.json({status: 'OK', classes: rows});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  }).post(async function (req, res) {
    try{
      await db.collection('classes').insertOne(req.body.c);
      res.json({status: 'OK', text: 'Predmet dodan'});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }}
  ).put(async function (req, res) {
    try{
      let data = await db.collection('classes').updateOne({
        _id: ObjectId(req.body.c.id)
      }, {
        $set : req.body.c
      });
      res.json({status: 'OK', changes: data.nModified});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  });

  router.route('classes/:id').delete(async function (req, res) {
    try{
      let data = await db.collection('classes').removeOne({
        _id: ObjectId(req.params.id)
      });
      res.json({status: 'OK', changes: data});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  });

  return router;
};
