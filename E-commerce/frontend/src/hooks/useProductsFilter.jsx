import { useContext } from "react";
import { useProducts } from "../context/ProductContext";
import { useFilters } from "../context/filtersContext";

export function useProductsFilter() {
    const { filters } = useFilters()
    const { products } = useProducts()


    const filteredProducts = products.filter(product => {
        const filterSearch = product.name.toLowerCase().includes(filters.search.toLowerCase())
        const filterCategory = filters.category === "all" || product.categoria_nombre.toLowerCase() === filters.category.toLowerCase();
        const filterMinPrice = product.precio >= Number(filters.minPrice)

        return filterSearch && filterCategory && filterMinPrice
    });

    return {
        filteredProducts
    }
}

