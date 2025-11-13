import { ThemedText } from '@/presentation/theme/components/themed-text'
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color'
import React from 'react'
import { View } from 'react-native'



const HomeScreen = () => {

    const primary = useThemeColor({}, 'promary');

  return (
    <View style = {{paddingTop:100, paddingHorizontal:20}}>
      <ThemedText style = {{fontFamily: 'kanitBold',color: primary }}>Que onda Perro</ThemedText>
      <ThemedText style = {{fontFamily: 'kanitRegular'}}>¿que me dice mi loco?</ThemedText>
      <ThemedText style = {{fontFamily: 'kanitThin'}}>prrr</ThemedText>
      <ThemedText>pantalla de los productos</ThemedText>
    </View>
  )
}

export default HomeScreen