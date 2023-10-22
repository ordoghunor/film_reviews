import express from 'express';
import * as db from '../db/filmek.js';
import filter from '../middleware/badwords.js';
import { validateJwtCookieMyComment } from '../auth/middleware.js';

const router = express.Router();

router.use('/', validateJwtCookieMyComment);

router.post('/edit/:id', async (req, res) => {
  // itt updateolodik egy review egy filmrol

  const { id } = req.params;

  const dataToAdd = {
    id,
    pontszam: req.fields.pontszam,
    velemeny: filter.clean(req.fields.velemeny), // tisztitjuk a rosszszavakat
  };

  try {
    // updetaoljuk a visszajelzest az adatbazisba
    await db.updateComment(dataToAdd);

    res.redirect('/mycomments');
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

// '/mycomments'
router.get('/', async (req, res) => {
  try {
    const comm = await db.getMyComments(res.locals.payload.username);
    res.render('mycomments', { comm });
  } catch (err) {
    res.status(500).render('error', { message: `Insertion unsuccessful: ${err.message}` });
  }
});

export default router;
