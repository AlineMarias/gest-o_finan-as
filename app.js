const express = require('express');
const app = express();
const path = require('path');
const db = require('./models/bccd.js'); 
const buscarRouter = require('./routes/buscar');

require('dotenv').config();

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
    const { fullName, username, cpf, birthdate, gender, email, phone, password } = req.body;

    if (!fullName || !username || !cpf || !birthdate || !gender || !email || !phone || !password) {
        res.status(400).send('Todos os campos são obrigatórios');
        return;
    }

    const query = 'INSERT INTO usuarios (nome_completo, username, cpf, data_nascimento, genero, email, telefone, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [fullName, username, cpf, birthdate, gender, email, phone, password];

    db.executeQuery(query, params)
        .then(() => {
            res.redirect('/menu');
        })
        .catch((err) => {
            console.error('Erro ao inserir dados no banco de dados:', err);
            res.status(500).send('Erro ao inserir dados no banco de dados');
        });
});

app.get('/login', (req, res) => {
  const error = req.query.error || null;
  res.render('login', { error });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.getUserByUsername(username)
    .then(user => {
      if (!user || user.password !== password) {
        res.redirect('/login?error=Credenciais inválidas');
      } else {
        res.redirect('/menu');
      }
    })
    .catch(err => {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro interno do servidor');
    });
});

app.use('/buscar', buscarRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
