import express from 'express';

import * as db from '../db/filmek.js';
import btojpg from '../middleware/boritokeptojpg.js';
import filter from '../middleware/badwords.js';
import ratingcalc from '../middleware/ratingcalculator.js';

const router = express.Router();

router.post('/submit/:id', async (req, res) => {
  // itt submitolodik egy review egy filmrol

  const dataToAdd = {
    username: res.locals.payload.username,
    filmID: req.params.id,
    pontszam: req.fields.pontszam,
    velemeny: filter.clean(req.fields.velemeny), // tisztitjuk a rosszszavakat
    elfogadva: 0,
  };

  try {
    // beszurjuk a visszajelzest az adatbazisba
    await db.insertVisszajelzes(dataToAdd);

    const film = await db.lekerFilm(req.params.id);
    const review = await db.findVisszajelzes(req.params.id);
    const jpgBinary = btojpg(film);

    const { rating, n } = ratingcalc(review);

    const felhasznalo = await db.findAllFelhasznalok();
    const elozoeredmeny = 'Sikeres feltoltes, varjuk hogy egy moderator elfogadja.';

    res.render('film', {
      film, review, jpgBinary, felhasznalo, elozoeredmeny, rating, n,
    });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

export default router;
