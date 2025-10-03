// dentro desta pasta usar o terminal (cmd no lugar de PowerShell) 
// para dar os comandos:
// a) criar um projeto javascript nesta pasta 
// npm init -y 
// (este comando vai criar o arquivo package.json)
//
// b) instalar o pacote prompt-sync
// npm install prompt-sync
// este comando vai alterar o package.json para incluir
// a informação sobre o pacote instalado
// vai criar a pasta node_modules dentro da qual serão instalados
// os módulos javascript
//
// c) crie o arquivo ".gitignore" (com ponto na frente do nome mesmo)
// para que não inclua a pasta "node_modules" nos commits.
// O conteúdo do arquivo será a linha abaixo: 
// node_modules
// 
// c) executar o programa 
// node prog1.js


const prompt = require('prompt-sync')();

const nome = prompt('Qual é o seu nome?');
      
console.log(`Olá ${nome}!`);

