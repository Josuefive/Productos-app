import { ThemedText } from '@/presentation/theme/components/themed-text';
import ThemedButton from '@/presentation/theme/components/themedButton';
import ThemedLink from '@/presentation/theme/components/themedLink';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import React from 'react';
import { KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native';

const LoginScreen = () => {


    const {height} = useWindowDimensions();
  return (
    <KeyboardAvoidingView
    behavior='padding'
    style= {{
        flex:1
    }}
    >

    <ScrollView style = {{
        paddingHorizontal: 40,
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
            />
               
          


            <ThemedTextInput 
            placeholder='contraseña'
            secureTextEntry
            autoCapitalize='none'
            icon = 'lock-closed-outline'
            />  
        </View>

        {/* Spacer */}
        <View style = {{marginTop: 5}}/>

        {/* Botón*/}
        <ThemedButton
        icon = "arrow-forward-outline"
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