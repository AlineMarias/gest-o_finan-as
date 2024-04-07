const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.password,
    database: process.env.database
});
connection.connect(err => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados: ' + err);
    }
    console.log('Conexão bem-sucedida ao banco de dados');
});

function consultar(query, params, callback) {
    connection.query(query, params, (err, resultados) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            callback(err, null);
            return;
        }
        console.log('Resultados da consulta:', resultados);
        callback(null, resultados);
    });
}

module.exports = {
    consultar
};