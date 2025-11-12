import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font'; // 2. Importa useFonts
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/presentation/theme/hooks/use-color-scheme';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();



  // 4. Carga las fuentes aquí
  const [fontsLoaded, fontError] = useFonts({
    'kanitRegular': require('../assets/fonts/Kanit-Regular.ttf'),
    'kanitBold': require('../assets/fonts/Kanit-Bold.ttf'),
    'kanitThin': require('../assets/fonts/Kanit-Thin.ttf'),
    // ...agrega aquí el resto de tus fuentes Kanit
  });

  // 5. Muestra el layout solo cuando las fuentes estén cargadas
  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Oculta el SplashScreen cuando las fuentes estén listas (o si hay error)
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Si las fuentes no han cargado, no renderices nada (o un <AppLoading />)
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
      screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
