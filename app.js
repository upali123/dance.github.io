const express = require('express')
const path = require('path');
const port = 80;
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});


//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    address: String,
    phonenumber: String,
    email: String,
    danceform: String,
    timing: String,
    alternatenumber: String,
    feedback: String
  });

  const contact = mongoose.model('contact', contactSchema);

//express stuff
app.use('/static', express.static('static')) //for serving static file
app.use( express.urlencoded())

//pug stuff

app.set('view engine','pug') //set the template engine as pug
app.set('views',path.join(__dirname,'views')) //set the views directory

//endpoints
app.get('/',(req,res)=>{
    const params ={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params ={}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
       res.send("this item has been saved to the database") 
    }).catch(()=>{
        res.status(400).send("item was not saved");
    });
   /*res.status(200).render('contact.pug');*/
})
app.get('/services',(req,res)=>{
    const params ={}
    res.status(200).render('services.pug',params);
})

app.get('/about',(req,res)=>{
    const params ={}
    res.status(200).render('about.pug',params);
})
app.get('/classinfo',(req,res)=>{
    const params ={}
    res.status(200).render('classinfo.pug',params);
})
//start the server
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
});