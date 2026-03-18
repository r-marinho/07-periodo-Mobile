Este é o seu roteiro de aula, dividido em atos.
Começaremos com o conceito isolado e, conforme a complexidade aumentar, utilizaremos a navegação para organizar nossa interface.
---

### Ato 1: A Gênese – Criando o Componente Atômico

Para que nosso código seja limpo e profissional, não escreveremos tudo no arquivo principal. O segredo da escalabilidade é a **reutilização**. Vamos criar um componente que chamaremos de `CustomModalScreen`. Ele será o nosso "molde".

**O que este componente faz?** Ele recebe via *props* o tipo de animação e a cor do tema. Ele encapsula toda a lógica de abrir/fechar e o estilo do backdrop.

**Crie o arquivo `CustomModalScreen.js` na raiz do seu projeto:**

```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Componente CustomModalScreen
 * @param {string} animation - Recebe 'slide', 'fade' ou 'none' para definir a transição.
 * @param {string} themeColor - Recebe uma cor em Hexadecimal para personalizar a interface.
 */
const CustomModalScreen = ({ animation, themeColor }) => {
  
  // HOOK DE ESTADO: Controle de visibilidade
  // O Modal no React Native é 'declarativo'. Ele só aparece se 'visible' for true.
  // Iniciamos com 'false' para que o modal permaneça oculto até a interação do usuário.
  const [visible, setVisible] = useState(false);

  return (
    // SAFEAREAVIEW: Protege o conteúdo contra recortes físicos (Notch) e barras de status.
    // Usamos um array no style para combinar o estilo fixo com uma cor de fundo dinâmica.
    // O '+ 10' no final da themeColor aplica uma transparência de 10% (padrão Hexadecimal).
    <SafeAreaView style={[styles.screenContainer, { backgroundColor: themeColor + '10' }]}>
      
      {/* EXIBIÇÃO DO MODO: Mostra ao usuário qual tipo de animação está sendo testada */}
      <Text style={[styles.headerText, { color: themeColor }]}>
        Modo: {animation.toUpperCase()}
      </Text>
      
      {/* BOTÃO DE ATIVAÇÃO: Ao ser pressionado (onPress), altera o estado para 'true' */}
      <TouchableOpacity 
        style={[styles.mainButton, { backgroundColor: themeColor }]} 
        onPress={() => setVisible(true)}
      >
        <Text style={styles.buttonText}>ABRIR MODAL {animation.toUpperCase()}</Text>
      </TouchableOpacity>

      {/* COMPONENTE MODAL: A camada sobreposta de alto nível */}
      <Modal
        animationType={animation} // Define como o modal entra na tela (slide, fade ou none)
        transparent={true}        // Essencial para que possamos ver o overlay escurecido por baixo
        visible={visible}          // Conecta a visibilidade ao nosso estado 'visible'
        // ACESSIBILIDADE ANDROID: Permite fechar o modal ao apertar o botão físico de voltar
        onRequestClose={() => setVisible(false)} 
      >
        {/* 
            ESTRATÉGIA DE BACKDROP (FUNDO):
            Este TouchableOpacity ocupa a tela toda (flex: 1) e serve para capturar
            toques fora do card branco. Ao tocar aqui, o modal fecha.
            activeOpacity={1} garante que o fundo não mude de cor ao ser clicado.
        */}
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPressOut={() => setVisible(false)} // Fecha o modal ao detectar toque fora do card
        >
          {/* 
              CARD DO MODAL (O CONTEÚDO):
              Envolvido em uma View para que toques dentro dele não fechem o modal acidentalmente,
              pois a View não propaga o evento de clique para o TouchableOpacity pai.
          */}
          <View style={styles.modalCard}>
            
            {/* INDICADOR VISUAL: Barra colorida no topo para reforçar a identidade da aba */}
            <View style={[styles.colorIndicator, { backgroundColor: themeColor }]} />
            
            <Text style={styles.modalTitle}>Animação {animation}</Text>
            
            <Text style={styles.modalBody}>
              Esta transição demonstra o comportamento nativo do tipo "{animation}".
            </Text>

            {/* BOTÃO DE FECHAMENTO MANUAL: Uma alternativa clara de saída dentro do card */}
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeButtonText}>FECHAR</Text>
            </TouchableOpacity>
            
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

// Estilos detalhados para garantir uma interface limpa
const styles = StyleSheet.create({
  // Container principal da tela que recebe o componente
  screenContainer: { 
    flex: 1,                    // Faz a View ocupar 100% do espaço disponível na tela
    justifyContent: 'center',    // Alinha o botão de abrir no centro vertical (eixo principal)
    alignItems: 'center',        // Alinha o botão de abrir no centro horizontal (eixo secundário)
    padding: 20                  // Garante uma margem de segurança nas laterais da tela
  },

  // Estilo do título que identifica o tipo de animação na tela
  headerText: { 
    fontSize: 24,               // Tamanho grande para hierarquia visual de título
    fontWeight: '900',          // Peso máximo da fonte para dar destaque e clareza
    marginBottom: 20            // Afasta o título do botão que vem logo abaixo
  },

  // Estilo do botão que dispara a abertura do Modal
  mainButton: { 
    paddingVertical: 15,        // Espaçamento interno em cima e embaixo para aumentar a área de toque
    paddingHorizontal: 30,      // Espaçamento interno nas laterais para o botão não ficar "apertado"
    borderRadius: 12,           // Arredonda as bordas para um visual moderno e amigável
    elevation: 4                // Adiciona uma sombra projetada (específico para Android)
  },

  // Estilo do texto dentro do botão principal
  buttonText: { 
    color: '#fff',              // Branco para garantir contraste máximo com as cores de fundo
    fontSize: 16,               // Tamanho padrão de leitura confortável para botões
    fontWeight: 'bold'          // Negrito para destacar a ação do botão
  },

  // Camada de fundo que sobrepõe a tela quando o modal abre (Backdrop)
  modalOverlay: { 
    flex: 1,                    // Ocupa toda a extensão da tela para bloquear interações no fundo
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cor preta com 70% de transparência para dar foco ao Modal
    justifyContent: 'center',    // Centraliza o card branco verticalmente
    alignItems: 'center'         // Centraliza o card branco horizontalmente
  },

  // O card branco que contém a informação do Modal
  modalCard: { 
    width: '80%',               // Ocupa 80% da largura da tela, deixando as bordas do fundo visíveis
    backgroundColor: '#fff',     // Fundo branco sólido para legibilidade
    borderRadius: 20,           // Bordas bem arredondadas para transmitir suavidade
    padding: 25,                // Espaçamento interno para o conteúdo não tocar nas bordas do card
    alignItems: 'center',       // Centraliza todos os textos e botões dentro do card
    overflow: 'hidden'          // Corta qualquer elemento filho que tente sair do limite arredondado do card
  },

  // Linha colorida no topo do modal para identificação visual rápida
  colorIndicator: { 
    width: '120%',              // Um pouco maior que o card para cobrir as curvas das bordas
    height: 10,                 // Espessura da barra colorida
    position: 'absolute',       // Retira do fluxo de texto para "colar" no topo do card
    top: 0                      // Fixa exatamente na extremidade superior do Modal
  },

  // Título interno do Modal
  modalTitle: { 
    fontSize: 22,               // Tamanho de destaque para o título interno
    fontWeight: 'bold',         // Negrito para autoridade da informação
    marginTop: 15,              // Espaço para não encostar na barra colorida do topo
    marginBottom: 10            // Espaço antes do texto descritivo
  },

  // Texto descritivo que explica a animação ao usuário
  modalBody: { 
    fontSize: 16,               // Tamanho padrão para leitura de corpo de texto
    textAlign: 'center',        // Centraliza o texto para manter a simetria do card
    color: '#666',              // Cinza escuro para ser menos agressivo que o preto puro
    marginBottom: 20            // Espaço antes do botão de fechar
  },

  // Botão secundário para fechar o Modal (Estilo Ghost/Outline)
  closeButton: { 
    borderWidth: 1,             // Adiciona uma borda fina em vez de fundo sólido
    borderColor: '#ddd',        // Cor de borda neutra para não competir com o botão principal
    paddingVertical: 10,        // Altura do botão de fechar
    paddingHorizontal: 20,      // Largura do botão de fechar
    borderRadius: 8             // Bordas levemente arredondadas
  },

  // Texto do botão de fechar
  closeButtonText: { 
    color: '#666',              // Cor neutra para indicar uma ação secundária ou de cancelamento
    fontWeight: 'bold'          // Negrito para facilitar a leitura da ação de saída
  },
});

export default CustomModalScreen;
```

