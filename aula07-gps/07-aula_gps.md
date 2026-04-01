# Aplicações Mobile com GPS no React Native e Expo

**CENTRO UNIVERSITÁRIO DE PATOS DE MINAS – UNIPAM**  
**BACHARELADO EM SISTEMAS DE INFORMAÇÃO**  
**TURMA: 7º PERÍODO**  
**DISCIPLINA: DESENVOLVIMENTO DE SISTEMAS DE INFORMAÇÃO AVANÇADOS II**  
**PROFESSOR: RAFAEL MARINHO E SILVA**  
**TEMA: APLICAÇÕES MOBILE – GPS**

---

## 1. Introdução

Neste material, vamos desenvolver um aplicativo mobile simples com **React Native** e **Expo** para acessar a localização atual do dispositivo, solicitar permissão ao usuário e exibir as coordenadas de latitude e longitude na tela.

O objetivo da aula é apresentar, de forma prática e didática, como trabalhar com um recurso nativo muito comum em aplicações mobile. O aluno vai compreender como o aplicativo solicita permissão de localização, como obtém a posição atual e como apresenta essas informações na interface.

A implementação foi organizada para uso em sala de aula e em ambiente de desenvolvimento no **GitHub Codespaces**. O exemplo utiliza o pacote **`expo-location`**, que fornece acesso às informações de geolocalização do dispositivo e permite consultar a localização atual do usuário. A documentação oficial do Expo informa que essa biblioteca está incluída no Expo Go, permite obter a posição atual e possui um hook específico para permissões em primeiro plano, o `useForegroundPermissions()`. citeturn138110view2turn388196view1turn388196view2

---

## 2. Objetivos da aula

Ao final desta prática, o estudante deverá ser capaz de:

- criar um projeto Expo do zero;
- instalar e configurar o pacote `expo-location`;
- solicitar permissão de uso da localização em primeiro plano;
- consultar a posição atual do dispositivo;
- exibir latitude e longitude na interface;
- atualizar a localização quando necessário;
- compreender como configurar mensagens de permissão no arquivo `app.json`;
- entender a diferença entre localização em primeiro plano e localização em segundo plano.

---

## 3. Como executar os códigos no GitHub Codespaces

Siga os passos abaixo para preparar o ambiente de desenvolvimento.

### 3.1. Criar o repositório

1. Acesse o GitHub.
2. Crie um novo repositório.
3. Dê um nome ao repositório, por exemplo: **`gps_react_native`**.
4. Abra o repositório criado.
5. Clique em **Code**.
6. Selecione a opção **Codespaces**.
7. Crie um novo Codespace ou abra um já existente.

### 3.2. Criar o projeto Expo

No terminal do Codespace, execute:

```bash
npx create-expo-app exGps --template blank
```

Esse comando cria um novo projeto Expo chamado **exGps** usando o template em branco.

Depois, entre na pasta do projeto:

```bash
cd exGps
```

### 3.3. Instalar a dependência de localização

Instale o pacote `expo-location` com o comando:

```bash
npx expo install expo-location
```

A documentação oficial do Expo recomenda esse formato de instalação, pois ele garante uma versão compatível com o projeto em uso. A biblioteca fornece acesso à leitura da geolocalização do dispositivo e pode consultar a posição atual ou acompanhar atualizações de localização. citeturn138110view2

### 3.4. Executar o projeto

Depois da instalação, inicie a aplicação com:

```bash
npx expo start --tunnel
```

---

## 4. O que este aplicativo faz

Este projeto possui quatro comportamentos principais:

1. solicita permissão para acessar a localização do usuário;
2. obtém a posição atual do dispositivo;
3. exibe as coordenadas de latitude e longitude;
4. permite atualizar a posição quando o usuário tocar no botão.

Esse tipo de aplicação é muito útil como ponto de partida para projetos de mapa, rastreamento, entrega, mobilidade, logística, cadastro por endereço, geolocalização de eventos e serviços baseados em proximidade.

---

## 5. Configuração do arquivo `app.json`

Para deixar a mensagem de permissão mais adequada ao nosso idioma e ao contexto da aula, é recomendável configurar o plugin do `expo-location` no arquivo `app.json`.

A documentação do Expo mostra que o pacote pode ser configurado por meio de config plugin, e que algumas propriedades exigem novo build para surtir efeito. Entre elas está `locationWhenInUsePermission`, usada no iOS para definir a mensagem de uso da localização em primeiro plano. A mesma documentação também apresenta `isAndroidBackgroundLocationEnabled`, `isIosBackgroundLocationEnabled` e outras opções para cenários mais avançados. citeturn864080view2turn864080view3

