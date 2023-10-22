import mysql from 'mysql';
import autoBind from 'auto-bind';

/**
 * Osztály reprezentációja egy adatbázis-kapcsolatnak.
 */
export class DbConnection {
  constructor() {
    // Létrehozunk egy connection poolt
    this.pool = mysql.createPool({
      connectionLimit: 10,
      database: 'webprog',
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'admin',
    });

    // garantáljuk a metódusok példányhoz való bind-olását
    autoBind(this);
  }

  /**
   * Promise-okba enkapszuláljuk
   * a MySQL felé intézett hívásokat, ezeket könnyebb lekezelni
   */
  executeQuery(query, options = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(query, options, (error, results) => {
        if (error) {
          reject(new Error(`Error while running '${query}: ${error}'`));
        }
        resolve(results);
      });
    });
  }
}

/**
 * Alapértelmezett példány
 */
export default new DbConnection();
