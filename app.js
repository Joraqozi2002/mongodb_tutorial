const express = require("express")
const { ObjectId } = require("mongodb")
const { getDb, connectToDb } = require("./db")
const app = express()
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static("UI"));
let db
connectToDb((err) => {
  if (!err) {
    app.listen(3002, () => {
      console.log("app listening 3002 PORT ...");
    })
    db = getDb()
  }
})


app.get("/books", (req, res) => {
  const page = req.query.page || 1
  const perPage = 2
  const books = []
  db.collection("books")
    .find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .forEach(book => {
      books.push(book)
    }).then(() => {
      res.status(200).send(books)
    }).catch((err) => {
      console.log(err);
      res.status(5000).send("Erorr DB")
    })
})
app.get("/books/:id", (req, res) => {
  db.collection("books").findOne({ _id: ObjectId(req.params.id) })
    .then((doc) => {
      res.status(200).send(doc)
    }).catch((err) => {
      console.log(err);
      res.status(5000).send("Erorr DB")
    })
})
app.post("/books", (req, res) => {
  db.collection("books")
    .insertOne(req.body)
    .then((result) => {
      res.status(201).send(result)
    })
    .catch((err) => {
      res.status(500).send("DB error")
    })
})

