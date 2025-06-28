document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.message || 'Erro');

  const allowedDomain = '@cidadaoatento.com';

  if (data.message === 'Login bem-sucedido') {
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('email', data.email)

    if (data.email.endsWith(allowedDomain)) {
      window.location.href = 'adm.html';
    } else {
      window.location.href = 'pages/main.html';
    }

  }

});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const cpf = document.getElementById('cpf').value;
  const email = document.getElementById('email').value;


  const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, cpf, email })
  });

  const data = await res.json();
  alert(data.message || 'Erro');

});
