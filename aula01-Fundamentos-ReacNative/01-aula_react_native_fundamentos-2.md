# Fundamentos do React Native

> Material didático para aprender os conceitos básicos e fundamentais do React Native

Este material foi elaborado por um professor experiente em desenvolvimento mobile e produção de conteúdo. Contém explicações, boas práticas e três exemplos práticos que podem ser executados com Expo. Os exemplos foram pensados para rodar com o comando

```
npx create-expo-app meuApp --template blank --sdk-version 54
npx expo start --tunnel
```

# Sumário

1. Introdução
2. Componentes no React Native
3. Props e passagem de dados
4. Estado e o hook useState
5. Organização de arquivos e composição
6. Estilização básica
7. Exemplos práticos
   - Exemplo 1 Hello World
   - Exemplo 2 Componente com props
   - Exemplo 3 Componente com estado useState
8. Dicas, armadilhas comuns e próximos passos

# 1. Introdução

React Native permite criar aplicativos móveis usando JavaScript e JSX. A ideia central e reutilizar componentes que descrevem a interface e o comportamento da sua aplicação. O React Native provê componentes nativos como View, Text, Image e ScrollView que se traduzem em elementos nativos nas plataformas suportadas.

# 2. Componentes no React Native

Componentes sao as unidades de construção da interface. Hoje em dia a forma mais comum de criar componentes e por meio de funcoes, chamadas de componentes funcionais.

Exemplo de componente funcional simples

```jsx
import React from 'react'
import { View, Text } from 'react-native'

export default function MeuComponente() {
  return (
    <View>
      <Text>Exemplo de componente</Text>
    </View>
  )
}
```

Pontos importantes

- Componentes recebem props como parametros
- Componentes podem retornar outros componentes
- Mantenha componentes pequenos e focados em uma unica responsabilidade

# 3. Props e passagem de dados

Props sao propriedades que voce passa para um componente. Elas tornam o componente parametrizavel e reutilizavel.

Passagem de props e destructuring

```jsx
function Saudacao({ name }) {
  return <Text>Olá, {name}!</Text>
}
```

Exemplo de uso

```jsx
<Saudacao name="Maria" />
```

Boas praticas

- Use nomes claros para as props
- Prefira destructuring no parametro quando fizer sentido
- Para props opcionais voce pode usar valores padrao no parametro da funcao

```jsx
function Texto({ children = 'vazio' }) {
  return <Text>{children}</Text>
}
```

# 4. Estado e o hook useState

Estados sao dados que mudam ao longo do tempo e influenciam o que o componente mostra. O hook useState permite adicionar estado a componentes funcionais.

Como usar

```jsx
import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <View>
      <Text>Você clicou {count} vezes</Text>
      <Button title="Clique aqui" onPress={() => setCount(count + 1)} />
    </View>
  )
}
```

Regras basicas para hooks

- Use hooks apenas dentro de componentes funcionais ou outros hooks
- Nao chame hooks dentro de condicoes, loops ou blocos que possam alterar a ordem de chamadas
- Sempre chame hooks no topo do componente

# 5. Organizacao de arquivos e composicao

Conforme a aplicacao cresce, separe componentes em arquivos e pastas. Segue uma estrutura recomendada para projetos pequenos

```
/MeuApp
 ├ App.js
 └ components
    ├ HelloWorld.js
    ├ Greeting.js
    └ Counter.js
```

Importe o componente no App.js e faça a composicao das telas. Componentes pequenos e reutilizaveis facilitam testes e manutencao.

# 6. Estilizacao basica

React Native usa objetos JavaScript para estilos. O helper StyleSheet ajuda a organizar os estilos, mas voce pode usar objetos literais.

Exemplo

```jsx
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    margin: 10
  }
})
```

Conceitos importantes

- Flexbox e o principal modo de layout
- justifyContent alinha no eixo principal
- alignItems alinha no eixo cruzado
- Use padding e margin para espacamento

# 7. Exemplos praticos

Os tres exemplos abaixo podem ser copiados para arquivos em components e executados com Expo.

## Exemplo 1 Hello World

Versao no App.js

```jsx
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
```

Versao com componente externo

Arquivo components/HelloWorld.js

```jsx
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function HelloWorld() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
```

## Exemplo 2 Componente com props

Arquivo components/Greeting.js

