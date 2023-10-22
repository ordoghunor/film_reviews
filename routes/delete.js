import express from 'express';
import * as db from '../db/filmek.js';

const router = express.Router();

router.get('/review/:id', async (req, res) => {
  try {
    const info = await db.deleteVisszajelzes(req.params.id);
    res.set('Content-Type', 'application/json');
    const send = JSON.stringify(info);
    res.send(send);
  } catch (err) {
    res.status(500).render('error', { message: `Insertion unsuccessful: ${err.message}` });
  }
});

export default router;
