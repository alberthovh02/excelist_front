const express = require("express");
const { Router } = require("express");
const Blogs = require("../models/blogs")
const router = Router();

router.get("/", function(req, res, next){
  Blogs.find(function(err, lesson){
    if(err) throw new Error(err);
    res.json(lesson)
  })
})

// router.post("/create", function(req, res, next){
//   const { name, endTime } = req.body;
//
//   if(!name || !endTime){
//     next()
//   }else{
//   Lesson.create(req.body, (err, post) => {
//     if(err) throw new Error(err);
//     res.json({message: "Success", code: 200})
//   })
// }
// })
//
// router.delete("/:id", function(req, res, next){
//   console.log(">>>>>>>>>>.", req.body)
//   Lesson.findByIdAndRemove(req.body._id,(err, post) => {
//     if(err) return next(err)
//     res.json(post);
//   })
// })

module.exports = router
