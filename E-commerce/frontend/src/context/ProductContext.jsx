import { useContext, createContext, useState, useEffect } from "react";
import productService from "../services/productsService";

export const ProductContext = createContext()

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const loadProducts = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await productService.getProducts()
            console.log(response)
            setProducts(response.results || response)
        } catch (error) {
            setError('Error al cargar los productos');
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    }

    const refreshProducts = () => {
        loadProducts()
    };

    useEffect(() => {
        loadProducts()
    }, [])


    const value = {
        products,
        loading,
        error,
        refreshProducts,
    }

    return (
        <ProductContext value={value}>
            {children}
        </ProductContext>
    )
}

export function useProducts() {
    const context = useContext(ProductContext)

    if(!context) {
        throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
    }

    return context
}