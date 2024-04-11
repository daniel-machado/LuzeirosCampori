import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import theme from './src/theme';
import { Loading } from './src/components/Loading';
import { toastConfig } from './src/components/ToastConfig';
import { Routes } from './src/routes';

export default function App() {
  const [ fontsLoaded ] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if(!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <Routes />
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </ThemeProvider>
      
    
  );
}


