const express = require('express');
let app = express.Router();
const multer = require('multer');
const path = require('path');


const CourseRegistrationdata = require('../modal/CourseRegistrationData');





app.post('/registercourse', function (req, res) {
    var RegistrationItem = {
        course_id: req.body.course_id,
        course_title: req.body.course_title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailaddress: req.body.emailaddress,
        phoneno: req.body.phoneno,
        employed: req.body.employed,
        graduation: req.body.graduation,
        message: req.body.message
    }

    CourseRegistrationdata.find({ 'emailaddress': RegistrationItem.emailaddress, 'course_id': RegistrationItem.course_id })
        .then(function (cousrseReg) {
            var bexist = false;
            console.log(`fetched from db Email ID - ${RegistrationItem.emailaddress}, coursetitle - ${RegistrationItem.course_title}`)
            for (var i = 0; i < cousrseReg.length; i++) {
                if ((cousrseReg[i].emailaddress == RegistrationItem.emailaddress) && (cousrseReg[i].course_id == RegistrationItem.course_id)) {
                    bexist = true;
                }
            };
            if (bexist) {
                console.log(`Email ID is already registered for the course ${RegistrationItem.course_title}`);
                res.status(401).send(`Email ID is already registered for the course ${RegistrationItem.course_title}`)
            }
            else {
                var vUser = CourseRegistrationdata(RegistrationItem);
                vUser.save();
                console.log(`The registered user added is : Email ID - ${RegistrationItem.emailaddress}, Course - ${RegistrationItem.course_title}`);
                res.status(200).send({ RegistrationItem })
            }
        });
});

app.get('/registercourseList', function (req, res) {
    console.log('registercourseList')
    CourseRegistrationdata.find().sort({ _id: -1 })
        .then(function (cousrseRegs) {
            res.send(cousrseRegs);
        });
});

app.get('/registercourseAggr',function(req,res){
    console.log('registercourseAggr')
    let date_ob = new Date();  
    date_ob.setMonth(date_ob.getMonth()-4);
    console.log(date_ob)
    CourseRegistrationdata.aggregate([
      {
        $match: {
          creation_date: {
            $gte: date_ob
          }
        }
      },
      {
          $group:
          {
              _id: { course_title: "$course_title" },
              totalCourseRegstrn: { $sum: 1 }
          }
      }
  ])
    .then(function(cousrseRegs){
        res.send(cousrseRegs);
        });
  });

module.exports = app;