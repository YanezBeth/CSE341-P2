// https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/ || https://github.com/mikeerickson/validatorjs  
const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;