const express = require ('express')
const bodyParser = require ('body-parser')
const app = express()
const TestK = require('./models/testk')
const mongoose = require ("mongoose");
const bcrypt = require("bcrypt");
const User = require ('./models/user');
const Test = require ('./models/test.model');
const TestC = require('./models/testc');
const idAutoIncrement = require("id-auto-increment");
app.use(bodyParser.json());
const jwt= require('jsonwebtoken');
const checkAuth = require ('./middleware/check-auth');
const port = 3000

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





//Tester
app.post('/api/tester/signup',checkAuth,(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hash,
      position: req.body.position,
      testCentre: req.body.testCentre
    });
    user.save()
    .then(result =>{
      res.status(201).json({
        message:'Tester Created',
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
app.get('/api/tester',(req,res,next)=>{

    User.find({position: 'tester'}).then(document => {
      res.status(200).json({
        message: 'Tester fetched successfully',
        tester:document
      });
    });

});


app.delete('/api/tester/:id',(req,res,next)=>{
  User.deleteOne({_id:req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message:"Tester Deleted!"});
  })
});

//TestCentre
app.post('/api/testsC',(req,res,next)=>{
  //const testK  = req.body;
  const testC  = new TestC({
    name: req.body.name
  });
  testC.save();
  console.log(testC);
  res.status(201).json({
    message: 'Test Centre Added successfully'
  });
});

app.get('/api/testsC',(req,res,next)=>{
  TestC.find().then(document => {
    res.status(200).json({
      message: 'Test Centre fetched successfully',
      testsC:document
    });
  });
});
app.delete('/api/testsC/:id',checkAuth,(req,res,next)=>{
  TestC.deleteOne({_id:req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message:"Test Centre Deleted!"});
  })
});
app.put('/api/testsC/:id',checkAuth,(req,res,next)=>{
  const testC = new TestC({
    _id:req.body.id,
    name:req.body.name
  });
  TestC.updateOne({_id: req.params.id}, testC).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Successful!"});
  });
});

//TestKit
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
  TestK.updateOne({_id: req.params.id}, testK).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Successful!"});
  });
});

//Login SignUp
app.post('/api/user/signup',(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const user = new User({
      email: req.body.email,
      name: req.body.name,
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
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



//test CRUD operations

app.post("/api/tests/add",(req, res, next) => {
  const test = new Test({
    name:req.body.name,
    testerId: req.body.testerId,
      date: req.body.date,
      status: "pending",
      userId: req.body.userId,
      patientType: req.body.patientType,
      symptoms: req.body.symptoms,
      result: "pendind",

  })
  test.save().
      then(test => {
          if(test){
              res.status(201).json({
                  message: "Test added successfully",

              })
          }
  }).catch(e => {
          console.log(e)
      })
})


app.get("/api/patient/test",(req, res, next) => {
    console.log(req.query.id);  
  Test.find({userId: req.query.id}).then(document => {
    res.status(200).json({
      message: 'Test fetched successfully',
      tests:document
    });
  });
})


app.get("/api/tester/tests",(req, res, next) => {
 
  Test.find({testerId: req.query.testerId}).then(document => {
    res.status(200).json({
      message: 'Test fetched successfully',
      tests:document
    });
  });
})

app.get("/api/tests",(req, res, next) => {
  Test.find({}).then(document => {
    res.status(200).json({
      message: 'Test fetched successfully',
      tests:document
    });
  });
})

app.get("/api/tests/findOne",(req, res, next) => {
  Test.findOne({_id: req.query.id}).then(document => {
    res.status(200).json({
      message: 'Test fetched successfully',
      tests:document
    });
  });
})


app.put('/api/tests/update/:id',(req,res,next)=>{
  const test = new Test({
    _id:req.body.id,
    name:req.body.name,
    testerId:req.body.testerId,
    date: req.body.date, 
    status: "Completed",
    userId: req.body.userId, 
    patientType:req.body.patientType,
    symptoms: req.body.symptoms,
    result: req.body.result
  });
  Test.updateOne({_id: req.params.id}, test).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Successful!"});
  });
});


app.get("/api/testing",(req, res, next) => {

  console.log()
})


module.exports = app;
