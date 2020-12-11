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
  Subscribe.find({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err)
      let result = false
      if(subscribe.length !== 0) {      // 구독 여부, 데이터가 있으면 구독중
        result = true
      }
      res.status(200).send({ success: true, subscribed: result })
    })
})

module.exports = router;