### Exemplo de `app.json`

```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationWhenInUsePermission": "Permitir que o aplicativo acesse sua localização enquanto estiver em uso.",
          "locationAlwaysAndWhenInUsePermission": "Permitir que o aplicativo acesse sua localização em todos os momentos."
        }
      ]
    ]
  }
}
```

Para esta atividade, o uso principal é em **primeiro plano**, então a permissão de `locationWhenInUsePermission` é a mais importante. Se a aula não abordar rastreamento em segundo plano, não há necessidade de ativar recursos adicionais como localização em background.

---

## 6. Código completo do `App.js`

A seguir, está uma versão revisada e mais completa do projeto.

```javascript
import React, { useState } from "react"; // Importa o React e o hook useState para controlar os estados da aplicação.
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Importa componentes básicos da interface.
import * as Location from "expo-location"; // Importa a biblioteca responsável por acessar a geolocalização do dispositivo.

export default function App() { // Declara o componente principal da aplicação.
  const [permission, requestPermission] = Location.useForegroundPermissions(); // Controla a permissão de localização em primeiro plano.
  const [location, setLocation] = useState(null); // Armazena o objeto da localização atual.
  const [loading, setLoading] = useState(false); // Controla o estado de carregamento da consulta de localização.
  const [errorMsg, setErrorMsg] = useState(""); // Armazena mensagens de erro para exibição na tela.

  const getLocation = async () => { // Função assíncrona responsável por obter a localização atual.
    try { // Inicia o bloco de tratamento de erro.
      setLoading(true); // Ativa o indicador de carregamento.
      setErrorMsg(""); // Limpa mensagens de erro antigas.

      if (!permission?.granted) { // Verifica se a permissão ainda não foi concedida.
        const result = await requestPermission(); // Solicita a permissão ao usuário.
        if (!result.granted) { // Verifica se a permissão foi negada.
          setErrorMsg("Permissão para acessar a localização negada."); // Define a mensagem de erro em português.
          setLoading(false); // Desativa o carregamento.
          return; // Interrompe a execução da função.
        } // Finaliza a verificação da permissão.
      } // Finaliza a checagem da permissão.

      const servicesEnabled = await Location.hasServicesEnabledAsync(); // Verifica se os serviços de localização do dispositivo estão ativados.
      if (!servicesEnabled) { // Confere se a localização do aparelho está desligada.
        setErrorMsg("Os serviços de localização estão desativados no dispositivo."); // Informa o usuário sobre o problema.
        setLoading(false); // Desativa o carregamento.
        return; // Interrompe a execução.
      } // Finaliza a verificação dos serviços de localização.

      const currentLocation = await Location.getCurrentPositionAsync({ // Solicita a posição atual do dispositivo.
        accuracy: Location.Accuracy.High, // Define uma precisão mais alta para obter coordenadas mais confiáveis.
      }); // Finaliza a consulta de localização.

      setLocation(currentLocation); // Salva a localização retornada no estado.
    } catch (error) { // Captura qualquer erro ocorrido durante a execução.
      console.log("Erro ao obter a localização:", error); // Exibe o erro no console para depuração.
      setErrorMsg("Não foi possível obter a localização."); // Informa o usuário sobre a falha.
    } finally { // Bloco executado sempre ao final, com ou sem erro.
      setLoading(false); // Desativa o carregamento.
    } // Finaliza o bloco finally.
  }; // Finaliza a função getLocation.

  const handleUpdateLocation = () => { // Função chamada quando o usuário deseja atualizar a localização.
    getLocation(); // Executa novamente a consulta da posição atual.
  }; // Finaliza a função de atualização.

  return ( // Retorna a interface principal da aplicação.
    <View style={styles.container}> // Container principal da tela.
      <Text style={styles.title}>Leitura de GPS</Text> // Título exibido no topo.

      {loading ? ( // Verifica se a aplicação está consultando a localização.
        <View style={styles.loadingBox}> // Container do carregamento.
          <ActivityIndicator size="large" /> // Exibe um indicador visual de progresso.
          <Text style={styles.message}>Obtendo localização...</Text> // Mostra mensagem ao usuário.
        </View> // Finaliza o container de carregamento.
      ) : errorMsg ? ( // Verifica se existe uma mensagem de erro.
        <View style={styles.infoBox}> // Container da mensagem de erro.
          <Text style={styles.errorText}>{errorMsg}</Text> // Exibe o erro na interface.
          <TouchableOpacity style={styles.button} onPress={handleUpdateLocation}> // Botão para tentar novamente.
            <Text style={styles.buttonText}>Tentar novamente</Text> // Texto do botão.
          </TouchableOpacity> // Finaliza o botão.
        </View> // Finaliza o container de erro.
      ) : location ? ( // Verifica se já existe uma localização obtida.
        <View style={styles.infoBox}> // Container das informações de localização.
          <Text style={styles.text}>Latitude: {location.coords.latitude}</Text> // Exibe a latitude.
          <Text style={styles.text}>Longitude: {location.coords.longitude}</Text> // Exibe a longitude.
          <Text style={styles.text}>Precisão: {location.coords.accuracy} metros</Text> // Exibe a precisão informada pelo aparelho.
          <TouchableOpacity style={styles.button} onPress={handleUpdateLocation}> // Botão para atualizar a localização.
            <Text style={styles.buttonText}>Atualizar localização</Text> // Texto do botão.
          </TouchableOpacity> // Finaliza o botão de atualização.
        </View> // Finaliza o container das coordenadas.
      ) : ( // Caso ainda não exista localização e nem erro.
        <TouchableOpacity style={styles.button} onPress={handleUpdateLocation}> // Botão inicial para obter a localização.
          <Text style={styles.buttonText}>Obter localização</Text> // Texto do botão inicial.
        </TouchableOpacity> // Finaliza o botão inicial.
      )} // Finaliza a condição principal.
    </View> // Finaliza o container principal.
  ); // Finaliza o retorno da interface.
} // Finaliza o componente App.

const styles = StyleSheet.create({ // Cria a folha de estilos da aplicação.
  container: { // Estilo do container principal.
    flex: 1, // Ocupa toda a tela.
    justifyContent: "center", // Centraliza verticalmente.
    alignItems: "center", // Centraliza horizontalmente.
    backgroundColor: "#fff", // Define o fundo branco.
    padding: 20, // Adiciona espaçamento interno.
  }, // Finaliza o estilo container.
  title: { // Estilo do título.
    fontSize: 24, // Define tamanho maior para o título.
    fontWeight: "700", // Deixa o texto em negrito.
    marginBottom: 20, // Cria espaço abaixo do título.
    textAlign: "center", // Centraliza o texto.
  }, // Finaliza o estilo title.
  loadingBox: { // Estilo da área de carregamento.
    alignItems: "center", // Centraliza o conteúdo horizontalmente.
  }, // Finaliza o estilo loadingBox.
  infoBox: { // Estilo da área que exibe informações ou erros.
    alignItems: "center", // Centraliza o conteúdo.
    gap: 10, // Espaçamento entre os elementos.
  }, // Finaliza o estilo infoBox.
  text: { // Estilo do texto de coordenadas.
    fontSize: 18, // Define o tamanho da fonte.
    marginBottom: 4, // Cria um pequeno espaço abaixo.
    textAlign: "center", // Centraliza o conteúdo textual.
  }, // Finaliza o estilo text.
  message: { // Estilo das mensagens de status.
    fontSize: 16, // Define tamanho de fonte moderado.
    marginTop: 10, // Adiciona espaço acima.
    textAlign: "center", // Centraliza o texto.
  }, // Finaliza o estilo message.
  errorText: { // Estilo da mensagem de erro.
    fontSize: 16, // Define o tamanho da fonte.
    color: "#b00020", // Deixa a mensagem em vermelho escuro.
    textAlign: "center", // Centraliza o texto.
    marginBottom: 10, // Cria espaço abaixo.
  }, // Finaliza o estilo errorText.
  button: { // Estilo dos botões.
    backgroundColor: "#000000", // Define fundo preto.
    paddingVertical: 10, // Adiciona espaço interno vertical.
    paddingHorizontal: 18, // Adiciona espaço interno horizontal.
    borderRadius: 8, // Arredonda os cantos.
    minWidth: 180, // Define largura mínima.
    alignItems: "center", // Centraliza o texto no botão.
  }, // Finaliza o estilo button.
  buttonText: { // Estilo do texto dentro do botão.
    color: "#ffffff", // Define a cor branca.
    fontSize: 16, // Define tamanho da fonte.
    fontWeight: "600", // Destaca o texto.
  }, // Finaliza o estilo buttonText.
}); // Finaliza a folha de estilos.
```

