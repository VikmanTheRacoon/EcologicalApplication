const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();

// Get Animals
router.get('/', async (req,res) =>{
    const animals = await loadAnimalsCollection();
    res.send(await animals.find({}).toArray());
});


// Add Animal
router.post('/', async (req,res)=>{
    const animals = await loadAnimalsCollection();
    await animals.insertOne({
       text: req.body.text,
       createdAt: new Date()
    });
    res.status(201).send();
})


router.delete('/:id', async(req,res) =>{
    const animals = await loadAnimalsCollection();
    await animals.deleteOne({_id: new mongodb.ObjectID (req.params.id)});
    res.status(200).send();
});

async function loadAnimalsCollection(params) {
    const client = await mongodb.MongoClient.connect('mongodb://Vikman:toto123@ds111608.mlab.com:11608/vuejs_db_ecoloapp', {
        useNewUrlParser:true
    });

    return client.db('vuejs_db_ecoloapp').collection('animals');
}

module.exports = router;
