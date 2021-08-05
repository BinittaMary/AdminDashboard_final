const express = require('express');
let app = express.Router();
const jwt = require('jsonwebtoken');
const EventData = require('../modal/EventData');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');


//inserting Event details
app.post('/event-insert', function (req, res) {


  const destn = path.join(__dirname, '../', 'Admin-Dashboard-master', 'src', 'assets', 'images');
  console.log(destn);
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, destn);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage }).single('file');

  upload(req, res, function (err) {
    if (err) {
      console.log("Error uploading file.");
    }

    console.log(req.body);

    var event = {
      name: req.body.name,
      shortdetails: req.body.shortdetails,
      moredetails: req.body.moredetails,
      boxdetails: req.body.boxdetails,
      coordinatorsdetail: req.body.coordinatorsdetail,
      registrationlink: req.body.registrationlink,
      brouchurelink: req.body.brouchurelink,
      programschedule: req.body.programschedule,
      speakerslist: req.body.speakerslist,
      button: req.body.button,
      date: req.body.date,
      image: req.body.image,

    }
    var event = new EventData(event);
    event.save().then(function (data) {
      res.send(true)
    })

  });


});

//deleting event
app.post('/event/remove', (req, res) => {
  console.log(req.body);
  id = req.body._id
  console.log(` inside remove ${id}`);
  EventData.deleteOne({ '_id': id })
    .then(function (event) {
      console.log('success')
      res.send(true);
    });

});

app.get('/event/:id', (req, res) => {

  const id = req.params.id;
  EventData.findOne({ "_id": id })
    .then((event) => {
      res.send(event);
    });
})

//udating event
app.post('/event/update', (req, res) => {

  console.log(` inside update ${req.body.id}`);
  id = req.body._id,
    name = req.body.name,
    shortdetails = req.body.shortdetails,
    moredetails = req.body.moredetails,
    boxdetails = req.body.boxdetails,
    coordinatorsdetail = req.body.coordinatorsdetail,
    registrationlink = req.body.registrationlink,
    brouchurelink = req.body.brouchurelink,
    programschedule = req.body.programschedule,
    speakerslist = req.body.speakerslist,
    button = req.body.button,
    date = req.body.date,
    image = req.body.image,
    EventData.findByIdAndUpdate({ "_id": id },
      {
        $set: {
          "name": name,
          "shortdetails": shortdetails,
          "moredetails": moredetails,
          "boxdetails": boxdetails,
          "coordinatorsdetail": coordinatorsdetail,
          "registrationlink": registrationlink,
          "brouchurelink": brouchurelink,
          "programschedule": programschedule,
          "speakerslist": speakerslist,
          "button": button,
          "date": date,
          "image": image
        }
      })
      .then(function () {
        res.send();
      })

});


//event update with image

app.post('/event/updateWithFile', (req, res) => {

  console.log(` inside updateWithFile ${req.body}`)
  const destn = path.join(__dirname, '../', 'Admin-Dashboard-master', 'src', 'assets', 'images');
  console.log(destn);
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, destn);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage }).single('file');
  upload(req, res, function (err) {

    if (err) {
      console.log("Error uploading file.");
    }
    console.log("File is uploaded");
    // console.log(`the title is ${req.body.title}`);
    console.log(` inside update with image ${req.body.name}`);
    id = req.body._id,
      name = req.body.name,
      shortdetails = req.body.shortdetails,
      moredetails = req.body.moredetails,
      boxdetails = req.body.boxdetails,
      coordinatorsdetail = req.body.coordinatorsdetail,
      registrationlink = req.body.registrationlink,
      brouchurelink = req.body.brouchurelink,
      programschedule = req.body.programschedule,
      speakerslist = req.body.speakerslist,
      button = req.body.button,
      date = req.body.date,
      image = req.body.image,
      EventData.findByIdAndUpdate({ "_id": id },
        {
          $set: {
            "name": name,
            "shortdetails": shortdetails,
            "moredetails": moredetails,
            "boxdetails": boxdetails,
            "coordinatorsdetail": coordinatorsdetail,
            "registrationlink": registrationlink,
            "brouchurelink": brouchurelink,
            "programschedule": programschedule,
            "speakerslist": speakerslist,
            "button": button,
            "date": date,
            "image": image
          }
        })
        .then(function () {
          res.send();
        })
  });
});

//event update index
app.put('/events/updateIndex', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');

  id = req.body._id;
  name = req.body.name;
  index = req.body.index;
  console.log(`update of ${name} with value ${index}`);
  EventData.findByIdAndUpdate({ "_id": id },
    { $set: { "index": index } })
    .then(function () {
      res.send();
    })

});

//getting event data
app.get('/events',function(req,res){
    
  EventData.find().sort({ index: 1 })
              .then(function(events){
                  res.send(events);
              });
});

module.exports = app;