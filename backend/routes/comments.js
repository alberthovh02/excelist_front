const express = require("express");
const { Router } = require("express");
const multer = require('multer');
const Comments = require("../models/comments");
const router = Router();

router.get("/", function(req, res, next){
  Comments.find(function(err, comment){
    if(err) throw new Error(err);
    res.json(comment)
  })
})

router.post("/create", function(req, res, next){
  const { name, email, comment, parentId, parentType } = req.body;
	if (!name || !email || !comment) {
    console.log("Error when getting data fields are empty")
		res.json({message: "Something went wrong", code: 400})
	} else {
		const data = {
			name,
      email,
      comment,
      parentId,
      parentType
		}
		Comments.create({...data}, (err, post) => {
			if (err){
        console.log("Error when videoblog create ", err)
				res.json({message: "Something went wrong", code: 500})
			}else
			res.json({message: "Success", code: 200, data: post});
		});
  }
})

router.delete("/:id", function(req, res, next){
  console.log(">>>>>>>>>>.", req.params)
  Comments.findByIdAndRemove(req.params.id,(err, post) => {
    if(err) res.json({message: "Something went wrong", code: 500});
    else res.json({message: "Success", code: 200, data: post});
  })
})

module.exports = router
