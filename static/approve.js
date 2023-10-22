// eslint-disable-next-line
async function approveReview(rid) {
  const res = await fetch(`/admin/approve/review/${rid}`);
  const info = await res.json();

  if (info.affectedRows >= 1) {
    document.getElementById(`review${rid}`).style.display = 'none';
    document.getElementById(`mes${rid}`).innerHTML = `Approved succesfully. (Review with id=${rid})`;
    document.getElementById(`mes${rid}`).style.display = 'inline';
  } else {
    document.getElementById(`review${rid}`).style.display = 'none';
    document.getElementById(`mes${rid}`).innerHTML = `Something went wrong, try again later. (Review with id=${rid})`;
    document.getElementById(`mes${rid}`).style.display = 'inline';
  }
}

// eslint-disable-next-line
async function rejectReview(rid) {
  const res = await fetch(`/admin/reject/review/${rid}`);
  const info = await res.json();

  if (info.affectedRows >= 1) {
    document.getElementById(`review${rid}`).style.display = 'none';
    document.getElementById(`mes${rid}`).innerHTML = `Rejected succesfully. (Review with id=${rid})`;
    document.getElementById(`mes${rid}`).style.display = 'inline';
  } else {
    document.getElementById(`review${rid}`).style.display = 'none';
    document.getElementById(`mes${rid}`).innerHTML = `Something went wrong, try again later. (Review with id=${rid})`;
    document.getElementById(`mes${rid}`).style.display = 'inline';
  }
}
