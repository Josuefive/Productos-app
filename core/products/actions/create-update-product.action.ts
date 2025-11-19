import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interface/product.interface";

// 1. La función principal que dirige el flujo
export const updateCraeateProduct = (product: Partial<Product>): Promise<Product> => {
    
    // Asegurarse de que stock y price son números válidos (buena práctica)
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    // Lógica del profesor: Si tiene ID Y el ID NO es 'new' (es decir, es un ID real para actualizar)
    if (product.id && product.id !== 'new') {
        return updateProduct(product);
    }

    // Si no tiene ID, o si el ID es 'new' (indicando que es una creación)
    return createProduct(product);
}

// 2. Función de actualización (debe devolver el producto actualizado)
const updateProduct = async(product: Partial<Product>): Promise<Product> =>{

    const {id, images = [], user, ...rest } = product;
    try {
        const {data} = await productsApi.patch<Product>(`/products/${id}`, {
            //TODO: images
            ...rest
        });
        return data; // Retorna el producto actualizado
    } catch (error) {
        throw new Error('Error al actualizar el producto')
    }
}


// 3. Función de creación (debe devolver el producto creado)
async function createProduct(product: Partial<Product>): Promise<Product> {
    const {id, images = [], user, ...rest } = product;
    try {
        const {data} = await productsApi.post<Product>(`/products`, {
            //TODO: images
            ...rest
        });
        return data; // Retorna el nuevo producto con su ID real
    } catch (error) {
        throw new Error('Error al crear el producto') // Mensaje corregido
    }
}