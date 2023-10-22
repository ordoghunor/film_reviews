// eslint-disable-next-line
async function deleteReview(reviewid) {
  const vissza = await fetch(`/delete/review/${reviewid}`);
  const s = vissza.json();
  s.then((data) => {
    if (data.affectedRows === 1) {
      document.getElementById(`review${reviewid}`).style.display = 'none';
      document.getElementById(`mes${reviewid}`).innerHTML = 'Succesfully deleted.';
      console.log(`Review with id: ${reviewid} Succesfully deleted.`);
      document.getElementById(`mes${reviewid}`).style.display = 'inline';
    } else {
      console.log('torles sikertelen');
      document.getElementById(`mes${reviewid}`).innerHTML = 'Error at deleting.';
      document.getElementById(`mes${reviewid}`).style.display = 'inline';
    }
  }).catch(() => {
    console.log('torles sikertelen');
    document.getElementById(`mes${reviewid}`).innerHTML = 'Error at deleting.';
    document.getElementById(`mes${reviewid}`).style.display = 'inline';
  });
}
