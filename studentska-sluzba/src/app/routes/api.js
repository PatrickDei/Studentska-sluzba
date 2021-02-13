let mongo = require('mongodb').MongoClient;

module.exports = function (express, pool, db) {
  let ObjectId = require('mongodb').ObjectId;
  const router = express.Router();

  router.get('/', function (req, res) {
    console.log('Welcome to the api!');
  });

  // /api/posts ruta
  router.route('/posts').get(async function (req, res) {
    try{
      let rows = await db.collection('posts').find({}).toArray();
      res.json({status: 'OK', posts: rows});
    }catch(e) {
      console.log(e);
      return res.json({code: 100, status: 'Error with query'});
    }
  }).post(async function (req, res) {
    try{
      let data = await db.collection('posts').insertOne(req.body.p);
      res.json({status: 'OK', insertId: data.insertedId});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  }).put(async function (req, res) {
    try{
      let data = await db.collection('posts').updateOne({
        _id: ObjectId(req.body.p.id)
      }, {
        $set : req.body.p
      });
      res.json({status: 'OK', changes: data.nModified});
    }catch(e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  });


  router.route('posts/:id').delete(async function (req, res) {
    try{
      let data = await db.collection('posts').removeOne({
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
