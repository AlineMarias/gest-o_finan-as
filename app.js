const express = require('express');
const app = express();
const path = require('path');
const buscarRouter = require('./routes/buscar');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('login');
});


app.get('/registrar', (req, res) => {
  res.render('registrar');
});


app.post('/registrar', (req, res) => {

  const { username, password } = req.body;
 
  res.redirect('/login');
});


app.get('/login', (req, res) => {
  res.render('login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));