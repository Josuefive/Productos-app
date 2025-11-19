import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
// Importa StyleProp y ViewStyle
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

interface props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
    containerStyle?: StyleProp<ViewStyle>; 
}

const ThemedTextInput = ({icon, containerStyle, ...rest}:props) => {

    const primaryColor = useThemeColor({}, 'promary') // <-- Por cierto, aquí dice 'promary', ¿debería ser 'primary'?
    const textColor = useThemeColor({}, 'text')
    const [isActive, setIsActive]= useState(false)
    const inputRef = useRef<TextInput>(null)

    return (
    <View style = {[
        {
            ...styles.border,
            borderColor: isActive ? primaryColor: '#CCC',
        },
        // 3. Usa 'containerStyle' aquí
        containerStyle, 
    ]}
      onTouchStart={() => inputRef.current?.focus()}
    >

    {icon && (
        <Ionicons
        name= {icon}
        size={24}
        color={textColor}
        style = {{marginRight: 10}}
        />
    )}
      <TextInput
        ref = {inputRef}
        placeholderTextColor= "#5C5C5C"
        onFocus={() => setIsActive(true) }
        onBlur={() => setIsActive(false) }
        style = {{ // Este es tu estilo local para el TextInput
            color: textColor,
            marginRight: 10,
            flex:1,
        }}
        {...rest} // 4. '...rest' pasa el 'style' (TextStyle) original al TextInput
      />
    </View>
  )
}

export default ThemedTextInput

// ... (tus estilos de StyleSheet)
const styles = StyleSheet.create ({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding:5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
})