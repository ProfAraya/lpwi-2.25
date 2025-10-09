// Importa o framework Express
const express = require("express");
// Importa o body-parser para tratar dados de formulários POST
const bodyParser = require("body-parser");

const path = require('path')

const app = express();
const port = 3000;

// Configura o body-parser para ler dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (como o HTML dos formulários)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para tratar o formulário GET
app.get("/processar-get", (req, res) => {
  const { nome, idade } = req.query;
  res.send(`<h2>Dados recebidos via GET:</h2>
            <p>Nome: ${nome}</p>
            <p>Idade: ${idade}</p>`);
});

// Rota para tratar o formulário POST
app.post("/processar-post", (req, res) => {
  const { nome, idade } = req.body;
  res.send(`<h2>Dados recebidos via POST:</h2>
            <p>Nome: ${nome}</p>
            <p>Idade: ${idade}</p>`);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
