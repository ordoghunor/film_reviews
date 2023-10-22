import jwt from 'jsonwebtoken';
import titok from '../titkositas.js';

export function checkJwtCookie(req, res, next) {
  if (req.cookies.hunorfilmbase) {
    res.locals.jwt = req.cookies.hunorfilmbase;
  }
  next();
}

export function validateJwtCookie(req, res, next) {
  if (!res.locals.jwt) {
    // res.redirect('/auth/login');
    // return;
  }

  try {
    const payload = jwt.verify(res.locals.jwt, titok);
    res.locals.payload = payload;
  } catch (err) {
    res.clearCookie('hunorfilmbase');
    // res.redirect('/auth/login');
  }
  next();
}

export function validateJwtCookieAdmin(req, res, next) {
  if (!res.locals.jwt) {
    res.sendStatus(401);
    return;
  }

  if (res.locals.jwt && res.locals.payload.funk < 1) {
    res.sendStatus(401);
    return;
  }

  try {
    const payload = jwt.verify(res.locals.jwt, titok);
    res.locals.payload = payload;
  } catch (err) {
    res.clearCookie('hunorfilmbase');
    res.redirect('/auth/login');
  }
  next();
}

export function validateJwtCookieMyComment(req, res, next) {
  if (!res.locals.jwt) {
    res.redirect('/auth/login');
    return;
  }

  try {
    const payload = jwt.verify(res.locals.jwt, titok);
    res.locals.payload = payload;
  } catch (err) {
    res.clearCookie('hunorfilmbase');
    res.redirect('/auth/login');
  }
  next();
}
