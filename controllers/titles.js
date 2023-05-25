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

//GET one title by ID
const oneTitle = async (req, res) => {
  const titleId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('titles').find({
    _id: titleId
  });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addTitle = async (req, res) => {
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
};

/*
PUT route for updating an author 
*/
const updateTitle = async (req, res) => {
  const titleID = new ObjectId(req.params.id);
  const upTitle = {
    title: req.body.title,
    genre: req.body.genre,
    audience: req.body.audience,
    publisher: req.body.publisher,
    isbn: req.body.isbn,
    authorFirstName: req.body.authorFirstName,
    authorLastName: req.body.authorLastName,
  };
  const result = await mongodb.getDb().db().collection('titles').updateOne({
    _id: titleID
  }, {
    $set: upTitle
  });
  if (result.modifiedCount === 1) {
    res.status(204).json({
      message: 'Title updated successfully'
    });
  } else {
    res.status(404).json({
      message: 'Title not found'
    });
  }
};

/*
DELETE route for deleting an author
*/
const deleteTitle = async (req, res) => {
  const deleteTitleID = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('titles').deleteOne({
    _id: deleteTitleID
  });
  if (result.deletedCount === 1) {
    res.status(200).json({
      message: 'Title deleted successfully'
    });
  } else {
    res.status(404).json({
      message: 'Title not found'
    });
  }
};



module.exports = {
  getTitles,
  oneTitle,
  addTitle,
  updateTitle,
  deleteTitle
}