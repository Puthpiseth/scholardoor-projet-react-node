const {check} = require('express-validator');

const firstname = check('firstname', 'Firstname is required.').not().isEmpty();
const lastname = check('lastname', 'Lastname is required.').not().isEmpty();
const username = check('username', 'Your username must have more than 5 charactors.').not().isEmpty().isLength({min: 5});
const email = check('email', 'Please provide a valid email address.').isEmail().normalizeEmail();
const password = check(
    'password',
    'Password must be greater that 8 and contains at least one uppercase letter, one lowercase letter and one number and one special character.'
)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

exports.SignupValidations = [firstname, lastname, username, email, password];
exports.AuthValidations = [email, password];