import { useProduct } from '@/presentation/products/hooks/useProduct';
import { ThemedView } from '@/presentation/theme/components/themed-view';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';


const ProductScreen = () => {

  const navigation = useNavigation();
  const {id} = useLocalSearchParams();
  const {productQuery} = useProduct(`${id}`)

  console.log('ID del producto:', id);
  console.log('Estado de la consulta:', productQuery.status); 
  console.log('¿Está cargando?:', productQuery.isLoading);
  console.log('¿Hay error?:', productQuery.isError, productQuery.error);
  console.log('Data recibida:', productQuery.data);



  useEffect(() => {
  navigation.setOptions ({
    headerRight: () => <Ionicons name = "camera-outline" size = {20}/>, 
  })
},[])


  useEffect(() => {
    if(productQuery.data) {
      navigation.setOptions ({
        title: productQuery.data.title,
      })
    }
    
    
  }, [productQuery.data])

  if(productQuery.isLoading) {
    return (
      <View style = {{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={30}/>
      </View>
    )
  }

  if(!productQuery.data) {
    return <Redirect href= '/'/>
  
  }

  const product = productQuery.data!;
  

  return (
    <KeyboardAvoidingView
    behavior= {Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
        {/*TODO: producto imagenes  */}
      <ThemedView style = {{marginHorizontal: 10, marginTop:20}}>
        <ThemedTextInput placeholder='Titulo' style = {{marginVertical: 5}}/>
        <ThemedTextInput placeholder='Descripción' multiline numberOfLines = {5} style = {{marginVertical: 5}}/>
      </ThemedView>
      
      <ThemedView
      style = {{marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        gap: 10,
      }}>
        <View style = {{flex: 1}}>
        <ThemedTextInput placeholder='precio'/>
        </View>
        <View style = {{flex: 1}}>
        <ThemedTextInput placeholder='Inventario'/>
        </View>

      </ThemedView>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ProductScreen