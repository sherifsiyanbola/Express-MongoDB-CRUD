const express = require('express')
const bodyParser = require('body-parser')
const app = express()


const MongoClient = require('mongodb').MongoClient
let db

MongoClient.connect('mongodb://geeksherif:geeksherif1@ds215633.mlab.com:15633/geek-sherif', { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('geek-sherif') // whatever your database name is
})

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.listen(3000, function(){
    console.log('Listening on 3000')
})

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) =>{
        if (err) return console.log(err)
        res.render('index.ejs', {quotes: result})
    })
    
    
    // res.sendFile(__dirname + '/views/index.html');
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
        res.redirect('/')
      })
})