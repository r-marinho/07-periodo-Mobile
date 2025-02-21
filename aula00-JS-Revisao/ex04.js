function exibirDetalhesProduto(produto){
    return `Produto: ${produto.nome}, Preço: R$${produto.preco.toFixed(2)}, Estoque: ${produto.estoque} unidades.`;
}

//
const produto = {
    nome: "Notebook",
    preco: 3000.00,
    estoque: 30
};

console.log(exibirDetalhesProduto(produto));

//ForEach
const numeros = [15,25,35,45,55];
numeros.forEach(num => {
    console.log(`Numero: ${num}`);
});

const dobrados = numeros.map(num => num*2);
console.log(dobrados);
console.log(numeros);

//filter
const maiorQue30 = numeros.filter(num => num > 30);
console.log(maiorQue30);

//find
const maiorQue40 = numeros.find(num => num > 40);
console.log(maiorQue40)

//every
const todosMaiores = numeros.every(num => num > 25);
console.log(todosMaiores);

//some
const existeMaior = numeros.some(num => num > 56);
console.log(existeMaior);