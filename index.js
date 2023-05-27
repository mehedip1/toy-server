const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.DB_PASS)



const cards = require('./data/ToyCard.json')
const details = require('./data/details.json')




// middleware
app.use(cors());
app.use(express.json());









const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cgz3jmj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const toyCollection = client.db('toyCard').collection('services');


app.post('/services', async(req, res)=> {
  const newToy = req.body;
  console.log(newToy);
  const result = await toyCollection.insertOne(newToy);
  console.log(result);
  res.send(result);
})



   const serviceCollection = client.db('toyCard').collection('services');
   const categoriesCollection = client.db('toyCard').collection('categories');

   app.get('/services', async(req, res)=>{
    const cursor = serviceCollection.find();
    const result = await cursor.toArray();
    res.send(result);

   })


   app.get('/cards',(req, res)=>{
    console.log(cards)
    res.send(cards)

   });

   app.get('/details',(req, res)=>{
    console.log(details);
    res.send(details)
   })

  

   app.get('/categories', async(req,res)=>{
    const cursor = categoriesCollection.find();
    const result = await cursor.toArray();
    console.log(result)
    res.send(result);
   })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req, res)=>{
    res.send('TOY CRUD IS RUNNING')
})

app.listen(port,()=>{
    console.log(`TOY CRUD IS RUNNING on port, ${port}`)
})