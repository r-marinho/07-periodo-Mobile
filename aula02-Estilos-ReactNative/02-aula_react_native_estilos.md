# Estilos no React Native

Material sobre conceitos, padrões e boas práticas para trabalhar com estilos no React Native.

> Observação: exemplos de código usam Expo e podem ser executados com `npx create-expo-app MeuApp --template blank@sdk-54` e `npx expo start --tunnel`.

---

## Índice

1. Introdução
2. Conceitos básicos
3. Exemplos práticos passo a passo
   1. Exemplo 1: Estilos inline
   2. Exemplo 2: `StyleSheet.create` no mesmo arquivo
   3. Exemplo 3: Estilos em arquivo externo
   4. Exemplo 4: Flexbox para layouts responsivos
   5. Exemplo 5: Componente personalizado reutilizável
4. Propriedades mais usadas e explicações
5. Flexbox em profundidade e o eixo principal
6. Técnicas avançadas e dicas práticas
7. Platform specific e sombras cross platform
8. Responsividade, Dimensions e PixelRatio
9. Theming e arquitetura de estilos
10. Acessibilidade e tipografia escalável
11. Performance e boas práticas
12. Ferramentas úteis e próximos passos
13. Referências e leituras sugeridas

---

## 1. Introdução

O React Native trata estilos como objetos JavaScript. Embora muita coisa se pareça com CSS da web, existem diferenças importantes. Neste material você aprenderá como organizar estilos, como montar layouts responsivos com Flexbox, como aplicar temas, como otimizar performance e como garantir acessibilidade.

## 2. Conceitos básicos

* Propriedades usam camelCase, por exemplo `backgroundColor` em vez de `background-color`.
* Valores numéricos representam DIP, ou seja densidade independente de pixel. Não se escreve `px` nos valores numéricos.
* Layouts usam Flexbox como modelo primário.
* Use `StyleSheet.create` para centralizar estilos e reduzir custo de renderização em muitos casos.

## 3. Exemplos práticos passo a passo

Os exemplos abaixo evoluem do mais simples ao mais completo. Copie e cole em `App.js` de um projeto Expo para testar.

### Exemplo 1: Estilos inline

```jsx
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Text style={{ fontSize: 24, color: '#333' }}>Olá, React Native!</Text>
    </View>
  );
}
```

**Quando usar**

* Bom para testes rápidos e componentes pequenos.
* Evite usar inline em listas grandes, pois impacta performance.

### Exemplo 2: `StyleSheet.create` no mesmo arquivo

```jsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e0f7fa'
    },
    text: {
      fontSize: 24,
      color: '#006064',
      fontWeight: 'bold'
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estilos Organizados!</Text>
    </View>
  );
}
```

**Vantagens**

* Reuso de estilos.
* Menor alocação de objetos em renderizações repetidas.

### Exemplo 3: Estilos em arquivo externo

**`App.js`**

```jsx
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estilos Externos!</Text>
    </View>
  );
}
```

**`styles.js`**

```jsx
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffecb3'
  },
  text: {
    fontSize: 24,
    color: '#ff6f00',
    fontStyle: 'italic'
  }
});
```

**Organização**

* Útil em projetos maiores, facilita manutenção e separação de responsabilidades.

### Exemplo 4: Flexbox para layouts responsivos

```jsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Caixa 1</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Caixa 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e3f2fd'
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
});
```

### Exemplo 5: Componente personalizado reutilizável

```jsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <CustomButton
      title="Clique Aqui"
      onPress={() => alert('Botão pressionado!')}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
```

**Observação**

* Componentes com props para estilo permitem alto reaproveitamento.

---

## 4. Propriedades mais usadas e explicações

Segue uma lista organizada por categorias. Para cada propriedade incluí exemplos e observações sobre compatibilidade entre plataformas.

### Layout

* `alignContent`, `alignItems`, `alignSelf`
* `flex`, `flexBasis`, `flexDirection`, `flexGrow`, `flexShrink`, `flexWrap`
* `justifyContent`

### Dimensões

* `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`

### Espaçamento

* `margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`
* `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`

### Posicionamento

* `position`, `top`, `bottom`, `left`, `right`, `zIndex`

### Bordas

* `borderWidth`, `borderColor`, `borderRadius` e variações para cantos específicos

### Tipografia

* `color`, `fontSize`, `fontStyle`, `fontWeight`, `lineHeight`, `textAlign`, `textDecorationLine`

### Cores e plano de fundo

* `backgroundColor`, `opacity`

### Sombras

* iOS: `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`
* Android: `elevation`

### Outros

* `overflow`, `resizeMode` para imagens, `aspectRatio`, `transform`

---

## 5. Flexbox em profundidade e o eixo principal

