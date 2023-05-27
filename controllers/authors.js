const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();

/*
Get all authors from the database
*/
const getAuthors = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('authors').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error retrieving authors from database:', error);
    res.status(500).json({
      message: 'Unable to retrieve authors from database'
    });
  }
};

/*
GET one author by ID
*/
const oneAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Invalid Author ID');
    }
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('authors').find({
      _id: authorId
    });
    if (!result) {
      return res.status(404).json('Author not found');
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error retrieving author from database:', error);
    res.status(500).json({
      message: 'Unable to retrieve author from database'
    });
  }
};

/*
POST: add a new author
*/
const addAuthor = async (req, res) => {
  //console.log('addAuthor', req.body);
  try {
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
      res.status(500).json('An error occurred. Unable to add author.');
    }
  } catch (error) {
    console.error('Error adding author to database:', error);
    res.status(500).json({
      message: 'Unable to add author to database'
    });
  }
};

/*
PUT route for updating an author 
*/
const updateAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Invalid Author ID');
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
    //console.log('updateAuthor', result);
    if (result.modifiedCount > 0) {
      res.status(204).json({
        message: 'Author updated successfully'
      });
    } else {
      res.status(404).json('Author not found');
    }
  } catch (error) {
    console.error('Error updating author in database:', error);
    res.status(500).json('Unable to update author in database');
  }
};

/*
DELETE route for deleting an author
*/
const deleteAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Invalid Author ID');
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
      res.status(404).json('Author not found');
    }
  } catch (error) {
    console.error('Error deleting author from database:', error);
    res.status(500).json('Unable to delete author from database');
  }
};



module.exports = {
  getAuthors,
  oneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor
}