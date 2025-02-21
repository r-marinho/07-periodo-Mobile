import React from 'react';

const nome = "Rafael Marinho";

const elemento = (
  <div>
    <h1>Oi, eu sou o {nome}!</h1>
    <p>Professor do curso de Sistemas de Informação!!!</p>
  </div>
);

function App(){
  return elemento;
}

export default App;