const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();

/*
Get all authors from the database
*/
const getAuthors = async (req, res) => {
  /*const result = await mongodb.getDb().db().collection('authors').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
    console.error('Error retrieving authors:', error);
    res.status(500).json({
      message: 'Unable to retrieve authors'
    });
  };*/
  mongodb.getDb().db().collection('authors').find().toArray((err, result) => {
    if (err) {
      res.status(400).json({
        message: err
      });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

/*
GET one author by ID
*/
const oneAuthor = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid Author ID');
  }
  const authorId = new ObjectId(req.params.id);
  mongodb.getDb().db().collection('authors').find({
    _id: authorId
  }).toArray((err, result) => {
    if (err) {
      res.status(500).json({
        message: err
      });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });
};

/*
POST: add a new author
*/
const addAuthor = async (req, res) => {
  //console.log('addAuthor', req.body);
  const newAuthor = {
    authorLastName: req.body.authorLastName,
    authorFirstName: req.body.authorFirstName,
    birthdate: req.body.birthdate,
    email: req.body.website
  };

  const result = await mongodb.getDb().db().collection('authors').insertOne(newAuthor);
  if (result.acknowledged) {
    res.status(201).json({
      message: 'Author added successfully',
      authorId: result.insertedId
    });
  } else {
    res.status(500).json(
      result.error || 'An error occurred. Unable to add author.');
  }
};

/*
PUT route for updating an author 
*/
const updateAuthor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid Author ID');
  }
  const authorID = new ObjectId(req.params.id);
  const upAuthor = {
    authorLastName: req.body.authorLastName,
    authorFirstName: req.body.authorFirstName,
    birthdate: req.body.birthdate,
    email: req.body.website
  };
  const result = await mongodb.getDb().db().collection('authors').replaceOne({
      _id: authorID
    },
    //$set: upAuthor
    upAuthor
  );
  console.log('updateAuthor', result);
  if (result.modifiedCount > 0) {
    res.status(204).json({
      message: 'Author updated successfully'
    });
  } else {
    res.status(500).json( //can remove the result.error
      result.error || 'Unable to update author'
    );
  }
};

/*
DELETE route for deleting an author
*/
const deleteAuthor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid Author ID');
  }
  const deleteAuthorID = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('authors').deleteOne({
    _id: deleteAuthorID
  });
  if (result.deletedCount > 0) {
    res.status(200).json({
      message: 'Author deleted successfully'
    });
  } else {
    res.status(500).json(
      result.error || 'Author not found'
    );
  }
};



module.exports = {
  getAuthors,
  oneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor
}