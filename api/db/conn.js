const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: () => {
    client.connect((err, db) => {
	_db = db.db("gym");
	console.log("Successfully connected to MongoDB."); 
    });
  },
 
  getDb: function () {
    return _db;
  },
};
