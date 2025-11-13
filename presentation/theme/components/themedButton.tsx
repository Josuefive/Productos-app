import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

interface props extends React.ComponentProps<typeof Pressable> {
    children: string;
    icon?: keyof typeof Ionicons.glyphMap;
}


const ThemedButton = ({children, icon, ...rest}:props) => {

    const primaryColor = useThemeColor({}, 'promary')
  return (
   <Pressable
   style = {({pressed})=> [
    {
        backgroundColor: pressed ? primaryColor + '90': primaryColor,
    },
    styles.button

   ]}
   {...rest}
   >

        <Text
        style = {{color:'white' }}
        >{children}</Text>

        {
        icon && (
            <Ionicons
            name={icon}
            size = {24}
            color = 'white'
            style = {{marginHorizontal: 5}}
            /> )
        }
   </Pressable>
  )
}

export default ThemedButton

const styles = StyleSheet.create ({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})