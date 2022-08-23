const express = require('express');
const {MongoClient} = require('mongodb')
require('dotenv').config()

const uri = process.env.URI
const app = express()

app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.post('/signup', (req, res) => {
    res.json('Hello to my app')
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection("users");
        const returnedUsers = await users.find().toArray();
        res.send(returnedUsers);
    }
    finally {
        await client.close();
    }
})

const PORT = 8000;
app.listen(PORT, () => console.log('Server running on PORT ' + PORT));
