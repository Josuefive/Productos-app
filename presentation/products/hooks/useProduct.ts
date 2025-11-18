import { getProductsById } from "@/core/products/actions/get-product-by-id-action";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (productId:string) => {
    // Aquí puedes agregar lógica específica para un solo producto si es necesario

    const productQuery = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductsById(productId),
        staleTime: 1000 * 60 * 60, //1 hora
    })

    //Mutacion


    //Manterner el ID del producto en caso de ser uno nuevo


    return {
        productQuery
    };
}