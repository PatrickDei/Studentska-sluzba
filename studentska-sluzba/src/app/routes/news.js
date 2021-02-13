let mongo = require('mongodb').MongoClient;

module.exports = function (express, pool, db) {
  let ObjectId = require('mongodb').ObjectId;
  const router = express.Router();

// /news ruta
  router.route('/').get(async function (req, res) {
    try {
      let rows = await db.collection('news').find({}).toArray();
      res.json({status: 'OK', news: rows});
    } catch (e) {
      console.log(e);
      return res.json({code: 100, status: 'Error with query'});
    }
  }).post(async function (req, res) {
    try {
      let data = await db.collection('news').insertOne(req.body.n);
      res.json({status: 'OK', insertId: data.insertedId});
    } catch (e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  }).put(async function (req, res) {
    try {
      let data = await db.collection('news').updateOne({
        _id: ObjectId(req.body.n.id)
      }, {
        $set: req.body.n
      });
      res.json({status: 'OK', changes: data.nModified});
    } catch (e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  });

  router.route('/:id').delete(async function (req, res) {
    try {
      let data = await db.collection('news').removeOne({
        _id: req.params.id
      });
      res.json({status: 'OK', changes: data});
    } catch (e) {
      console.log(e);
      res.json({code: 100, status: 'Error with query'});
    }
  });

  return router;
}
