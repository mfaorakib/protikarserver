const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


const ObjectID = require('mongodb').ObjectID

const port = 4000


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ivvdq.mongodb.net/Protikar?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const ServiceCollection = client.db("Protikar").collection("services");
  const ReviewsCollection = client.db("Protikar").collection("reviews");
  const OrderInfoCollection = client.db("Protikar").collection("orderservices");
  const adminCollection =  client.db("Protikar").collection("adminlist");
  // perform actions on the collection object

 //Product add database from client end 
  app.post('/addService', (req, res) => {
    const newService = req.body;
   
    ServiceCollection.insertOne(newService)
      .then(result => {
       // console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)

      })

  })
 //Product show from database at client end 
  app.get('/Services', (req, res) => {
    ServiceCollection.find()
      .toArray((err, Services) => {
        res.send(Services)
       // console.log(Services)
      })
  })
  app.post('/addReview', (req, res) => {
    const newReview = req.body;
   
    ReviewsCollection.insertOne(newReview)
      .then(result => {
       // console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
        
      })

  })

  app.get('/Review', (req, res) => {
    ReviewsCollection.find()
      .toArray((err, Services) => {
        res.send(Services)
       // console.log(Services)
      })
  })
   //Product show from database at client end 

  app.get('/BuyServices/:id', (req, res) => {
    console.log(req.params.id)
    ServiceCollection.find({_id: ObjectID(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0])

      })
  })
  app.post('/addOrderInfo', (req, res) => {
    const newOrderInfo = req.body;
    
    OrderInfoCollection.insertOne(newOrderInfo)
      .then(result => {
       // console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
        
      })
  }) 
  app.get('/orderList', (req, res) => {
    OrderInfoCollection.find()
      .toArray((err, orderservices) => {
        res.send(orderservices)
       // console.log(Services)
      })
  })  
 // update single data 
  app.patch("/update/:id", (req, res) => {
    console.log(req.params.id)
    OrderInfoCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
       $set: { Status: req.body.Status}
      }
      

    )
      .then(result => {
        console.log(result)
        res.send(result.modifiedCount > 0)
      })
  })

  app.post('/addadmin', (req, res) => {
    console.log()
    const newAdmin = req.body;
   console.log(newAdmin)
    adminCollection.insertOne(newAdmin)
      .then(result => {
      
        res.send(result.insertedCount > 0)

      })

  })
  console.log('database connection success')
  const uri = "mongodb+srv://freshvalley123:4r5bY9QpG7i6ZJYv@cluster0.ivvdq.mongodb.net/Protikar?retryWrites=true&w=majority";
});






app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})