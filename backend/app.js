const express = require ('express')
const bodyParser = require ('body-parser')
const app = express()
const TestK = require('./models/testk')
const mongoose = require ("mongoose");
const bcrypt = require("bcrypt");
const User = require ('./models/user');
app.use(bodyParser.json());
const jwt= require('jsonwebtoken');
const checkAuth = require ('./middleware/check-Auth');

mongoose.connect('mongodb+srv://max:Ln9VkJiSr9eEDIZS@cluster0.xage5.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() =>{
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
})

app.post('/api/testsK',checkAuth,(req,res,next)=>{
  //const testK  = req.body;
  const testK  = new TestK({
    name: req.body.name,
    stock:req.body.stock
  });
  testK.save();
  console.log(testK);
  res.status(201).json({
    message: 'Test Kit Added successfully'
  });
});
app.get('/api/testsK',(req,res,next)=>{
  TestK.find().then(document => {
    res.status(200).json({
      message: 'Test Kit fetched successfully',
      testsK:document
    });
  });
});
app.delete('/api/testsK/:id',checkAuth,(req,res,next)=>{
  TestK.deleteOne({_id:req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message:"Test Kit Deleted!"});
  })
});
app.put('/api/testsK/:id',checkAuth,(req,res,next)=>{
  const testK = new TestK({
    _id:req.body.id,
    name:req.body.name,
    stock:req.body.stock
  });
  testK.updateOne({_id: req.params.id}, testK).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Successful!"});
  });
});
app.post('/api/user/signup',(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const user = new User({
      email: req.body.email,
      password: hash,
      position: req.body.position
    });
    user.save()
    .then(result =>{
      res.status(201).json({
        message:'User Created',
        result:result
      });
    })
    .catch(err =>{
      res.status(500).json({
        error:err
      });
    });
  });
});
app.post('/api/user/login',(req,res,next)=>{
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if(!result){
        return res.status(401).json({
          message:'auth failed'
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id, position: fetchedUser.position},
        'secret_this_should_be_longer',
        {expiresIn:'1h'}
      );
      res.status(200).json({
        token: token,
        message: fetchedUser
      })
    })
    .catch(err => {
      res.status(401).json({
        message: 'auth failed'
      });
    })
});
module.exports = app;
