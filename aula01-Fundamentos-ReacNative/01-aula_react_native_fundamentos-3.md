# Fundamentos do React Native

> Material didático para aprender os conceitos básicos e fundamentais do React Native

Este material foi elaborado por um professor experiente em desenvolvimento mobile e produção de conteúdo. Contém explicações, boas práticas e quatro exemplos práticos que podem ser executados com Expo. Os exemplos foram pensados para rodar com o comando

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
   7.1 Exemplo 1 — Hello World
   7.2 Exemplo 2 — Componente com props
   7.3 Exemplo 3 — Componente com estado (useState)
   7.4 Exemplo 4 — TextInput, props e useState (Mensagem + MessageInput)
8. Boas práticas de layout e composição (App como gerenciador de layout)
9. Dicas, armadilhas comuns e próximos passos
10. Como executar os exemplos
11. Referências e leitura recomendada

# 1. Introdução

React Native permite criar aplicativos móveis usando JavaScript e JSX. A ideia central é reutilizar componentes que descrevem a interface e o comportamento da sua aplicação. O React Native provê componentes nativos como `View`, `Text`, `Image` e `ScrollView` que se traduzem em elementos nativos nas plataformas suportadas.

# 2. Componentes no React Native

Componentes são as unidades de construção da interface. Hoje em dia a forma mais comum de criar componentes é por meio de funções, chamadas de componentes funcionais.

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

- Componentes recebem props como parâmetros
- Componentes podem retornar outros componentes
- Mantenha componentes pequenos e focados em uma única responsabilidade

# 3. Props e passagem de dados

Props são propriedades que você passa para um componente. Elas tornam o componente parametrizável e reutilizável.

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

Boas práticas

- Use nomes claros para as props
- Prefira destructuring no parâmetro quando fizer sentido
- Para props opcionais você pode usar valores padrão no parâmetro da função

```jsx
function Texto({ children = 'vazio' }) {
  return <Text>{children}</Text>
}
```

# 4. Estado e o hook useState

Estados são dados que mudam ao longo do tempo e influenciam o que o componente mostra. O hook `useState` permite adicionar estado a componentes funcionais.

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

Regras básicas para hooks

- Use hooks apenas dentro de componentes funcionais ou outros hooks
- Não chame hooks dentro de condições, loops ou blocos que possam alterar a ordem de chamadas
- Sempre chame hooks no topo do componente

# 5. Organização de arquivos e composição

Conforme a aplicação cresce, separe componentes em arquivos e pastas. Segue uma estrutura recomendada para projetos pequenos

```
/MeuApp
 ├ App.js
 └ components
    ├ HelloWorld.js
    ├ Greeting.js
    └ Counter.js
```

Importe o componente no `App.js` e faça a composição das telas. Componentes pequenos e reutilizáveis facilitam testes e manutenção.

# 6. Estilização básica

React Native usa objetos JavaScript para estilos. O helper `StyleSheet` ajuda a organizar os estilos, mas você pode usar objetos literais.

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

- Flexbox é o principal modo de layout
- `justifyContent` alinha no eixo principal
- `alignItems` alinha no eixo cruzado
- Use `padding` e `margin` para espaçamento

# 7. Exemplos práticos

Os quatro exemplos abaixo podem ser copiados para arquivos em `components` e executados com Expo.

## 7.1 Exemplo 1 — Hello World

Versão no `App.js`

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

Versão com componente externo

Arquivo `components/HelloWorld.js`

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

## 7.2 Exemplo 2 — Componente com props

Arquivo `components/Greeting.js`

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

Uso no `App.js`

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

## 7.3 Exemplo 3 — Componente com estado (useState)

Arquivo `components/Counter.js`

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

Uso no `App.js`

```jsx
import React from 'react'
import Counter from './components/Counter'

export default function App() {
  return <Counter />
}
```

## 7.4 Exemplo 4 — TextInput, props e useState (Mensagem + MessageInput)

