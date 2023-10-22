// nem talált oldalakra használjunk másik sablont
// vigyázat hogy ez a middleware a lánc VÉGÉRE kerüljön
export default function handleNotFound(req, res) {
  // kirajzoljuk a hibaoldalunk sablonját
  res.status(404).render('error', { message: 'The requested endpoint is not found' });
}