**Observe que o `animationType={animation}` é o que dita a regra principal. Ao passar `slide`, o React Native entende que deve mover o componente do eixo inferior para o centro. Note o uso de `onPressOut` no `TouchableOpacity` externo; isso garante que, se o usuário tocar na área escura, o modal será destruído visualmente através do `setVisible(false)`.** 

---

### Ato 2: O Conflito – Por que precisamos de Navegação?

Agora, vamos tentar usar esse componente no nosso `App.js`. Inicialmente, vamos colocar apenas o tipo **Slide**.

**Edite seu `App.js` para este estado inicial:**

```javascript
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomModalScreen from './CustomModalScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Testando o primeiro tipo: Slide */}
      <CustomModalScreen animation="slide" themeColor="#2196F3" />
    </SafeAreaProvider>
  );
}
```

**Agora, imaginem que precisamos testar o tipo **Fade**. Se eu colocar outro botão abaixo do primeiro no mesmo `App.js`, nossa tela começará a ficar poluída. Teríamos vários estados `visible` no mesmo arquivo, o que geraria confusão de código (o famoso 'Código Espaguete'). No mundo real, diferentes tipos de modais pertencem a diferentes contextos ou telas."**

Para resolver isso e apresentar as três animações de forma organizada, vamos implementar a **Navegação por Abas (Bottom Tabs)**.

