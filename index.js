const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Sessões devem vir antes das rotas
app.use(session({
  secret: '12345678',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // use true apenas em HTTPS
}));

app.use(express.urlencoded({ extended: true }));

// Primeiro a estática pública normal
app.use('/', express.static(path.join(__dirname, 'public')));

// Depois a rota protegida
app.use('/admin', ensureAdmin, express.static(path.join(__dirname, 'public', 'admin')));

// Middleware de verificação
function ensureAdmin(req, res, next) {
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect('/admin/login.html');
}

// Login admin
app.post('/admin/login', async (req, res) => {
  const { password } = req.body;
  if (password === '12345678') {
    req.session.isAdmin = true;
    return res.redirect('/admin/painel.html');
  }
  res.redirect('/admin/login.html?error=1');
});


// Início do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
