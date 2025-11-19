import { Size } from '@/core/products/interface/product.interface';
import ProducImages from '@/presentation/products/components/ProducImages';
import { useProduct } from '@/presentation/products/hooks/useProduct';
import ThemeButtonGroup from '@/presentation/theme/components/ThemeButtonGroup';
import { ThemedView } from '@/presentation/theme/components/themed-view';
import ThemedButton from '@/presentation/theme/components/themedButton';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const ProductScreen = () => {

  const navigation = useNavigation();
  const {id} = useLocalSearchParams();
  const {productQuery, productMutation} = useProduct(`${id}`)

  // console.log('ID del producto:', id);
  // console.log('Estado de la consulta:', productQuery.status); 
  // console.log('¿Está cargando?:', productQuery.isLoading);
  // console.log('¿Hay error?:', productQuery.isError, productQuery.error);
  // console.log('Data recibida:', productQuery.data);



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
    return <Redirect href= '/(products-app)/(home)'/>
  
  }

  const product = productQuery.data!;
  

  return (
      <Formik 
      initialValues={product}
      onSubmit={ productMutation.mutate}
      >

        {
          ({values, handleSubmit, handleChange, setFieldValue}) => (
    <KeyboardAvoidingView
    behavior= {Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
        {/*TODO: producto imagenes  */}

      <ProducImages
      images={values.images}
      />

      <ThemedView style = {{marginHorizontal: 10, marginTop:20}}>
        <ThemedTextInput 
        placeholder='Titulo'
        style = {{marginVertical: 5}}
        value = {values.title}
        onChangeText={handleChange('title')}
      />

      <ThemedTextInput  
        placeholder='Slug'
         multiline numberOfLines = {5} 
         style = {{marginVertical: 5}}
         value = {values.slug}
         onChangeText={handleChange('slug')}
         />
      <ThemedTextInput  
        placeholder='Descripción'
         multiline numberOfLines = {5} 
         style = {{marginVertical: 5}}
         value = {values.description}
        onChangeText={handleChange('description')}
        />
      </ThemedView>
      
      <ThemedView
      style = {{marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        gap: 10,
      }}>
        <View style = {{flex: 1}}>
          <ThemedTextInput 
            placeholder='precio'
            value= {values.price.toString()}
            onChangeText={handleChange('price')}
            />
        </View>


        <View style = {{flex: 1}}>
          <ThemedTextInput 
            placeholder='Inventario'
            value= {values.stock.toString()}
            onChangeText={handleChange('stock')}
            />
            
        </View>

      </ThemedView>

      <ThemedView style = {{marginHorizontal:10}}>
          <ThemeButtonGroup 
            options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
            selectedOption={values.sizes}
            onSelect={(selectedSize) => {

              const newSizesValue = values.sizes.includes(selectedSize as Size)
              ? values.sizes.filter(s => s=== selectedSize)
              : [...values.sizes, selectedSize];

              setFieldValue('sizes', newSizesValue)
            }}
          
          />


           <ThemeButtonGroup 
            options={['kid', 'men', 'women', 'unisex', 'XL', ]}
            selectedOption={[values.gender]}
            onSelect={(selectedOption) => setFieldValue('gender', selectedOption)}
          
          />
      </ThemedView>

      {/* Botón para guardar las cambios */}


      <View style= {{
        marginHorizontal: 10,
        marginBottom: 50,
        marginTop: 20,
      }}>
        <ThemedButton
        icon='save-outline'
        onPress={() => handleSubmit()}
        >
            Guardar
        </ThemedButton>
      </View>

      </ScrollView>
    </KeyboardAvoidingView>
          )
        }
      </Formik>
  )
}

export default ProductScreen