---

### Ato 3: A Solução – Implementando a Navegação

Primeiro, garanta que as dependências foram instaladas (no Codespaces):
`npx expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context`

Agora, vamos transformar nosso `App.js` em um orquestrador. Cada aba chamará o nosso componente externo, mas injetando uma "personalidade" (prop) diferente.

**Refatore o `App.js` completamente:**

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importamos nosso componente externo
import CustomModalScreen from './CustomModalScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' }
          }}
        >
          {/* 
              ATO FINAL: Criamos as três abas.
              Cada uma reutiliza o CustomModalScreen, mas com animações distintas.
          */}
          
          <Tab.Screen name="SLIDE">
            {() => <CustomModalScreen animation="slide" themeColor="#2196F3" />}
          </Tab.Screen>
          
          <Tab.Screen name="FADE">
            {() => <CustomModalScreen animation="fade" themeColor="#4CAF50" />}
          </Tab.Screen>
          
          <Tab.Screen name="NONE">
            {() => <CustomModalScreen animation="none" themeColor="#FF9800" />}
          </Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

---

### Ato 4: Conclusão e Análise das Características

Agora execute no terminal `npx expo start --tunnel` para rodar o projeto

1.  **Modularização:** Ao mover o Modal para `CustomModalScreen.js`, isolamos a lógica. Se precisarmos mudar o estilo do botão de fechar, mudamos em um único lugar e todas as três abas serão atualizadas.
2.  **O Tipo Slide (Aba 1):** Note como ele sobe do chão da tela. É ideal para formulários ou seleções de fotos, onde o usuário sente que está "puxando" uma nova tarefa para cima da atual.
3.  **O Tipo Fade (Aba 2):** Veja a suavidade. O card branco não se move, ele apenas se materializa. Usamos o `themeColor` verde aqui para simbolizar sucesso ou notificações informativas. A transparência do fundo (`rgba`) combinada com o `fade` cria uma profundidade visual superior.
4.  **O Tipo None (Aba 3):** Esta é a transição bruta. Use-a quando a performance for o único objetivo ou quando o modal for tão pequeno que uma animação distrairia o usuário.
5.  **Gerenciamento de Estado:** Cada aba mantém seu próprio estado `visible`. Ao alternar entre as abas, o React monta e desmonta os componentes, garantindo que um modal aberto na aba "Slide" não interfira na visualização da aba "Fade".

**Dica:** evite modais que ocupam 100% da largura da tela. Use sempre a técnica do **80% de largura** com o fundo escurecido que implementamos no estilo `modalCard`. Isso mantém o usuário situado no aplicativo, reduzindo a ansiedade e melhorando a usabilidade.

Pronto para testar? Execute o comando no terminal e sinta a diferença entre os três tipos de movimento!
