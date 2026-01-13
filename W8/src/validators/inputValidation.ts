import { body } from 'express-validator';

export const registerValidator = (name: string) => body(name).trim().escape();

export const passwordValidator = (name: string) =>
	body(name).trim().escape().isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 });

// registerValidatoriin menee username ja email
// username length 3-25 merkkiä

// For the password make sure that the user is registering with a strong password.
// Password should have at least following restrictions:

//     at least 8 characters long
//     at least 1 upper case character
//     at least 1 lower case character
//     at least 1 number
//     at least 1 special character (i.e. #!&?)