Neste exemplo adicionamos um fluxo completo que integra um campo de entrada de texto, o gerenciamento de estado com o hook `useState` e a passagem de dados via props para um componente de apresentação chamado `Mensagem`. Além disso usamos `Alert` para demonstrar como exibir uma caixa de diálogo com a mensagem enviada.

A ideia principal deste exemplo é mostrar como componentes podem cooperar. Um componente pai controla o estado e repassa dados para um componente filho via props. O componente filho é responsável por apresentar os dados e executar uma ação extra, neste caso a exibição de um alerta.

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

### App.js (uso do exemplo 4)

```jsx
import React from 'react'
import MessageInput from './components/MessageInput'

export default function App() {
  return <MessageInput />
}
```

### Explicação detalhada do código

1. Controle do estado no componente pai

O componente `MessageInput` declara duas variáveis de estado com `useState`. A primeira, `texto`, é ligada ao `TextInput` e representa o valor que o usuário está digitando. Este é um padrão conhecido como componente controlado, porque o valor exibido no campo é controlado pelo estado do componente.

A segunda variável, `exibir`, armazena a mensagem que será efetivamente enviada para apresentação. Isto permite separar o que o usuário digita do que está publicado, o que é útil para casos de validação ou processamentos intermediários.

2. Componente Mensagem e passagem de props

`MessageInput` passa a prop `texto` para `Mensagem` e também passa `onClear` para que o componente filho possa solicitar que o pai limpe o estado. Esta é uma prática recomendada para manter unidirecionalidade do fluxo de dados, onde dados sobem e descem pela árvore de componentes de forma previsível.

3. Uso do TextInput

`TextInput` recebe `value` e `onChangeText` para funcionar como um componente controlado. Isto garante que o estado e a interface estejam sempre sincronizados. Adicionamos também `placeholder`, `returnKeyType` e atributos de acessibilidade para melhorar a experiência do usuário e a compatibilidade com leitores de tela.

4. Alert

O componente `Mensagem` utiliza `Alert.alert` para exibir a mensagem em uma caixa de diálogo nativa. O uso do `Alert` é útil para feedbacks rápidos, mas para fluxos mais complexos é recomendado construir componentes de modal customizados ou usar bibliotecas específicas.

5. Boas práticas aplicadas no exemplo

- Validação mínima: usamos `trim()` antes de publicar a mensagem para evitar enviar valores apenas com espaços
- Separação de responsabilidades: o componente de entrada cuida do estado e da lógica de envio, enquanto o componente de apresentação cuida da exibição e da ação de mostrar alerta
- Acessibilidade: adicionamos `accessibilityLabel` no TextInput para auxiliar leitores de tela
- Evitar renderizações desnecessárias: neste exemplo simples não há necessidade de otimizar, mas em componentes maiores considere `React.memo` e `useCallback` para handlers
- Nomeação clara de props: `texto` e `onClear` são nomes que descrevem bem a função de cada prop

### Possíveis melhoramentos

- Validações mais robustas: bloquear envio quando a mensagem estiver vazia ou muito longa
- Tratamento do teclado: envolver o layout com `KeyboardAvoidingView` para evitar que o teclado sobreponha o campo de entrada em iOS
- Localização: extrair strings literais para arquivos de tradução quando necessário
- Testes: escrever testes de snapshot e testes de interação para garantir que o fluxo continua funcionando

# 8. Boas práticas de layout e composição (App como gerenciador de layout)

A estruturação dos componentes em arquivos separados é um ótimo primeiro passo. Entretanto, quando juntamos vários componentes na mesma tela é importante seguir a boa prática de deixar o `App` (ou a tela) responsável por gerenciar o layout e o espaço disponível, em vez de cada componente filho definir `flex` rígido.

Abaixo está um exemplo de `App.js` que recebe os três componentes (`HelloWorld`, `Greeting` e `Counter`) e gerencia a distribuição do espaço usando `SafeAreaView` e `justifyContent`.

