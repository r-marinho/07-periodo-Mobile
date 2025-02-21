const cores = ['vermelho', 'verde', 'azul'];
for(const cor of cores){
    console.log(cor);
}

const pessoa = {
    nome: "Rafael",
    idade: 34,
    usuario: "professor"
};

for(const chave in pessoa){
    console.log(`${chave}: ${pessoa[chave]}`);
};

//Map
const mapa = new Map();
mapa.set('nome','Rafael');
mapa.set('idade',34);
console.log(mapa.get('nome'));
console.log(mapa.get('idade'));


//WeakMap
const obj = {id: 1};
const weakmap = new WeakMap();

weakmap.set(obj, 'aluno 1');
console.log(weakmap.get(obj));