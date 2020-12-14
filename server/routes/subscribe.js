const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscriber
//=================================

router.post('/subscribeNumber', (req, res) => {
  Subscriber.find({ "userTo": req.body.userTo })
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err);
      return res.status(200).send({ success: true, subscribeNumber: subscribe.length })
    })
})

router.post('/subscribed', (req, res) => {
  Subscriber.find({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err)
      let result = false
      if(subscribe.length !== 0) {      // 구독 여부, 데이터가 있으면 구독중
        result = true
      }
      res.status(200).json({ success: true, subscribed: result })
    })
})

router.post('/subscribe', (req, res) => {
  const subscribe = new Subscriber(req.body)

  subscribe.save((err, doc) => {
    if(err) return res.status(400).send({ success: false, err })
    return res.status(200).send({ success: true })
  })
})

router.post('/unSubscribe', (req, res) => {
  Subscriber.findOneAndDelete({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
    .exec((err, doc) => {
      if(err) return res.status(400).send({ success: false, err })
      return res.status(200).send({ success: true, doc })
    })
})

module.exports = router;
