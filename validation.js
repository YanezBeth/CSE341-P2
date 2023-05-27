const {
  check
} = require('express-validator');

exports.authorValidation = [
  //body('password').isLength({ min: 5 }),
  check('authorFirstName', 'First name is required').not().isEmpty(),
  check('authorLastName', 'Last name is required').not().isEmpty(),
  check('birthdate', 'Birthdate is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail({
    gmail_remove_dots: true
  }),
]

exports.titleValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('genre', 'Genre is required').not().isEmpty(),
  check('audience', 'Audience is required').not().isEmpty(),
  check('publisher', 'Publisher is required').not().isEmpty(),
  check('isbn', 'ISBN is required').not().isEmpty(),
  check('authorFirstName', 'Author first name is required').not().isEmpty(),
  check('authorLastName', 'Author last name is required').not().isEmpty(),
]


const authorValidated = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }))

  return res.status(500).json({
    errors: extractedErrors,
  })
}

module.exports = {
  authorValidation,
  authorValidated,
}