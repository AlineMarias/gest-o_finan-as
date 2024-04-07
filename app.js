const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const buscarRouter = require('./routes/buscar');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.BCDD_HOST,
    user: process.env.BCDD_USER,
    port: process.env.BCDD_PORT,
    password: process.env.BCDD_PASSWORD,
    database: process.env.BCDD_DATABASE
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados');
});

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
  const { email, password } = req.body;

  if (isValid(email, password)) {
   
    res.redirect('/menu');
  } else {
 
    res.redirect('/login');
  }

});

app.get('/login', (req, res) => {
  res.render('login');
});


app.use('/buscar', buscarRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
