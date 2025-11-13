// Imports originales
import { ThemedText } from '@/presentation/theme/components/themed-text';
import ThemedButton from '@/presentation/theme/components/themedButton';
import ThemedLink from '@/presentation/theme/components/themedLink';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';

// --- 1. Imports Adicionales ---
import { authRegister } from '@/core/auth/actions/auth-actions'; // La acción que creaste
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'; // Para el store
import { router } from 'expo-router'; // Para redirigir
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');

  // --- 2. Estados del Formulario ---
  const { changeStatus } = useAuthStore(); // Para iniciar sesión después del registro
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // --- 3. Función onRegister ---
  const onRegister = async () => {
    const { fullName, email, password } = form;

    if (fullName.length === 0 || email.length === 0 || password.length === 0) {
      return; // No hacer nada si los campos están vacíos
    }

    setIsPosting(true);
    const resp = await authRegister(fullName, email, password);
    setIsPosting(false);

    // Si la respuesta es null, mostramos un error
    if (!resp) {
      Alert.alert('Error', 'No se pudo crear la cuenta, verifique los datos.');
      return;
    }

    // Si el registro fue exitoso, iniciamos sesión
    changeStatus(resp.token, resp.user);

    // Redirigimos a la pantalla principal
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
        }}>
        <View
          style={{
            paddingTop: height * 0.35,
          }}>
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: 'grey', paddingTop: 0 }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>

        {/* Nombre, Email y password */}

        <View
          style={{
            marginTop: 20,
          }}>
          {/* --- 4. Conectar los Inputs --- */}
          <ThemedTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
            value={form.fullName}
            onChangeText={value => setForm({ ...form, fullName: value })}
          />

          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={value => setForm({ ...form, email: value })}
          />

          <ThemedTextInput
            placeholder="contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={value => setForm({ ...form, password: value })}
          />
          <ThemedText 
            style={{ 
              color: 'grey', 
              fontSize: 12, 
              marginTop: 5, 
              paddingLeft: 5 
            }}>
            Debe tener al menos una mayúscula, una minúscula y un número.
          </ThemedText>
        </View>

        {/* Spacer */}
        <View style={{ marginTop: 5 }} />

        {/* --- 5. Conectar el Botón --- */}
        <ThemedButton
          icon="arrow-forward-outline"
          onPress={onRegister}
          disabled={isPosting}>
          Crear Cuenta
        </ThemedButton>

        {/* Spacer */}
        <View style={{ marginTop: 40 }} />

        {/* Enlace a registro */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ThemedText>¿ya tienes cuenta?</ThemedText>
          <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>
            Ingresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;