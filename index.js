const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const uri = 'mongodb+srv://dhruv:dvarc.33343@cluster0-h2smw.mongodb.net/carRental?retryWrites=true&w=majority';
const userRouter = require('./Routes/users');
const rentRouter = require('./Routes/rent');
const locationRouter = require('./Routes/location');
const carpoolRouter = require('./Routes/carpoolRequest');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use('/user',userRouter);
app.use('/rent',rentRouter);
app.use('/location',locationRouter);
app.use('/carpool',carpoolRouter);

mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true}).catch(err =>{
  console.log(err);
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('success');
});

app.listen(process.env.PORT || 3000,()=>{
    console.log('server is listening on 3000');
});