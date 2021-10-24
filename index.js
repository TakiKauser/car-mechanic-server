const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user-pass secured using "dotenv(install)"
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sydng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("carMechanic");
        const servicesCollection = database.collection("services");

        // POST API
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log("Hit API", service);
            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);
        });
    }
    finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Car Mechanics");
})

app.listen(port, () => {
    console.log("Running Server on Port", port);
})