```jsx
import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function Greeting(props) {
  const { name } = props
  return <Text style={styles.greeting}>Olá, {name}!</Text>
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 18,
    margin: 5
  }
})
```

Uso no App.js

```jsx
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Greeting from './components/Greeting'

export default function App() {
  return (
    <View style={styles.container}>
      <Greeting name="Maria" />
      <Greeting name="João" />
      <Greeting name="Ana" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})
```

## Exemplo 3 Componente com estado useState

Arquivo components/Counter.js

```jsx
import React, { useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Você clicou {count} vezes</Text>
      <Button title="Clique aqui" onPress={() => setCount(count + 1)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    fontSize: 20,
    marginBottom: 20
  }
})
```

Uso no App.js

```jsx
import React from 'react'
import Counter from './components/Counter'

export default function App() {
  return <Counter />
}
```

# 8. Dicas, armadilhas comuns e proximos passos

- Nao chame hooks condicionalmente, isso quebra o controle interno do React
- Prefira componentes pequenos e testaveis
- Evite repassar objetos literais em props sem memoizacao, para nao causar renders desnecessarios
- Para performance, aprenda sobre useMemo e useCallback
- Considere adotar TypeScript para tipagem de props e do estado
- Explore navegação com React Navigation, consumo de APIs com fetch ou axios, e gerenciamento global de estado com Context ou bibliotecas como Redux ou Zustand


```
A estruturação acima está separada dividindo tudo em componentes! Esse é o primeiro e mais importante passo no React Native.

No entanto, se formos unir os três componentes em um único app é fundamental usar o conceito de boas práticas de UI: **quem deve gerenciar o layout e o espaço (o `flex`) é o componente pai (neste caso, o `App`), e não os componentes filhos.**

Quando é colocado `flex: 0.2` dentro do `HelloWorld` e `flex: 0.3` dentro do `Counter`, esses componentes ficam engessados. Se precisar usar o `Counter` em outra tela no futuro, ele sempre tentará forçar esse tamanho, o que quebra a reutilização.

Aqui está a forma ideal de refatorar o código seguindo as boas práticas, passando o controle do Flexbox para o `App.js`.

---

### 1. Refatorando o `App.js` (O Gerenciador do Layout)

Vamos usar uma `SafeAreaView` (para evitar que o conteúdo fique escondido atrás do relógio/bateria do celular) e vamos usar `justifyContent: 'space-between'` ou `gap` para distribuir os itens sem precisar engessar os filhos.

```javascript
import { StyleSheet, View, SafeAreaView } from 'react-native';
import HelloWorld from './components/HelloWorld';
import Greeting from './components/Greeting';
import Counter from './components/Counter';

export default function App() {
  return (
    // SafeAreaView garante que o app não invada a barra de status (notch)
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Bloco Superior */}
        <View style={styles.headerSection}>
          <HelloWorld />
        </View>

        {/* Bloco Central (Nomes) */}
        <View style={styles.middleSection}>
          <Greeting name="Gabriel" />
          <Greeting name="Miguel" />
          <Greeting name="Rafael" />
        </View>

        {/* Bloco Inferior (Contador) */}
        <View style={styles.bottomSection}>
          <Counter />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1, // Ocupa toda a tela
    justifyContent: 'space-evenly', // Distribui o espaço por igual entre os 3 blocos
    alignItems: 'center', // Centraliza tudo horizontalmente
    paddingVertical: 20,
  },
  headerSection: {
    width: '100%', // Faz o fundo azul do HelloWorld esticar
  },
  middleSection: {
    alignItems: 'center',
  },
  bottomSection: {
    alignItems: 'center',
  }
});

```

---

### 2. Refatorando os Componentes Filhos

Agora vamos limpar os componentes para que eles apenas se preocupem com o próprio conteúdo e visual, removendo a responsabilidade de "empurrar" o layout da tela.

**`components/HelloWorld.js` (que estava como `Componente`)**

```javascript
import { View, Text, StyleSheet } from "react-native";

export default function HelloWorld() { // Nome corrigido para bater com o import
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Exemplo de Componente
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Removido o flex: 0.2. Ele agora se adapta ao conteúdo.
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#016a97',
        paddingVertical: 20, // Usamos padding para dar volume em vez de flex
        width: '100%',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    }
});