* `flexDirection` define o eixo principal. Em React Native o padrão é `column`.
* `justifyContent` alinha no eixo principal.
* `alignItems` alinha no eixo cruzado.
* `alignSelf` permite sobrescrever o alinhamento de um item específico.

Exemplo de combinações úteis

```jsx
// Centralizar vertical e horizontalmente quando flexDirection é column
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}
```

---

## 6. Técnicas avançadas e dicas práticas

### Composição de estilos

* Use arrays para compor estilos dinamicamente, por exemplo `style={[styles.base, styles.primary, isActive && styles.active]}`.
* Ordem importa, o último estilo na array tem precedência.

### Estilos condicionais

```jsx
<Text style={[styles.text, large && styles.textLarge]}>Título</Text>
```

### Platform module

* `import { Platform } from 'react-native'` e use `Platform.OS === 'ios'` ou `Platform.select({ ios: ..., android: ... })`.

### SafeAreaView e StatusBar

* Use `SafeAreaView` para respeitar recortes e notch em dispositivos modernos.
* Controle `StatusBar` para ajustar altura e cor do conteúdo na barra de status.

### Animações e transformações

* Use `Animated`, `LayoutAnimation` e bibliotecas como `react-native-reanimated` quando precisar de animações performáticas.
* `transform` aceita translate, scale, rotate e skew.

### Imagens responsivas

* `Image` com `resizeMode` e `aspectRatio` ajuda a manter proporção correta.

---

## 7. Platform specific e sombras cross platform

* iOS tem propriedades de sombra detalhadas como `shadowOffset` e `shadowOpacity`.
* Android usa `elevation`. Para aproximar efeitos use combinações e wrappers com imagens quando necessário.

Exemplo simples

```jsx
card: {
  backgroundColor: '#fff',
  borderRadius: 8,
  // iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  // Android
  elevation: 4
}
```

---

## 8. Responsividade, Dimensions e PixelRatio

* `Dimensions.get('window')` retorna largura e altura da janela.
* `useWindowDimensions()` é um hook que atualiza automaticamente quando há mudança de orientação.
* `PixelRatio` permite ajustar detalhes finos em telas de alta densidade.
* Considere unidades relativas e porcentagens quando fizer layouts fluídos.

Exemplo com hook

```jsx
import { useWindowDimensions } from 'react-native';

function MyComponent() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    // render condicional com base em isLandscape
  );
}
```

---

## 9. Theming e arquitetura de estilos

### Estratégias

1. Variáveis simples em um arquivo `theme.js` exportando cores e tamanhos.
2. Context API para trocar temas dinamicamente.
3. Bibliotecas como `styled-components` ou `nativewind` para utilitarismo.

### Exemplo mínimo de theme

```js
// theme.js
export default {
  colors: {
    primary: '#1e88e5',
    background: '#f5f5f5',
    text: '#212121'
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24
  }
};
```

```jsx
// Usage
import theme from './theme';
<View style={{ backgroundColor: theme.colors.background }} />
```

---

## 10. Acessibilidade e tipografia escalável

* Use `accessibilityLabel`, `accessibilityRole` e `accessible` quando fizer controles personalizados.
* `allowFontScaling` e `Text` com `numberOfLines` ajudam na legibilidade.
* Ofereça contraste suficiente entre texto e fundo.

---

## 11. Performance e boas práticas

* Prefira `StyleSheet.create` para estilos estáticos.
* Evite objetos de estilo inline dentro de listas ou renderizações frequentes.
* Use `memo`, `useMemo` e `useCallback` para evitar renderizações desnecessárias.
* Reduza a complexidade de hierarquia de Views quando possível.
* Evite recalcular dimensões complexas no render, prefira hooks e efeitos.


---

## 12. Ferramentas úteis e próximos passos

* React Native Debugger
* Flipper
* Storybook para componentes
* Bibliotecas de utilitários como `react-native-gesture-handler` e `react-native-reanimated`

---

## 13. Referências e leituras sugeridas

* Documentação oficial do React Native
* Documentação do Expo
* Guias sobre Flexbox

---

## Como executar os exemplos com Expo

1. Crie o app com `npx create-expo-app MeuApp --template blank`.
2. Entre na pasta `MeuApp` e execute `npx expo start --tunnel`.
3. Abra o Expo Go no celular e escaneie o QR Code mostrado no terminal.

---

## Estrutura proposta para projetos

```
MeuApp/
├─ App.js
├─ package.json
├─ src/
│  ├─ components/
│  │  └─ CustomButton.js
│  ├─ styles/
│  │  └─ index.js
│  ├─ theme.js
│  └─ screens/
│     └─ HomeScreen.js
└─ assets/
```

---

