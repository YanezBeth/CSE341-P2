//const { check, validationResult } = require('express-validator');
const validator = require('../helpVal/validate');

const saveAuthor = (req, res, next) => {
    const validationRule = {
        authorLastName: 'required|string',
        authorFirstName: 'required|string',
        birthdate: 'string',
        email: 'required|email'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Author validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveTitle = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        genre: 'required|string',
        audience: 'required|string',
        publisher: 'string',
        isbn: 'required|string',
        authorFirstName: 'required|string',
        authorLastName: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Title validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};


module.exports = {
    saveAuthor,
    saveTitle
};