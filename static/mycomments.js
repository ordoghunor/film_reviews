// eslint-disable-next-line
function activateCommentEdit(id) {
  const cb = document.getElementById(`editcheckbox${id}`);
  // xx <- lekeri a megfeleo formnak az idjat, amit megfogunk jeleniteni
  const xx = `editformx${id}`;

  console.log(xx);

  if (cb.checked === true) {
    document.getElementById(xx).style.display = 'inline-block';
  } else {
    document.getElementById(xx).style.display = 'none';
  }
}