---

## 7. Explicação detalhada do código

### 7.1. Importações

```javascript
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
```

Nesta versão, foram utilizados:

- **`useState`**: para guardar localização, carregamento e mensagens de erro;
- **`ActivityIndicator`**: para exibir um carregamento enquanto a localização é consultada;
- **`TouchableOpacity`**: para criar botões de toque;
- **`expo-location`**: para acessar a geolocalização do dispositivo.

A documentação do Expo informa que `expo-location` permite ler informações de geolocalização, consultar a localização atual e acompanhar atualizações de posição. citeturn138110view2

### 7.2. Permissão de localização

```javascript
const [permission, requestPermission] = Location.useForegroundPermissions();
```

Esse hook é uma forma prática de verificar e solicitar a permissão em primeiro plano.  
Segundo a documentação oficial, o hook usa internamente `requestForegroundPermissionsAsync` e `getForegroundPermissionsAsync`. citeturn388196view1turn388196view3

### 7.3. Consulta da localização atual

```javascript
const currentLocation = await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.High,
});
```

Esse comando solicita a posição atual do dispositivo.  
A documentação informa que essa operação pode levar alguns segundos, principalmente em ambientes fechados, e que o uso do parâmetro `accuracy` influencia o comportamento da consulta. citeturn388196view2

