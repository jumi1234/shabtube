const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");

const {
  auth
} = require("../middleware/auth");
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true)
  }
})

var upload = multer({
  storage: storage
}).single("file")

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {

  upload(req, res, err => {
    if (err) {
      return res.json({
        success: false,
        err
      })
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename
    })
  })

});

router.post("/thumbnail", (req, res) => {

  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function(err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  })

  ffmpeg(req.body.filePath)
    .on('filenames', function(filenames) {
      console.log('Will generate ' + filenames.join(', '))
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on('end', function() {
      console.log('Screenshots taken');
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration
      })
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: 'uploads/thumbnails',
      size: '320x240',
      // %b input basename ( filename w/o extension )
      filename: 'thumbnail-%b.png'
    });

});

router.post("/uploadVideo", (req, res) => {
  // 비디오 정보들을 저장
  const video = new Video(req.body)

  video.save((err, doc) => {        // mongoDB에 저장
    if(err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

router.get("/getVideos", (req, res) => {
  // 비디오를 DB에서 가져와서 클라이언트에 보낸다
  Video.find()
    .populate('writer')     // writer의 모든 정보 가져오려면 populate() 사용
    .exec((err, videos) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos })
    })
})

router.post("/getVideoDetail", (req, res) => {
  Video.findOne({ "_id": req.body.videoId })
    .populate('writer')     // writer의 id뿐 아니라 모든 정보 가져옴
    .exec((err, videoDetail) => {
      if(err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videoDetail })
    })
})

router.post("/getSubscriptionVideos", (req, res) => {

  // 자신의 id를 가지고 구독하는 사람들을 찾는다

  Subscriber.find({ 'userFrom': req.body.userFrom })
    .exec((err, subscriberInfo) => {
      if(err) return res.status(400).send(err);

      let subsribedUser = [];

      subscriberInfo.map((subscriber, i) => {
        subsribedUser.push(subscriber.userTo);
      })

  // 찾은 사람들의 비디오를 가지고 온다

    Video.find({ writer: { $in: subsribedUser } })      // 지정된 `배열`의 값과 일치하는 항목을 하나 이상 보유하는 데이터를 가져올 때 사용
      .populate('writer')
      .exec((err, videos) => {
        if(err) return res.status(400).send(err);
        res.status(200).send({ success: true, videos })
      })
    })
});

router.post('/upViews', (req, res) => {

  const id = req.body.id

  Video.findByIdAndUpdate(id, { views: req.body.views })
    .exec((err) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true })
    })

})

module.exports = router;
