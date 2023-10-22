import Joi from 'joi';

// Ezzel a joi schemaval validaljuk a filmet amit beszurunk az adatbazisba uj filmet
const schemaFilm = Joi.object().keys({
  ID: Joi.string().min(36).max(36).required(),
  Title: Joi.string().min(2).required(),
  Year: Joi.string().pattern(/^[0-9]{4}$/),
  Description: Joi.string().min(4).max(300).required(),
  Genre: Joi.string().min(2).required(),
  Picture: Joi.string().pattern(/^upload_.*/),
});

export default schemaFilm;
