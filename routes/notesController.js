const express = require('express');
const Note = require('../models/Note');
const handleError = require('../helpers/handleError');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.get('/', (req, res) => {
  Note.find({ $and: [{ _user: req.user._id, isDeleted: false }] })
    .exec()
    .then(notes => res.send(notes))
    .catch(err => handleError(res, err, 404));
});

router.post('/', upload.array('note-image', 5), (req, res) => {
  const { user, files } = req;
  const { title, body, color, tags } = req.body;

  const images = [];
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      images.push(files[i].filename);
    }
  }

  const newNote = new Note({
    title,
    body,
    color,
    tags: JSON.parse(tags),
    images,
    _user: user._id,
  });

  newNote.save()
    .then(data => res.status(200).send(data))
    .catch(err => handleError(res, err, 422));
});

router.delete('/:id', (req, res) => {
  Note.findOneAndUpdate({
    $and: [
      { _id: req.params.id },
      { _user: req.user._id },
    ],
  }, { isDeleted: true })
    .then(() => res.send(req.params.id))
    .catch(err => handleError(res, err, 422));
});

router.delete('/:id/tags/:tag', (req, res) => {
  Note.findOneAndUpdate({
    $and: [
      { _id: req.params.id },
      { _user: req.user._id },
    ],
  },
    { $pull: { tags: req.params.tag } },
    { new: true, upsert: true })
    .then(note => res.send(note))
    .catch(err => handleError(res, err, 422));
});

router.post('/:id/tags', (req, res) => {
  Note.findOneAndUpdate({
    $and: [
      { _id: req.params.id },
      { _user: req.user._id },
    ],
  },
    { $addToSet: { tags: req.body.tag } },
    { new: true, upsert: true })
    .then(note => res.send(note))
    .catch(err => handleError(res, err, 422));
});

router.delete('/:id/images/:image', (req, res) => {
  Note.findOneAndUpdate({
    $and: [
      { _id: req.params.id },
      { _user: req.user._id },
    ],
  },
    { $pull: { images: req.params.image } },
    { new: true, upsert: true })
    .then(note => res.send(note))
    .catch(err => handleError(res, err, 422));
});

// modify
router.post('/:id/images', upload.single('note-image'), (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(402).send('connot upload empty file');
  }

  const image = file.filename;

  Note.findOneAndUpdate({
    $and: [
      { _id: req.params.id },
      { _user: req.user._id },
    ],
  },
    { $addToSet: { images: image } },
    { new: true, upsert: true })
    .then(note => res.send(note))
    .catch(err => handleError(res, err, 422));
});

router.put('/:id', (req, res) => {
  Note.findOneAndUpdate({
    $and: [
      { _id: req.params.id },
      { _user: req.user._id },
    ],
  },
    req.body,
    { new: true, upsert: true })
    .then(note => res.send(note))
    .catch(err => handleError(res, err, 422));
});

module.exports = router;
