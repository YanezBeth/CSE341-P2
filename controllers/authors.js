const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();

//Get all authors from the database
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

//POST new author
const addAuthor = async (req, res) => {
    try {
    const newAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdate: req.body.birthday,
      website: req.body.website,          
    };
  
    const result = await mongodb.getDb().db().collection('authors').insertOne(newAuthor);
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Author added successfully',
        contactId: result.insertedId
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
  


module.exports = {
    getAuthors,
    addAuthor
}