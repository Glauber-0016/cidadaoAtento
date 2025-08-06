function verificarAutenticacao() {
  const usuario = JSON.parse(localStorage.getItem('userId'));
  
  if (!usuario) {
    if (!window.location.href.includes('login.html')) {
      window.location.href = 'login.html';
    }
    return null;
  }
  
  return usuario;
}

function getUserId() {
  return JSON.parse(localStorage.getItem('userId'));
}

function logout() {
  localStorage.removeItem('userId');
  window.location.href = 'login.html';
}