const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();


const getTitles = async (req, res) => {
    try {
    const result = await mongodb.getDb().db().collection('titles').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unable to get titles'
    });
  }
};

const addTitle = async (req, res) => {
  try {
  const newTitle = {
    title: req.body.title,
    genre: req.body.genre,
    audience: req.body.audience,
    publisher: req.body.publisher,
    isbn: req.body.isbn,
    authorFirstName: req.body.authorFirstName,
    authorLastName: req.body.authorLastName,          
  };

  const result = await mongodb.getDb().db().collection('titles').insertOne(newTitle);
  if (result.acknowledged) {
    res.status(201).json({
      message: 'Title added successfully',
      titleId: result.insertedId
    });
  } else {
    res.status(404).json({
      message: 'Unable to add title'
    });
  }
} catch (error) {
  console.error('Error adding title:', error);
  res.status(500).json({
    message: 'Unable to add title'
  });
}
};


module.exports = {
    getTitles,
    addTitle
}