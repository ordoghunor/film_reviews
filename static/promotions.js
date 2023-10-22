// eslint-disable-next-line
async function promoteUser(username) {
  const res = await fetch(`/admin/promote/user/${username}`);
  const info = await res.json();

  if (info.affectedRows >= 1) {
    document.getElementById(`promoteclick${username}`).style.display = 'none';
    document.getElementById(`demoteclick${username}`).style.display = 'inline';
    document.getElementById(`changefunk${username}`).innerHTML = 'funk: 1';
    document.getElementById(`dot${username}`).style.display = 'inline-block';
  } else {
    document.getElementById(`mes${username}`).innerHTML = `Something went wrong, try again later. (User with username=${username})`;
    document.getElementById(`mes${username}`).style.display = 'inline';
  }
}

// eslint-disable-next-line
async function demoteUser(username) {
  const res = await fetch(`/admin/demote/user/${username}`);
  const info = await res.json();

  if (info.affectedRows >= 1) {
    document.getElementById(`promoteclick${username}`).style.display = 'inline';
    document.getElementById(`demoteclick${username}`).style.display = 'none';
    document.getElementById(`changefunk${username}`).innerHTML = 'funk: 0';
    document.getElementById(`dot${username}`).style.display = 'none';
  } else {
    document.getElementById(`mes${username}`).innerHTML = `Something went wrong, try again later. (User with username=${username})`;
    document.getElementById(`mes${username}`).style.display = 'inline';
  }
}
