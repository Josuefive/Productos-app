import { updateCraeateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductsById } from "@/core/products/actions/get-product-by-id-action";
import { Product } from "@/core/products/interface/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

export const useProduct = (productId:string) => {
    // Aquí puedes agregar lógica específica para un solo producto si es necesario

    const queryClient = useQueryClient();
    const productIdRef = useRef(productId); // new / UUID

    const productQuery = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductsById(productId),
        staleTime: 1000 * 60 * 60, //1 hora
    })

    //Mutacion
        const productMutation = useMutation({
            mutationFn: async(data: Product) => updateCraeateProduct({
                ...data,
                id: productIdRef.current
            }),

            onSuccess(data: Product) {

                productIdRef.current = data.id;
                queryClient.invalidateQueries({
                    queryKey: ['products', 'infinite']
                })
                queryClient.invalidateQueries({
                    queryKey: ['products', data.id]
                })

                Alert.alert('Producto guardado', ` ${data.title} El producto ha sido guarado con exito`)
            }
        })

    //Manterner el ID del producto en caso de ser uno nuevo


    return {
        productQuery,
        productMutation
    };
}