const { MongoClient } = require("mongodb")
let dbConnection

const uri = "mongodb+srv://joraqozi:magicsoft7478@cluster0.sukgcli.mongodb.net/?retryWrites=true&w=majority"
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db()
        return cb()
      }).catch((err) => {
        console.log(err);
        cb(err)
      })
  },
  getDb: () => dbConnection
}