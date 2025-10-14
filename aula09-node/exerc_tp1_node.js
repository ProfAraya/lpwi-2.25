
function ex02(){
    const prompt = require(`prompt-sync`)()
    
    const pi = 3.14159

    try {
        pi = prompt(`Tente reatribuir outro valor: `)
    } catch (error) {
        const elementoErro = `Erro: ${error.message}`
        
        if (elementoErro) {
            console.log(elementoErro)
        }
    }
}

function ex06(){
    const prompt = require(`prompt-sync`)()

    const num = Number(prompt(`Insira um número: `))

    let res

    if (num % 2 === 0 ) {
        res = `O número ${num} é par.`
    } else {
        res = `O número ${num} é ímpar.`
    }

    console.log(res)
}

function ex09(){
    const prompt = require(`prompt-sync`)()

    const num = Number(prompt(`Insira um número: `))
    let multi = 0
    let res = ''

    console.log(`Tabuada de ${num}: `)

    for (i =0; i <=10; i++){

        multi = num * i
        res = `${num} * ${i} = ${multi}`

        console.log(res)
    }
}

function ex13(){
    const prompt = require(`prompt-sync`)()

    const carro = {
        marca: prompt(`Insira a MARCA do carro: `),
        modelo: prompt(`Insira o MODELO do carro: `),
        ano: Number(prompt(`Insira o ANO do carro: `))
    }

    console.log(`MARCA: ${carro.marca}`)
    console.log(`MODELO: ${carro.modelo}`)
    console.log(`ANO: ${carro.ano}`)
}

function ex16(){
    const prompt = require(`prompt-sync`)()

    const array = [1,2,3,4,5]

    const array_dobro = array.map(a => a * 2)

    console.log(array_dobro)

}
ex16()