Olá, futuro mestre do React Native! Prepare o seu ambiente, pois hoje não vamos apenas escrever código; vamos construir uma arquitetura de software mobile. Como seu instrutor, guiarei você por um roteiro evolutivo. Começaremos com o conceito isolado e, conforme a complexidade aumentar, utilizaremos a navegação para organizar nossa interface.

Este é o seu roteiro de aula, dividido em quatro grandes atos.

---

### Ato 1: A Gênese – Criando o Componente Atômico

Para que nosso código seja limpo e profissional, não escreveremos tudo no arquivo principal. O segredo da escalabilidade é a **reutilização**. Vamos criar um componente que chamaremos de `CustomModalScreen`. Ele será o nosso "molde".

**O que este componente faz?** Ele recebe via *props* o tipo de animação e a cor do tema. Ele encapsula toda a lógica de abrir/fechar e o estilo do backdrop.

**Crie o arquivo `CustomModalScreen.js` na raiz do seu projeto:**

```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomModalScreen = ({ animation, themeColor }) => {
  // O estado 'visible' controla a vida do Modal. 
  // Iniciamos como falso para que ele não "nasça" aberto.
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.screenContainer, { backgroundColor: themeColor + '10' }]}>
      <Text style={[styles.headerText, { color: themeColor }]}>
        Modo: {animation.toUpperCase()}
      </Text>
      
      <TouchableOpacity 
        style={[styles.mainButton, { backgroundColor: themeColor }]} 
        onPress={() => setVisible(true)}
      >
        <Text style={styles.buttonText}>ABRIR MODAL {animation.toUpperCase()}</Text>
      </TouchableOpacity>

      <Modal
        animationType={animation} 
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        {/* O Overlay é o fundo escurecido. O toque aqui dispara o fechamento. */}
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPressOut={() => setVisible(false)}
        >
          {/* O Card contém o conteúdo real. O overflow: hidden garante bordas arredondadas perfeitas. */}
          <View style={styles.modalCard}>
            <View style={[styles.colorIndicator, { backgroundColor: themeColor }]} />
            <Text style={styles.modalTitle}>Animação {animation}</Text>
            <Text style={styles.modalBody}>
              Esta transição demonstra o comportamento nativo do tipo "{animation}".
            </Text>
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

// Estilos detalhados para garantir uma interface moderna e limpa
const styles = StyleSheet.create({
  screenContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  headerText: { fontSize: 24, fontWeight: '900', marginBottom: 20 },
  mainButton: { paddingVertical: 15, paddingHorizontal: 30, borderRadius: 12, elevation: 4 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 25, alignItems: 'center', overflow: 'hidden' },
  colorIndicator: { width: '120%', height: 10, position: 'absolute', top: 0 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 15, marginBottom: 10 },
  modalBody: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 20 },
  closeButton: { borderWidth: 1, borderColor: '#ddd', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  closeButtonText: { color: '#666', fontWeight: 'bold' },
});

export default CustomModalScreen;
```

**Explicação do Professor:** Observe que o `animationType={animation}` é o que dita a regra de ouro. Ao passar `slide`, o React Native entende que deve mover o componente do eixo inferior para o centro. Note o uso de `onPressOut` no `TouchableOpacity` externo; isso garante que, se o usuário tocar na área escura, o modal será destruído visualmente através do `setVisible(false)`.

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

**O Problema Didático:** "Alunos, agora imaginem que precisamos testar o tipo **Fade**. Se eu colocar outro botão abaixo do primeiro no mesmo `App.js`, nossa tela começará a ficar poluída. Teríamos vários estados `visible` no mesmo arquivo, o que geraria confusão de código (o famoso 'Código Espaguete'). No mundo real, diferentes tipos de modais pertencem a diferentes contextos ou telas."

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

Agora que o projeto está rodando com `npx expo start --tunnel`, vamos analisar o que construímos nesta aula:

1.  **Modularização:** Ao mover o Modal para `CustomModalScreen.js`, isolamos a lógica. Se precisarmos mudar o estilo do botão de fechar, mudamos em um único lugar e todas as três abas serão atualizadas.
2.  **O Tipo Slide (Aba 1):** Note como ele sobe do chão da tela. É ideal para formulários ou seleções de fotos, onde o usuário sente que está "puxando" uma nova tarefa para cima da atual.
3.  **O Tipo Fade (Aba 2):** Veja a suavidade. O card branco não se move, ele apenas se materializa. Usamos o `themeColor` verde aqui para simbolizar sucesso ou notificações informativas. A transparência do fundo (`rgba`) combinada com o `fade` cria uma profundidade visual superior.
4.  **O Tipo None (Aba 3):** Esta é a transição bruta. Use-a quando a performance for o único objetivo ou quando o modal for tão pequeno que uma animação distrairia o usuário.
5.  **Gerenciamento de Estado:** Cada aba mantém seu próprio estado `visible`. Ao alternar entre as abas, o React monta e desmonta os componentes, garantindo que um modal aberto na aba "Slide" não interfira na visualização da aba "Fade".

**Dica do Professor:** No mercado de trabalho, evite modais que ocupam 100% da largura da tela. Use sempre a técnica do **80% de largura** com o fundo escurecido que implementamos no estilo `modalCard`. Isso mantém o usuário situado no aplicativo, reduzindo a ansiedade e melhorando a usabilidade.

Pronto para testar? Execute o comando no terminal e sinta a diferença entre as três físicas de movimento!