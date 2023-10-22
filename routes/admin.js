import express from 'express';
import path from 'path';

import * as db from '../db/filmek.js';
import { validateJwtCookieAdmin } from '../auth/middleware.js';

const router = express.Router();

router.use('/', validateJwtCookieAdmin);

router.get('/upload', (req, res) => {
  res.render('admin');
});

// moderatorok es fooadminok tudjak ezt lekerni, reviewokat approve-olni
router.get('/reviews', async (req, res) => {
  try {
    const review = await db.findAllVisszajelzesCimmmel();
    res.render('adminreviews', { review });
  } catch (err) {
    res.status(500).render('error', { message: `Search unsuccessful: ${err.message}` });
  }
});

// review approve utvonal
router.get('/approve/review/:id', async (req, res) => {
  // Moderator/fooadmin approveol egy visszajelzest
  try {
    const info = await db.approveVisszajelzes(req.params.id);
    res.set('Content-Type', 'application/json');
    const send = JSON.stringify(info);
    res.send(send);
  } catch (err) {
    res.status(500).render('error', { message: `Update unsuccessful: ${err.message}` });
  }
});

router.get('/reject/review/:id', async (req, res) => {
  // Moderator/fooadmin rejectol egy visszajelzest
  try {
    const info = await db.rejectVisszajelzes(req.params.id);
    res.set('Content-Type', 'application/json');
    const send = JSON.stringify(info);
    res.send(send);
  } catch (err) {
    res.status(500).render('error', { message: `Update unsuccessful: ${err.message}` });
  }
});

// jogok adasa az usereknek 2-es admin tudja elerni csak (absolut admin)
router.get('/users/rights', async (req, res) => {
  try {
    const user = await db.findAllFelhasznalok();
    // console.log(user);
    res.render('userrights', { user });
  } catch (err) {
    res.status(500).render('error', { message: `Update unsuccessful: ${err.message}` });
  }
});

router.get('/promote/user/:id', async (req, res) => {
  // Fooadmin megnyomja a gombot hogy promote
  try {
    const info = await db.setUserFunkModerator(req.params.id);
    res.set('Content-Type', 'application/json');
    const send = JSON.stringify(info);
    res.send(send);
  } catch (err) {
    res.status(500).render('error', { message: `Update unsuccessful: ${err.message}` });
  }
});

router.get('/demote/user/:id', async (req, res) => {
  // Fooadmin megnyomja a gombot hogy demote
  try {
    const info = await db.setUserFunkNormal(req.params.id);
    res.set('Content-Type', 'application/json');
    const send = JSON.stringify(info);
    res.send(send);
  } catch (err) {
    res.status(500).render('error', { message: `Update unsuccessful: ${err.message}` });
  }
});

router.post('/users/rights/search', async (req, res) => {
  // foadmin rakeres usernevekre vagy funk-okra
  const dataToSearch = {
    username: req.fields.susername,
    funk: req.fields.sfunk,
  };
  try {
    const user = await db.searchUsers(dataToSearch);
    res.render('userrights', { user });
  } catch (err) {
    res.status(500).render('error', { message: `Search unsuccessful: ${err.message}` });
  }
});

router.get('/allcomments', async (req, res) => {
  // Fooadmin lekeri az osszes visszajelzest
  try {
    const comm = await db.findAllVisszajelzesCimmmel();
    const film = await db.findAllFilms();
    res.render('allcomments', { comm, film });
  } catch (err) {
    res.status(500).render('error', { message: `Update unsuccessful: ${err.message}` });
  }
});

router.post('/allcomments/search', async (req, res) => {
  // foadmin keres az ALL COMMENTS kozott
  const dataToSearch = {
    username: req.fields.susername,
    funk: req.fields.sfunk,
    filmid: req.fields.filmx,
    minpontszam: req.fields.minpontszam,
    maxpontszam: req.fields.maxpontszam,
  };
  try {
    const comm = await db.findAllVisszajelzesSearch(dataToSearch);
    const film = await db.findAllFilms();
    res.render('allcomments', { comm, film });
  } catch (err) {
    res.status(500).render('error', { message: `Search unsuccessful: ${err.message}` });
  }
});

router.get('/editfilm', async (req, res) => {
  try {
    const film = await db.findAllFilms();
    res.render('editfilm', { film });
  } catch (err) {
    res.status(500).render('error', { message: `Search unsuccessful: ${err.message}` });
  }
});

router.post('/editfilm/:id', async (req, res) => {
  // itt updateolodik egy film

  const { id } = req.params;
  let picturename = '';
  if (req.files.boritokep) {
    picturename = path.basename(req.files.boritokep.path);
  }

  const dataToAdd = {
    id,
    cim: req.fields.cim,
    date: req.fields.datum,
    leiras: req.fields.description,
    zsaner: req.fields.genre,
    boritokep: picturename,
  };

  try {
    // updetaoljuk a visszajelzest az adatbazisba
    await db.updateFilm(dataToAdd);
    res.redirect(`/films/reviews/${id}`);
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

export default router;
