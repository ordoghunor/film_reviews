import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import titok from '../titkositas.js';
import * as db from '../db/filmek.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  // reminder: req.body cseszekedik, inkabb req.fields !
  const info = await db.getPass(req.fields.username);
  if (Object.keys(info).length === 0) {
    res.render('login', { hibasj: 'Error!' });
    return;
  }

  const hash = info[0].pass;
  const { username } = req.fields;
  const { funk } = info[0];

  // console.log(funk);

  if (await bcrypt.compare(req.fields.password, hash)) {
    const cookie = jwt.sign({ username, funk }, titok);
    res.cookie('hunorfilmbase', cookie, { httpOnly: true, sameSite: 'strict' });
    res.redirect('/');
  } else {
    res.redirect('/auth/login');
  }
});

router.use('/logout', (req, res) => {
  if (req.cookies.hunorfilmbase) {
    res.clearCookie('hunorfilmbase');
  }
  res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
  res.render('login', { hibasj: '' });
});

export default router;
