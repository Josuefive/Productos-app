import { Product } from '@/core/products/interface/product.interface'
import React from 'react'
import { FlatList } from 'react-native'
import { ProductCard } from './ProductCard'

interface props {
    products: Product[],
    loadNextPage: () => void,
}


const ProductList = ({products,loadNextPage}:props) => {
  return (
    <FlatList
    data = {products}
    numColumns={2}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => <ProductCard product={item}/> }

    
    />
  )
}

export default ProductList