```

**`components/Greeting.js`**

```javascript
import { Text, StyleSheet } from "react-native";

// Boas práticas: desestruturar a prop diretamente nos parâmetros
export default function Greeting({ name }) {
    // Correção: Faltava aplicar o style no Text
    return <Text style={styles.greeting}>Olá, {name}!</Text>;
}

const styles = StyleSheet.create({
    greeting: {
        fontSize: 18,
        marginVertical: 5, // Margem apenas em cima e embaixo
        fontWeight: 'bold', // Um toque extra para destacar os nomes
    }
});

```

**`components/Counter.js`**

```javascript
import { useState } from "react";
import { Button, Text, StyleSheet, View } from "react-native";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.counter}>Você clicou {count} vezes.</Text>
            <Button title="Clique aqui" onPress={() => setCount(count + 1)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Removido o flex: 0.3. 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    counter: {
        fontSize: 20,
        marginBottom: 15, // Aproximou um pouco o botão do texto
    }
});

```

### O que mudou e por que isso é melhor?

1. **Inversão de Controle do Layout:** O `App.js` agora decide como o espaço é dividido usando o `justifyContent: 'space-evenly'`. Se você quiser que o contador fique colado no rodapé no futuro, basta mexer no `App.js`, e não dentro do código do `Counter`.
2. **Correção do `Greeting`:** Aplicamos o estilo que você havia criado mas não estava sendo chamado no JSX.
3. **Limpeza visual:** Trocamos o `flex` fracionado (0.2, 0.3) por `padding` dentro dos componentes. Isso faz com que os componentes tenham um tamanho real baseado no conteúdo deles, evitando que o layout quebre em telas muito pequenas ou muito grandes.

Você gostaria que eu te explicasse como usar o `ScrollView` ou `FlatList` caso essa lista de nomes (`Greeting`) cresça muito e precise de rolagem na tela?



# 9. Como executar os exemplos

1. Crie um projeto com o comando

```
npx create-expo-app meuApp --template blank --sdk-version 54
```

2. Copie a estrutura de pastas e arquivos descrita neste material
3. Execute

```
npx expo start --tunnel
```

4. Abra o Expo Go no seu celular e escaneie o QR code

# Referencias e leitura recomendada

- Documentacao oficial do React Native
- Tutorial do Expo
- React documentation sobre hooks

---

Obrigado por ler este material. Bons estudos e bom desenvolvimento mobile


## Exemplo 4 – TextInput, props e useState

Neste exemplo adicionamos um fluxo completo que integra um campo de entrada de texto, o gerenciamento de estado com o hook `useState` e a passagem de dados via props para um componente de apresentação chamado `Mensagem`. Além disso usamos `Alert` para demonstrar como exibir uma caixa de diálogo com a mensagem enviada.

A ideia principal deste exemplo e mostrar como componentes podem cooperar. Um componente pai controla o estado e repassa dados para um componente filho via props. O componente filho e responsável por apresentar os dados e executar uma acao extra, neste caso a exibicao de um alerta.

### Estrutura de arquivos

```
/MeuApp
 ├ App.js
 └ components
      ├ Mensagem.js
      └ MessageInput.js
```

### components/Mensagem.js

```jsx
// components/Mensagem.js
import React from 'react'
import { View, Text, Button, Alert, StyleSheet } from 'react-native'

export default function Mensagem({ texto, onClear }) {
  const mostrarAlerta = () => {
    Alert.alert('Mensagem', texto || 'Nenhuma mensagem')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{texto || 'Nenhuma mensagem'}</Text>
      <Button title="Mostrar (alert)" onPress={mostrarAlerta} />
      <Button title="Limpar" onPress={onClear} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10
  },
  text: {
    fontSize: 18,
    marginBottom: 8
  }
})
```

### components/MessageInput.js

```jsx
// components/MessageInput.js
import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import Mensagem from './Mensagem'

export default function MessageInput() {
  const [texto, setTexto] = useState('')
  const [exibir, setExibir] = useState('')

  const enviar = () => {
    // Podemos limpar espaços extras e validar antes de enviar
    const trimmed = texto.trim()
    setExibir(trimmed)
  }

  const limpar = () => {
    setTexto('')
    setExibir('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem"
        value={texto}
        onChangeText={setTexto}
        returnKeyType="done"
        accessible={true}
        accessibilityLabel="Campo de texto para mensagem"
      />
      <Button title="Enviar" onPress={enviar} />
      <Mensagem texto={exibir} onClear={limpar} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'stretch'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8
  }
})
```

### App.js

```jsx
import React from 'react'
import MessageInput from './components/MessageInput'

