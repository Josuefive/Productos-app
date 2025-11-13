import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import ThemedButton from '@/presentation/theme/components/themedButton';
import ThemedLink from '@/presentation/theme/components/themedLink';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native';

const LoginScreen = () => {
    const [isPosting, setIsPosting] = useState(false);
    const {login} = useAuthStore();
    const {height} = useWindowDimensions();
    const backgroundColor = useThemeColor({}, 'background');
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const onlogin = async() => {

        const {email, password} = form;

        console.log({email, password});

        if(form.email.length === 0 || form.password.length === 0) {
            return
        }
        setIsPosting(true)


        const wasSuccessful = await login(email, password);
        setIsPosting(false) 

        if (wasSuccessful) {
            router.replace('/')
            return;
        }
        alert('Error, usuario o contraseña incorrectos')
    }

  return (
    <KeyboardAvoidingView
    behavior='padding'
    style= {{
        flex:1
    }}
    >

    <ScrollView style = {{
        paddingHorizontal: 40,
        backgroundColor: backgroundColor,
    }}>
        <View 
        style = {{
            paddingTop: height * 0.35,
        }}
        >
            <ThemedText type ='title'>Ingresar</ThemedText>
            <ThemedText style = {{color: 'grey',paddingTop:0}}>
                Por favor ingrese para continuar
            </ThemedText>
        </View>

        {/* Email y password */}

        <View
        style = {{
            marginTop: 20,
        }}
        >
            <ThemedTextInput 
            placeholder='Correo electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'

            value = {form.email}
            onChangeText={(value) => setForm({...form, email: value})}
            />
               
          


            <ThemedTextInput 
            placeholder='contraseña'
            secureTextEntry
            autoCapitalize='none'
            icon = 'lock-closed-outline'


            value = {form.password}
            onChangeText={(value) => setForm({...form, password: value})}
            />  
        </View>

        {/* Spacer */}
        <View style = {{marginTop: 5}}/>

        {/* Botón*/}
        <ThemedButton
        icon = "arrow-forward-outline"
        onPress={onlogin}
        disabled={isPosting}
        
        >Ingresar</ThemedButton>

         {/* Spacer */}
        <View style = {{marginTop: 40}}/>

        {/* Enlace a registro */}
        <View style = {{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',}}
            > 
            <ThemedText>¿No tienes una cuenta?</ThemedText>
            <ThemedLink href = '/auth/register' style ={{marginHorizontal: 5}}>
                Regístrate
            </ThemedLink>

        </View>


    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen