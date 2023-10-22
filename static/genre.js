// eslint-disable-next-line
async function getmoreinfo(filmid) {
  const res = await fetch(`/getmoreinfo/${filmid}`);
  const info = await res.json();

  const { leiras } = info[0];
  const genre = info[0].zsaner;
  console.log(leiras);
  console.log(genre);
  document.getElementById(`leiras${filmid}`).innerText = `Leiras: ${leiras}`;
  document.getElementById(`genre${filmid}`).innerText = `Genre: ${genre}`;
  console.log('sikeres');
}