export default function App() {
  return <MessageInput />
}
```

### Explicacao detalhada do codigo

1. Controle do estado no componente pai

O componente `MessageInput` declara duas variaveis de estado com `useState`. A primeira, `texto`, e ligada ao `TextInput` e representa o valor que o usuario esta digitando. Este e um padrao conhecido como componente controlado, porque o valor exibido no campo e controlado pelo estado do componente.

A segunda variavel, `exibir`, armazena a mensagem que sera efetivamente enviada para apresentacao. Isto permite separar o que o usuario digita do que esta publicado, o que e util para casos de validacao ou processamentos intermediarios.

2. Componente Mensagem e passagem de props

`MessageInput` passa a prop `texto` para `Mensagem` e tambem passa `onClear` para que o componente filho possa solicitar que o pai limpe o estado. Esta e uma pratica recomendada para manter unidirecionalidade do fluxo de dados, onde dados sobem e descem pela arvore de componentes de forma previsivel.

3. Uso do TextInput

`TextInput` recebe `value` e `onChangeText` para funcionar como um componente controlado. Isto garante que o estado e a interface estejam sempre sincronizados. Adicionamos tambem `placeholder`, `returnKeyType` e atributos de acessibilidade para melhorar a experiencia do usuario e a compatibilidade com leitores de tela.

4. Alert

O componente `Mensagem` utiliza `Alert.alert` para exibir a mensagem em uma caixa de dialogo nativa. O uso do `Alert` e util para feedbacks rapidos, mas para fluxos mais complexos e recomendado construir componentes de modal customizados ou usar bibliotecas especificas.

5. Boas praticas aplicadas no exemplo

- Validacao minima: usamos `trim()` antes de publicar a mensagem para evitar enviar valores apenas com espacos
- Separacao de responsabilidades: o componente de entrada cuida do estado e da logica de envio, enquanto o componente de apresentacao cuida da exibicao e da acao de mostrar alerta
- Acessibilidade: adicionamos `accessibilityLabel` no TextInput para auxiliar leitores de tela
- Evitar renderizacoes desnecessarias: neste exemplo simples nao ha necessidade de otimizar, mas em componentes maiores considere `React.memo` e `useCallback` para handlers
- Nomeacao clara de props: `texto` e `onClear` sao nomes que descrevem bem a funcao de cada prop

### Possiveis melhoramentos

- Validacoes mais robustas: bloquear envio quando a mensagem estiver vazia ou muito longa
- Tratamento do teclado: envolver o layout com `KeyboardAvoidingView` para evitar que o teclado sobreponha o campo de entrada em iOS
- Localizacao: extrair strings literais para arquivos de traducao quando necessário
- Testes: escrever testes de snapshot e testes de interacao para garantir que o fluxo continua funcionando

## 8. Dicas, armadilhas comuns e proximos passos

- Nao chame hooks condicionalmente, isso quebra o controle interno do React
- Prefira componentes pequenos e testaveis
- Evite repassar objetos literais em props sem memoizacao para nao causar renders desnecessarios
- Para performance, aprenda sobre useMemo e useCallback
- Considere adotar TypeScript para tipagem de props e do estado
- Explore navegação com React Navigation, consumo de APIs com fetch ou axios, e gerenciamento global de estado com Context ou bibliotecas como Redux ou Zustand

# 9. Como executar os exemplos

1. Crie um projeto com o comando

```
npx create-expo-app meuApp --template blank --sdk-version 54
```

2. Copie a estrutura de pastas e arquivos descrita neste material
3. Instale as dependencias se necessario
4. Execute

```
npx expo start --tunnel
```

5. Abra o Expo Go no seu celular e escaneie o QR code

# Referencias e leitura recomendada

- Documentacao oficial do React Native
- Tutorial do Expo
- React documentation sobre hooks

---

Obrigado por ler este material. Se quiser, eu posso gerar o arquivo .md pronto para download ou exportar para outros formatos como PDF
