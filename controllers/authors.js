const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();

/*
Get all authors from the database
*/
const getAuthors = async (req, res) => {
    try {
    const result = await mongodb.getDb().db().collection('authors').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error('Error retrieving authors:', error);
    res.status(500).json({
      message: 'Unable to retrieve authors'
    });
  }
};

/*
GET one author by ID
*/
const oneAuthor = async (req, res) => {
  const authorId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('authors').find({
    _id: authorId
  });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

/*
POST: add a new author
*/
const addAuthor = async (req, res) => {
    try {
      //console.log('addAuthor', req.body);
    const newAuthor = {   
      authorLastName: req.body.authorLastName,
      authorFirstName: req.body.authorFirstName,
      birthdate: req.body.birthdate,
      website: req.body.website     
    };

    const result = await mongodb.getDb().db().collection('authors').insertOne(newAuthor);
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Author added successfully',
        authorId: result.insertedId
      });
    } else {
      res.status(404).json({
        message: 'Unable to add author'
      });
    }
  } catch (error) {
    console.error('Error adding author:', error);
    res.status(500).json({
      message: 'Unable to add author'
    });
  }
};

/*
PUT route for updating an author 
*/
const updateAuthor = async (req, res) => {
    const authorID = new ObjectId(req.params.id);
    const upAuthor = {
      authorLastName: req.body.authorLastName,
      authorFirstName: req.body.authorFirstName,
      birthdate: req.body.birthdate,
      website: req.body.website  
    };
    const result = await mongodb.getDb().db().collection('authors').updateOne(
      {
        _id: authorID
      },
      {
        $set: upAuthor
      }
    );
    if (result.modifiedCount === 1) {
      res.status(204).json({
        message: 'Author updated successfully'
      });
    } else {
      res.status(404).json({
        message: 'Author not found'
      });
    }
};

/*
DELETE route for deleting an author
*/
const deleteAuthor = async (req, res) => {
  const deleteAuthorID = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('authors').deleteOne({
    _id: deleteAuthorID
  });
  if (result.deletedCount === 1) {
    res.status(200).json({
      message: 'Author deleted successfully'
    });
  } else {
    res.status(404).json({
      message: 'Author not found'
    });
  }
};

  


module.exports = {
    getAuthors,
    oneAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}