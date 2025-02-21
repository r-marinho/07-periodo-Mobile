//Exemplo 1: Variáveis (var, let e const)
// Usando var(escopo global/função)
var nome = "Rafael";
console.log(nome);

if(true){
    var nome = "Maria";
    console.log(nome); //Maria
}
nome = 34;
console.log(nome);

let idade = 34;
console.log(idade);
if(true){
    let idade = 10;
    console.log(idade);
}
idade = "Rafael";
console.log(idade);


//Const
const PI = 3.14;
console.log(PI)
if(true){
    const PI = 3.14159;
    console.log(PI);
}

console.log(PI);
