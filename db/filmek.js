// Adatbázis műveleteket végző modul
import dbConnection from './connection.js';

/**
 * Aszinkron létrehozása a táblázatnak.
 * Async/await notációt használ.
 */
export const createTables = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS film (
      id varchar(40) NOT NULL,
      cim varchar(50),
      date varchar(10),
      leiras varchar(256),
      zsaner varchar(40),
      boritokep varchar(50),
      primary key(id)
      );`);
    console.log('Tables created successfully');
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }

  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS felhasznalo (
      username varchar(40) NOT NULL,
      pass varchar(2000) NOT NULL,
      funk varchar(2),
      primary key(username)
    );`);
    console.log('Tables created successfully');
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }

  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS visszajelzes (
      id int NOT NULL AUTO_INCREMENT,
      username varchar(40),
      filmid varchar(40),
      pontszam varchar(4),
      velemeny varchar(256),
      elfogadva int,
      primary key(id),
      foreign key(username) references felhasznalo(username),
      foreign key(filmid) references film(id)
    );
    `);
    console.log('Tables created successfully');
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }
};

// service metódus - lekéri az összes sort
// Promise-t térít vissza
export const findAllFelhasznalok = () => {
  const query = 'SELECT * FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

// service metódus - beszúr egy DB sort
export const insertFelhasznalo = (req) => {
  const query = 'INSERT INTO felhasznalo VALUES ( ? )';
  const params = [req.username];
  return dbConnection.executeQuery(query, params);
};

// service metódus - törli az összes sort
export const deleteAllFelhasznalo = () => {
  const query = 'DELETE FROM felhasznalo';
  return dbConnection.executeQuery(query);
};

export const findAllVisszajelzes = () => {
  const query = 'SELECT * FROM visszajelzes';
  return dbConnection.executeQuery(query);
};

export const findAllVisszajelzesCimmmel = () => {
  const query = 'select username, pontszam, filmid, cim, elfogadva, velemeny, visszajelzes.id from visszajelzes join film on film.id = visszajelzes.filmid;';
  return dbConnection.executeQuery(query);
};

export const approveVisszajelzes = (req) => {
  const query = 'update visszajelzes set elfogadva=1 where id = ? ;';
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

export const rejectVisszajelzes = (req) => {
  const query = 'update visszajelzes set elfogadva=-1 where id = ? ;';
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

// Egy filmnek lekerjuk a visszajelzeseit (review-okat)
export const findVisszajelzes = (req) => {
  const query = 'SELECT * FROM visszajelzes WHERE filmid= ?;';
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

// service metódus - beszúr egy DB sort
export const insertVisszajelzes = (req) => {
  const query = 'INSERT INTO visszajelzes VALUES ( default, ? , ? , ? , ? , ? );';
  const params = [req.username, req.filmID, req.pontszam, req.velemeny, req.elfogadva];
  return dbConnection.executeQuery(query, params);
};

// service metódus - törli az összes sort
export const deleteAllVisszajelzes = () => {
  const query = 'DELETE FROM visszajelzes';
  return dbConnection.executeQuery(query);
};

export const deleteVisszajelzes = (req) => {
  const query = 'DELETE FROM visszajelzes WHERE id = ?';
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

export const findAllFilms = () => {
  const query = 'SELECT * FROM film';
  return dbConnection.executeQuery(query);
};

// service metódus - beszúr egy DB sort
export const insertFilm = (req) => {
  const query = 'INSERT INTO film VALUES ( ? , ? , ? , ? , ? , ? );';
  const params = [req.ID, req.Title, req.Year, req.Description, req.Genre, req.Picture];
  return dbConnection.executeQuery(query, params);
};

// service metódus - törli az összes sort
export const deleteAllFilms = () => {
  const query = 'DELETE FROM film';
  return dbConnection.executeQuery(query);
};

export const searchFilm = (req) => {
  let query = 'SELECT * FROM film WHERE 1=1';
  const params = [];
  if (req.cim) {
    console.log('searchfield_1_active');
    query += ' AND cim LIKE ?';
    params.push(`%${req.cim}%`);
  }
  if (req.genre) {
    console.log('searchfield_2_active');
    query += ' AND zsaner LIKE ?';
    params.push(`%${req.genre}%`);
  }
  if (req.minev) {
    console.log('searchfield_3_active');
    query += ' AND CAST(date AS SIGNED)>=?';
    params.push(req.minev);
  }
  if (req.maxev) {
    console.log('searchfield_4_active');
    query += ' AND CAST(date AS SIGNED)<=?';
    params.push(req.maxev);
  }
  query += ';';
  // console.log(query);
  // console.log(params);
  return dbConnection.executeQuery(query, params);
};

export const lekerFilm = (req) => {
  const query = 'SELECT * FROM film WHERE id=?;';
  // console.log(query);
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

export const lekerVisszajelzesek = (req) => {
  const query = 'SELECT * FROM visszajelzes WHERE id=?;';
  // console.log(query);
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

export const selectGenreLeiras = (req) => {
  const query = 'SELECT leiras, zsaner FROM film WHERE id=?;';
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

export const getPass = (req) => {
  const query = 'SELECT pass, funk FROM felhasznalo WHERE username=?;';
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

export const registerUser = (req) => {
  const query = 'INSERT INTO felhasznalo VALUES ( ? , ? , ? );';
  const params = [req.username, req.password, req.funk];
  return dbConnection.executeQuery(query, params);
};

export const setUserFunkModerator = (req) => {
  const query = 'update felhasznalo set funk=\'1\' where username = ? ;';
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

export const setUserFunkNormal = (req) => {
  const query = 'update felhasznalo set funk=\'0\' where username = ? ;';
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

export const getMyComments = (req) => {
  const query = 'select visszajelzes.id, cim, pontszam, velemeny, elfogadva from visszajelzes join film on film.id = visszajelzes.filmid where username= ? ;';
  const params = [req];
  return dbConnection.executeQuery(query, params);
};

export const searchUsers = (req) => {
  let query = 'select * from felhasznalo where funk = ? ';
  const params = [req.funk];
  if (req.username) {
    query += 'and username LIKE ?';
    params.push(`%${req.username}%`);
  }
  return dbConnection.executeQuery(query, params);
};

export const findAllVisszajelzesSearch = (req) => {
  let query = 'select username, pontszam, filmid, cim, elfogadva, velemeny, visszajelzes.id from visszajelzes join film on film.id = visszajelzes.filmid where 1=1 ';
  const params = [];
  if (req.username) {
    query += 'and username LIKE ? ';
    params.push(`%${req.username}%`);
  }
  if (req.funk) {
    query += 'and funk=? ';
    params.push(req.funk);
  }
  if (req.filmid) {
    query += 'and filmid=? ';
    params.push(req.filmid);
  }
  if (req.minpontszam) {
    query += 'AND CAST(visszajelzes.pontszam AS SIGNED)>=? ';
    params.push(req.minpontszam);
  }
  if (req.maxpontszam) {
    query += 'AND CAST(visszajelzes.pontszam AS SIGNED)<=? ';
    params.push(req.maxpontszam);
  }
  return dbConnection.executeQuery(query, params);
};

export const updateComment = (req) => {
  const query = 'update visszajelzes set velemeny= ?, pontszam= ?, elfogadva=0 where id=?';
  const params = [req.velemeny, req.pontszam, req.id];
  return dbConnection.executeQuery(query, params);
};

// eslint-disable-next-line complexity
export const updateFilm = (req) => {
  let query = 'update film set ';
  const params = [];

  let x = 0;
  if (req.cim) {
    query += 'cim=? ';
    params.push(req.cim);
    x = 1;
  }
  if (req.date) {
    if (x === 1) {
      query += ',date=? ';
    } else {
      query += 'date=? ';
    }
    params.push(req.date);
    x = 1;
  }
  if (req.leiras) {
    if (x === 1) {
      query += ',leiras=? ';
    } else {
      query += 'leiras=? ';
    }
    params.push(req.leiras);
    x = 1;
  }
  if (req.zsaner) {
    if (x === 1) {
      query += ',zsaner=? ';
    } else {
      query += 'zsaner=? ';
    }
    params.push(req.zsaner);
    x = 1;
  }
  if (req.boritokep) {
    if (x === 1) {
      query += ',boritokep=? ';
    } else {
      query += 'boritokep=? ';
    }
    params.push(req.boritokep);
    x = 1;
  }
  query += 'where id=? ';
  params.push(req.id);

  return dbConnection.executeQuery(query, params);
};
