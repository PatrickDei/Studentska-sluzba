let mongo = require('mongodb').MongoClient;

module.exports = function (express, pool, db) {
  let ObjectId = require('mongodb').ObjectId;
  const router = express.Router();

  router.get('/', function (req, res) {
    console.log('Welcome to the api!');
  });

// ruta za jednog studenta
  router.route('/students/:id').get(async function (req, res) {
    try{
      let row = await db.collection('students').find({
        _id: ObjectId(req.params.id)
      }).toArray();
      console.log(row);
      res.json({status: 'OK', student: row});
    }catch(e) {
      console.log(e);
      return res.json({code: 100, status: 'Error with query'});
    }
  });

  // /api/students ruta
  router.route('/students').get(async function (req, res) {
    try{
      let rows = await db.collection('students').find({}).toArray();
      res.json({status: 'OK', students: rows});
    }catch(e) {
      console.log(e);
      return res.json({code: 100, status: 'Error with query'});
    }
  }).post(async function (req, res) {
    try{
      let data = await db.collection('students').insertOne(req.body.s);
      res.json({status: 'OK', insertId: data.insertedId});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  }).put(async function (req, res) {
    try{
      console.log(req.body.s);
      let data = await db.collection('students').updateOne({
        _id: ObjectId(req.body.s.id)
      }, {
        $set : req.body.s
      });
      res.json({status: 'OK', changes: data.nModified});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  });

  router.route('/students/:id').delete(async function (req, res) {
    try{
      let data = await db.collection('students').removeOne({
        _id: ObjectId(req.params.id)
      });
      res.json({status: 'OK', changes: data});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  });




  // /api/users ruta
  router.route('/users').get(async function (req, res) {
    try{
      let rows = await db.collection('users').find({}).toArray();
      res.json({status: 'OK', users: rows});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  }).post(async function (req, res) {
    try{
      await db.collection('users').insertOne(req.body.u);
      res.json({status: 'OK', text: 'User dodan'});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }}
  );

  return router;
};
