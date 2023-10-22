import express from 'express';
import bcrypt from 'bcrypt';

import * as db from '../db/filmek.js';

function checkusername(x) {
  if (!x || x.length < 5) {
    return false;
  }
  if (!(/^[A-Za-z0-9]*$/.test(x))) {
    return false;
  }
  return true;
}

const router = express.Router();

router.post('/go', async (req, res) => {
  // reminder: req.body cseszekedik, inkabb req.fields !
  const { username, password, passwordx } = req.fields;

  if (!checkusername(username) || !password || password.length < 6) {
    res.render('register', { hibasj: 'Toltse ki az adatokat jol!' });
    return;
  }

  if (password !== passwordx) {
    res.render('register', { hibasj: 'Passwords don\'t match!' });
    return;
  }

  const so = await bcrypt.genSalt(15);
  const dbpass = await bcrypt.hash(password, so);

  const dataToRegister = {
    username,
    password: dbpass,
    funk: '0',  // mindenki alapbol 'sima' felhasznalo
  };          // valaki hogy admin legyen manualisan mysql-bol kell adminna tenni (see setup)
    // ez azt jelentene hogy a funkot at kellene updatolni 1-re
  try {
    const info = await db.registerUser(dataToRegister);

    if (info.affectedRows === 1) {
      res.render('login', { hibasj: 'Sikeres regiszter!' });
    } else {
      res.render('register', { hibasj: 'Hiba tortent a regisztralasnal!' });
    }
  } catch (error) {
    console.log(error);
    res.render('register', { hibasj: 'Usernev foglalva!' });
  }
});

router.get('/', (req, res) => {
  res.render('register', { hibasj: '' });
});

export default router;
