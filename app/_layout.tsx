import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font'; // 2. Importa useFonts
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/presentation/theme/hooks/use-color-scheme';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();



  const backgroundColor = useThemeColor({}, 'background');
  const [fontsLoaded, fontError] = useFonts({
    'kanitRegular': require('../assets/fonts/Kanit-Regular.ttf'),
    'kanitBold': require('../assets/fonts/Kanit-Bold.ttf'),
    'kanitThin': require('../assets/fonts/Kanit-Thin.ttf'),
  });
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }



  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
      screenOptions={{ headerShown: false,

        headerStyle: {
        backgroundColor: backgroundColor,
    },
    contentStyle: {
        backgroundColor: backgroundColor,
    }
      }}
      >
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
 </QueryClientProvider>
  );
}
