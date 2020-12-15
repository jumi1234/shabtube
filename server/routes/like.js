const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//             Like
//=================================


router.post('/getLikes', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }

  Like.find(variable)
    .exec((err, likes) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true, likes })
    })
})

router.post('/getDislikes', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }

  Dislike.find(variable)
    .exec((err, dislikes) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true, dislikes })
    })
})

router.post('/upLike', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }

  // Like collection에 클릭 정보를 넣어줌
  const like = new Like(variable)

  like.save((err, likeResult) => {
    if(err) return res.json({ success: false, err })
  })

  // 만약 싫어요를 이미 클릭한 상태라면 dislike을 -1 함
  Dislike.findOneAndDelete(variable)
    .exec((err, dislikeResult) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, dislikeResult })
    })

})

router.post('/unLike', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }

  // 만약 싫어요를 이미 클릭한 상태라면 dislike을 -1 함
  Like.findOneAndDelete(variable)
    .exec((err, unlikeResult) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, unlikeResult })
    })

})

router.post('/unDisLike', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }

  // 만약 싫어요를 이미 클릭한 상태라면 dislike을 -1 함
  Dislike.findOneAndDelete(variable)
    .exec((err, undislikeResult) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, undislikeResult })
    })

})

router.post('/upDisLike', (req, res) => {
  let variable = {}

  if(req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }

  // Dislike collection에 클릭 정보를 넣어줌
  const dislike = new Dislike(variable)

  dislike.save((err, dislikeResult) => {
    if(err) return res.json({ success: false, err })
  })

  // 만약 싫어요를 이미 클릭한 상태라면 like을 -1 함
  Like.findOneAndDelete(variable)
    .exec((err, likeResult) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true })
    })

})


module.exports = router;
