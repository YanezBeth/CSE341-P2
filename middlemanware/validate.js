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
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveAuthor
};