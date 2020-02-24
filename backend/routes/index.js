const express = require("express");
const { Router } = require("express");
// const Admin = require("../models/models/admin");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { check, validationResult } = require('express-validator');
// const User = require("../models/User.js");
const Lesson = require("../models/lesson")
const router = Router();

router.get("/", function(req, res, next){
  Lesson.find(function(err, lesson){
    if(err) throw new Error(err);
    res.json(lesson)
  })
})

router.post("/create", function(req, res, next){
  const { name, endTime, endMinutes, image } = req.body;
  console.log(name, endTime, endMinutes, image)
  console.log('req body>>>>>>>>>', req.body)
  if(!name || !endTime || !endMinutes || !image){
    res.json({message: "Empty data", code: 400})
    next()
  }else{
  Lesson.create(req.body, (err, post) => {
    if(err) throw new Error(err);
    res.json({message: "Success", code: 200})
  })
}
})

router.delete("/:id", function(req, res, next){
  console.log(">>>>>>>>>>.", req.body)
  Lesson.findByIdAndRemove(req.body._id,(err, post) => {
    if(err) return next(err)
    res.json(post);
  })
})

module.exports = router
