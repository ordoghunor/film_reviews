import express from 'express';
import path from 'path';
import { v4 } from 'uuid';

import btojpg from '../middleware/boritokeptojpg.js';
import * as db from '../db/filmek.js';
import schemaFilm from '../middleware/joi_uploadfilm.js';
import ratingcalc from '../middleware/ratingcalculator.js';

const router = express.Router();

async function betoltfooldal(res) {
  const film = await db.findAllFilms();
  const jpgBinary = btojpg(film); // fenykep
  // kirajzoljuk a requests sablont - a model az query eredménye
  res.render('fooldal', { film, jpgBinary });
}

// itt szurodik be az adatbazisba egy uj film (ha minden rendben van)
router.post('/films/upload_file', async (req, res) => {
  console.log(req.files.boritokep.path);
  const picturename = path.basename(req.files.boritokep.path);
  const id =  v4();

  const dataToValidate = {
    ID: id,
    Title: req.fields.cim,
    Year: req.fields.datum,
    Description: req.fields.description,
    Genre: req.fields.genre,
    Picture: picturename,
  };
  try {
    schemaFilm.validateAsync(dataToValidate);
    try {
      await db.insertFilm(dataToValidate);
      await betoltfooldal(res);
    } catch (err) {
      res.status(500).render('error', { message: `Insertion unsuccessful: ${err.message}` });
    }
  } catch (err1) {
    res.status(406);
    console.log(`406 Not acceptable \n\nJoi kapott error! error: ${err1}`);
    res.end(`406 Not acceptable \n\nJoi kapott error! error: ${err1}`);
  }
});

router.post('/films/get_data', async (req, res) => {
  // rakeres a fooladol a kriteriumok szerint az adatbazisban levo filmekre
  const dataToSearch = {
    cim: req.fields.rcim,
    genre: req.fields.rgenre,
    minev: req.fields.minevszam,
    maxev: req.fields.maxevszam,
  };
  try {
    const film = await db.searchFilm(dataToSearch);
    // console.log(film);
    const jpgBinary = btojpg(film);
    res.render('fooldal', { film, jpgBinary });
  } catch (err) {
    res.status(500).render('error', { message: `Search unsuccessful: ${err.message}` });
  }
});

router.get('/films/reviews/:id', async (req, res) => {
  // bemegy id szerint a filmhez, lehetove teszi a reviewok megtekinteset
  try {
    const film = await db.lekerFilm(req.params.id);
    const review = await db.findVisszajelzes(req.params.id);
    const jpgBinary = btojpg(film);

    const { rating, n } = ratingcalc(review);
    // n = hany darab reviewbol

    const felhasznalo = await db.findAllFelhasznalok();
    const elozoeredmeny = '';

    res.render('film', {
      film, review, jpgBinary, felhasznalo, elozoeredmeny, rating, n,
    });
  } catch (err) {
    res.status(500).render('error', { message: `Search unsuccessful: ${err.message}` });
  }
});

router.get('/', async (req, res) => {
  try {
    await betoltfooldal(res);
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

export default router;
