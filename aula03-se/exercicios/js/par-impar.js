var prompt = require('prompt-sync')();
const numero = Number(prompt("Digite um número inteiro: "));

/*
    if (numero % 2 === 0) {
        console.log(`O número ${numero} é par! `)
    } else {
        console.log(`O número ${numero} é ímpar! `)
    }
*/
const parOuImpar = numero % 2 === 0 ? "par" : "ímpar";
console.log(`O número ${numero} é ${parOuImpar}! `);
