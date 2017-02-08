const express = require('express');
const Note = require('../models/Note');
const handleError = require('../helpers/handleError');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });
const router = express.Router();


router.get('/', (req, res) => {
  Note.find({ user: req.user._id })
    .exec((err, notes) => {
      if (err) handleError(res, err, 404);
      else res.send(notes);
    });
});

router.post('/', upload.single('note-image'), (req, res) => {
  const { user, file } = req;
  const { title, content, color, tags } = req.body;
  const image = file ? file.filename : '';

  const newNote = new Note({
    title,
    content,
    color,
    tags: JSON.parse(tags),
    image,
    user: user._id,
  });

  newNote.save((err, data) => {
    if (err) { return handleError(res, err, 422); }
    return Note.findById(data._id)
      .populate('user')
      .exec((findErr, note) => {
        if (findErr) handleError(res, findErr, 404);
        else res.status(200).send(note);
      });
  });
});

router.delete('/:id', (req, res) => {
  Note.findOneAndRemove({
    $and: [
      { _id: req.params.id },
      { user: req.user._id },
    ],
  }, (err) => {
    if (err) handleError(res, err, 422);
    else res.send(req.params.id);
  });
});

router.put('/:id/tags', (req, res) => {
  const type = Object.keys(req.body);

  let option;
  if (`${type}` === 'tags') {
    option = { $push: { tags: req.body[type] } };
  } else if (`${type}` === 'tagsDel') {
    option = { $pull: { tags: req.body[type] } };
  }

  Note.findOneAndUpdate({
    $and: [
      { _id: req.params.id },
      { user: req.user._id },
    ],
  },
    option,
    { new: true, upsert: true }, // OMG!!!
    (err, note) => {
      if (err) handleError(res, err, 422);
      else res.send(note);
    });
});

router.put('/:id', (req, res) => {
  const type = Object.keys(req.body);
  const option = { [type]: req.body[type] };
  Note.findOneAndUpdate({
    $and: [
      { _id: req.params.id },
      { user: req.user._id },
    ],
  },
    option,
    { new: true, upsert: true }, // OMG!!!
    (err, note) => {
      if (err) handleError(res, err, 422);
      else res.send(note);
    });
});

module.exports = router;