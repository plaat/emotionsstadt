//const express = require('express');
import express from 'express';
//const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
//const cors = require('cors');
import cors from 'cors';
//const mongodb = require('mongodb');
import mongodb from 'mongodb';

const app = express()

app.use(bodyParser.json())
app.use(cors())

// get
app.get('/', async (req, res) => {
    const posts = await loadFromDb();
    res.send(await posts.find({}).toArray())
});

// post
app.post('/', async (req,res) => {
    const posts = await loadFromDb();
    await posts.insertOne({
        Latitude: req.body.lat,
        Longitude: req.body.lng,
        Positive_Affect: req.body.pa,
        Negative_Affect: req.body.na,
        createdAt: new Date(),
        active: req.body.active,
        upset: req.body.upset,
        hostile: req.body.hostile,
        inspired: req.body.inspired,
        ashamed: req.body.ashamed,
        alert: req.body.alert,
        nervous: req.body.nervous,
        determined: req.body.determined,
        attentive: req.body.attentive,
        afraid: req.body.afraid
    });
    res.status(201).send()
});

// delete
app.delete('/:id', async (req,res) => {
    const posts = await loadFromDb();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send(200)
})

async function loadFromDb(){
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/', {

    });
    return client.db('vue_app').collection('posts')
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server started on port '+port))