import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomModalScreen from "./components/CustomModalScreen";


export default function App() {
  return (
    <SafeAreaProvider>
      <CustomModalScreen animation={"slide"} themeColor="#2196F3" />
      <CustomModalScreen animation={"fade"} themeColor="#4CAF50" />
      <CustomModalScreen animation="none" themeColor="#FF9800" />
    </SafeAreaProvider>
  );
}
