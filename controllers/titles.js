const mongodb = require('../db/connect');
//const ObjectId = require('mongodb').ObjectId;
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


module.exports = {
    getTitles
}