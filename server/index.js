const express = require('express');
const {MongoClient} = require('mongodb');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();

const uri = process.env.URI;
const app = express();

app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri);
    const {email, password} = req.body;

    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        client.connect();
        const database = client.db('app-data');
        const users = database.collection("users");

        const existingUser = users.findOne({ email });
        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }
        const sanitizedEmail = email.toLowerCase();

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        users.insertOne(data);
    }
    catch {error => console.log(error)}
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
