Aqui está o conteúdo completo para o seu e-book, estruturado de forma didática e profissional, pronto para ser consumido pelos seus alunos.

---

# 📘 E-book: Domine o Estilo no React Native
**Professor:** Especialista em Desenvolvimento Mobile  
**Assunto:** Estilização, Flexbox e Design de Interfaces

---

## 📑 Sumário
1. [Introdução](#introdução)
2. [Conceitos Fundamentais](#conceitos-fundamentais)
3. [Estratégias de Estilização](#estratégias-de-estilização)
    - [Estilos Inline](#exemplo-1-estilos-inline)
    - [StyleSheet no Arquivo](#exemplo-2-stylesheet-interno)
    - [Estilos Externos (Modularização)](#exemplo-3-estilos-externos)
4. [Mastering Flexbox](#mastering-flexbox)
    - [Eixo Principal vs Eixo Cruzado](#eixo-principal-vs-eixo-cruzado)
    - [Layouts Responsivos](#exemplo-4-flexbox-na-prática)
5. [Componentes Reutilizáveis](#exemplo-5-componentes-personalizados)
6. [Guia de Referência Rápida (Propriedades)](#guia-de-referência-rápida)
7. [Conclusão](#conclusão)

---
## 📑 Comandos de criação dos projetos

> ```bash
> npx create-expo-app ex01 --template blank
> ```
---

## 1. Introdução

Seja bem-vindo ao guia definitivo de estilização no **React Native**. Se você vem do desenvolvimento Web, vai se sentir em casa, mas com algumas adaptações importantes. No React Native, não usamos arquivos `.css`. Em vez disso, utilizamos objetos JavaScript para definir como nossa interface deve se parecer.

---

## 2. Conceitos Fundamentais

Antes de colocarmos a mão na massa, precisamos entender as três regras de ouro do estilo no mobile:

### A. O Padrão camelCase
No CSS web, usamos `background-color`. No React Native, como estamos lidando com objetos JavaScript, as chaves não podem ter hífens. Usamos o padrão **camelCase**:
*   `background-color` ➡️ `backgroundColor`
*   `font-size` ➡️ `fontSize`
*   `justify-content` ➡️ `justifyContent`

### B. Unidades de Medida (DIPs)
Aqui não escrevemos `px`, `em` ou `rem`. Os valores são numéricos e representam **unidades de densidade independente de pixel (DIP)**. 
*   **Por que?** Isso garante que um botão com `height: 50` tenha o mesmo tamanho físico em um iPhone com tela Retina ou em um Android de entrada. O React Native faz o cálculo da densidade para você.

### C. Flexbox por Padrão
Diferente da Web, onde o padrão é `display: block`, no React Native **todos os contêineres (`View`) já são Flexbox por padrão**. Além disso, a direção padrão (`flexDirection`) é `column` (vertical).

---

## 3. Estratégias de Estilização

### Exemplo 1: Estilos Inline
Ideal para testes rápidos ou estilos dinâmicos que mudam com o estado do componente.

```javascript
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Text style={{ fontSize: 24, color: '#333' }}>Olá, React Native!</Text>
    </View>
  );
}
```

### Exemplo 2: StyleSheet Interno
A forma mais comum. Usamos `StyleSheet.create` para ganhar performance (o React Native envia o estilo apenas uma vez através da "bridge").

```javascript
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estilos Organizados!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  text: {
    fontSize: 24,
    color: '#006064',
    fontWeight: 'bold',
  },
});
```

### Exemplo 3: Estilos Externos
Para projetos grandes, a modularização é essencial. Separamos o design da lógica.

**styles.js**
```javascript
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffecb3',
  },
  text: {
    fontSize: 24,
    color: '#ff6f00',
    fontStyle: 'italic',
  },
});
```

**App.js**
```javascript
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles'; // Importando o arquivo externo

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estilos Externos!</Text>
    </View>
  );
}
```

---

## 4. Mastering Flexbox

O Flexbox no mobile é a ferramenta que organiza os elementos na tela.

### Eixo Principal vs Eixo Cruzado
*   **Eixo Principal (Main Axis):** Definido pelo `flexDirection`. Se for `column` (padrão), o eixo é vertical.
*   **Eixo Cruzado (Cross Axis):** Sempre perpendicular ao principal. Se o principal é vertical, o cruzado é horizontal.

| Propriedade | Onde Alinha |
| :--- | :--- |
| **justifyContent** | Alinha no Eixo Principal |
| **alignItems** | Alinha no Eixo Cruzado |
| **alignSelf** | Alinha um item específico, ignorando o pai |

### Exemplo 4: Flexbox na Prática (Layout Lado a Lado)
```javascript
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}><Text style={styles.text}>1</Text></View>
      <View style={[styles.box, { backgroundColor: '#1976d2' }]}><Text style={styles.text}>2</Text></View>
      <View style={[styles.box, { backgroundColor: '#1565c0' }]}><Text style={styles.text}>3</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Alinha horizontalmente
    justifyContent: 'space-around', // Espaço entre os itens
    alignItems: 'center', // Centraliza verticalmente
    backgroundColor: '#e3f2fd',
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: { color: '#fff', fontWeight: 'bold' },
});
```

---

## 5. Exemplo 5: Componentes Personalizados
A verdadeira produtividade vem de criar seus próprios componentes estilizados.

```javascript
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

// Nosso componente de botão reutilizável
function CustomButton({ title, onPress, color = '#4caf50' }) {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <View style={styles.screen}>
      <CustomButton title="Sucesso" onPress={() => console.log('OK')} />
      <CustomButton title="Erro" color="#f44336" onPress={() => console.log('Erro')} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  button: { padding: 15, borderRadius: 8, width: 200, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
```

---

## 6. Guia de Referência Rápida

### 🏠 Layout
*   `flex`: Proporção de crescimento (Ex: `flex: 1` ocupa tudo).
*   `flexDirection`: Direção dos itens (`row`, `column`).
*   `flexWrap`: Quebra de linha (`wrap`, `nowrap`).
*   `gap`: Espaçamento entre itens (novo no RN).

### 🎨 Design & Bordas
*   `backgroundColor`: Cor de fundo.
*   `borderRadius`: Cantos arredondados.
*   `borderWidth` / `borderColor`: Espessura e cor da borda.
*   `opacity`: Transparência (0 a 1).

### ✍️ Tipografia
*   `color`: Cor do texto.
*   `fontSize`: Tamanho.
*   `fontWeight`: Espessura (`'bold'`, `'400'`, `'700'`).
*   `textAlign`: Alinhamento (`'left'`, `'center'`, `'right'`).

### 🌑 Sombras (Diferença entre Plataformas)
No React Native, sombras funcionam de forma diferente:
*   **iOS:** Usa `shadowColor`, `shadowOffset`, `shadowOpacity` e `shadowRadius`.
*   **Android:** Usa apenas a propriedade `elevation`.

---

## 7. Conclusão

Estilizar no React Native é sobre entender como o Flexbox governa o layout e como o JavaScript facilita a criação de designs dinâmicos. A prática leva à perfeição: tente recriar telas famosas (como o login do Instagram ou do Spotify) usando apenas esses conceitos.

**Bons estudos, desenvolvedor!** 🚀

---
*Este material foi gerado para fins educativos no curso de Desenvolvimento Mobile.*