const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
//const router = express.Router();
//const axios = require('axios');

/*const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: 'https://dev-qsfk08gwjpmuj0b4.us.auth0.com/oauth/token',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        audience: 'https://yanezproject2library.onrender.com',
        grant_type: 'client_credentials',
      }),
    };

    axios(options)
      .then((response) => {
        const {
          access_token
        } = response.data;
        resolve(access_token);
      })
      .catch((error) => {
        reject(error);
      });
  });
};*/

const getTitles = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('titles').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.log('Error retrieving titles from database:', error);
    res.status(500).json({
      message: 'Unable to get titles'
    });
  }
};

//GET one title by ID
const oneTitle = async (req, res) => {
  try {
    const titleId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('titles').findOne({
      _id: titleId
    });
    if (!result) {
      return res.status(400).json('Title not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error retrieving title from database:', error);
    res.status(500).json({
      message: 'Unable to retrieve title from database'
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
      res.status(400).json({
        message: 'An error occurred. Unable to add title'
      });
    }
  } catch (error) {
    console.error('Error adding title to database:', error);
    res.status(500).json({
      message: 'Unable to add title to database'
    });
  }
};


/*
PUT route for updating an author 
*/
const updateTitle = async (req, res) => {
  try {
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
    if (result.modifiedCount > 0) {
      res.status(204).json({
        message: 'Title updated successfully'
      });
    } else {
      res.status(400).json({
        message: 'Title not found'
      });
    }
  } catch (error) {
    console.error('Error updating title in database:', error);
    res.status(500).json({
      message: 'Unable to update title in database'
    });
  }
};

/*
DELETE route for deleting an author
*/
const deleteTitle = async (req, res) => {
  try {
    const deleteTitleID = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('titles').deleteOne({
      _id: deleteTitleID
    });
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: 'Title deleted successfully'
      });
    } else {
      res.status(400).json({
        message: 'Title not found'
      });
    }
  } catch (error) {
    console.error('Error deleting title from database:', error);
    res.status(500).json({
      message: 'Unable to delete title from database'
    });
  }
};

// Use the deleteTitle function as the DELETE route handler
//router.delete('/:id', deleteTitle);


module.exports = {
  getTitles,
  oneTitle,
  addTitle,
  updateTitle,
  deleteTitle,
}