### 7.4. Verificação dos serviços de localização

```javascript
const servicesEnabled = await Location.hasServicesEnabledAsync();
```

Essa verificação é importante para avisar o usuário caso o GPS ou os serviços de localização estejam desativados no aparelho.

### 7.5. Exibição da interface

A interface foi organizada em três situações principais:

- **carregamento**;
- **erro ou permissão negada**;
- **localização encontrada**.

Esse fluxo ajuda o aluno a entender que um aplicativo real precisa tratar diferentes estados da aplicação de maneira clara.

---

## 8. Melhorias em relação ao código original

A versão original já cumpria a função básica de obter a localização, mas esta versão foi aprimorada em pontos importantes:

### 8.1. Tratamento de permissão mais completo

Agora o aplicativo verifica se a permissão existe, solicita quando necessário e trata a negativa de forma amigável.

### 8.2. Mensagens em português

As mensagens da interface foram escritas em português, deixando o material mais apropriado para a aula.

### 8.3. Melhor experiência para o usuário

O app agora informa quando está carregando, quando há erro e quando a localização foi obtida.

### 8.4. Validação dos serviços de localização

Antes de tentar obter as coordenadas, o aplicativo verifica se o serviço de localização está ativo no aparelho.

### 8.5. Estrutura mais didática

A lógica foi organizada em partes menores e mais fáceis de explicar em sala.

---

## 9. Observações importantes para a aula

### 9.1. Instalação correta

O pacote `expo-location` deve ser instalado com `npx expo install expo-location`, pois esse é o formato recomendado pela documentação do Expo. citeturn138110view2

### 9.2. Permissões em primeiro plano e segundo plano

Para esta aula, usamos apenas a localização em primeiro plano.  
A documentação do Expo diferencia `requestForegroundPermissionsAsync` e `requestBackgroundPermissionsAsync`, que correspondem a `When In Use` e `Always` no iOS. O uso em segundo plano exige configurações adicionais e é um assunto mais avançado. citeturn388196view3turn864080view1

### 9.3. Emulador e dispositivo real

Quando o app for testado no emulador, é importante garantir que a localização esteja habilitada no ambiente de simulação. A documentação do Expo orienta que, no Android Emulator ou no iOS Simulator, a localização deve estar ativada. citeturn138110view1

### 9.4. Precisão da localização

A documentação informa que a chamada `getCurrentPositionAsync` pode demorar alguns segundos e que o uso de precisão maior pode ser útil quando a localização exata é desejada. citeturn388196view2

---

## 10. Conclusão

Este projeto é uma excelente atividade introdutória para a disciplina de desenvolvimento mobile, pois une conceitos fundamentais de interface, estado, eventos e integração com um recurso nativo do dispositivo.

Ao trabalhar com localização, o aluno entende que aplicações móveis podem interagir diretamente com o ambiente real, o que amplia bastante as possibilidades de desenvolvimento. Esse conhecimento serve de base para projetos mais avançados com mapas, rastreamento, mobilidade e serviços georreferenciados.

A versão apresentada aqui foi organizada para ficar mais clara, mais completa e mais adequada ao uso em sala de aula, mantendo a simplicidade necessária para estudantes em fase de aprendizado.

---

## 11. Referência consultada

- Documentação oficial do Expo Location. citeturn138110view2turn388196view1turn388196view2turn388196view3turn864080view2turn864080view3turn864080view1
