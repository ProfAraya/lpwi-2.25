const prompt = require('prompt-sync')() // uma função que "cria" o comando prompt importando a função prompt

const nome = prompt(`Qual é seu nome? `)

console.log(`Olá ${nome}!`)