O SafeAreaView da API core do React Native tem limitações em algumas versões, e a solução mais recomendada é usar a implementação do pacote react-native-safe-area-context. Abaixo segue dois trechos de códigos, o primeiro usa react-native-safe-area-context, que é a solução mais adequada. O segundo é uma alternativa sem dependência externa, usando StatusBar e Platform, caso prefira não instalar nada.
Na primeira opção é recomendado o uso do react-native-safe-area-context. Por isso, instale a dependência no seu projeto com o comando:
```bash
npm install react-native-safe-area-context
```

```javascript
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HelloWorld from './components/HelloWorld'
import Greeting from './components/Greeting'
import Counter from './components/Counter'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <HelloWorld />
          </View>

          <View style={styles.middleSection}>
            <Greeting name="Gabriel" />
            <Greeting name="Miguel" />
            <Greeting name="Rafael" />
          </View>

          <View style={styles.bottomSection}>
            <Counter />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20
  },
  headerSection: {
    width: '100%'
  },
  middleSection: {
    alignItems: 'center'
  },
  bottomSection: {
    alignItems: 'center'
  }
})
```

## Refatoração dos componentes filhos (resumo)

- `HelloWorld`: remover `flex` rígido e usar `padding` e `width: '100%'` para permitir que o componente se ajuste ao conteúdo e ao layout do pai.
- `Greeting`: aplicar os estilos corretamente no `Text` e manter o componente focado apenas na apresentação do nome.
- `Counter`: remover `flex` rígido e usar `padding` para estrutura interna.

Segunda Opção:

Explicação curta. `SafeAreaProvider` fornece o contexto necessário para que `SafeAreaView` funcione corretamente em todas as plataformas. Esta abordagem trata corretamente as áreas seguras em iOS com notch, em Android com barras e também em telas com recorte.

---

## Opção alternativa — sem dependências externas

Se não quiser instalar nada, use `StatusBar` e `Platform` para respeitar a área superior em Android e iOS. Esta solução é menos robusta que a anterior, mas funciona na maioria dos casos.


```javascript
import React from 'react'
import { StyleSheet, View, StatusBar, Platform } from 'react-native'
import HelloWorld from './components/HelloWorld'
import Greeting from './components/Greeting'
import Counter from './components/Counter'

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0

export default function App() {
  return (
    <View style={[styles.safeArea, { paddingTop: STATUS_BAR_HEIGHT }]}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <HelloWorld />
        </View>

        <View style={styles.middleSection}>
          <Greeting name="Gabriel" />
          <Greeting name="Miguel" />
          <Greeting name="Rafael" />
        </View>

        <View style={styles.bottomSection}>
          <Counter />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20
  },
  headerSection: {
    width: '100%'
  },
  middleSection: {
    alignItems: 'center'
  },
  bottomSection: {
    alignItems: 'center'
  }
})
```

# 9. Dicas, armadilhas comuns e próximos passos

- Não chame hooks condicionalmente, isso quebra o controle interno do React
- Prefira componentes pequenos e testáveis
- Evite repassar objetos literais em props sem memoização, para não causar renders desnecessários
- Para performance, aprenda sobre `useMemo` e `useCallback`
- Considere adotar TypeScript para tipagem de props e do estado
- Explore navegação com React Navigation, consumo de APIs com `fetch` ou `axios`, e gerenciamento global de estado com Context ou bibliotecas como Redux ou Zustand

# 10. Como executar os exemplos

1. Crie um projeto com o comando

```
npx create-expo-app meuApp --template blank --sdk-version 54
```

2. Copie a estrutura de pastas e arquivos descrita neste material
3. Instale as dependências se necessário
4. Execute

```
npx expo start --tunnel
```

5. Abra o Expo Go no seu celular e escaneie o QR code

# 11. Referências e leitura recomendada

- Documentação oficial do React Native
- Tutorial do Expo
- React documentation sobre hooks

---

Obrigado por ler este material. Bons estudos e bom desenvolvimento mobile

