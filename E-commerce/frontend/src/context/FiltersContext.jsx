import { createContext, useState, useContext } from "react";

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        minPrice: '0'
    })

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}
        >
            {children}
        </FiltersContext.Provider>
    )
}

export function useFilters() {
    const context = useContext(FiltersContext)

    if(!context) {
        throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
    }

    return context
}