import { useContext } from "react"
// import './ProductFilters.css' // ¡Eliminado para usar solo Tailwind!
import { Search } from "lucide-react"
import { useFilters } from "../../../context/FiltersContext"

export function ProductFilters() {
    const { filters, setFilters } = useFilters()

    const handlers = {
        search: (e) => setFilters(prev => ({...prev, search: e.target.value})),
        category: (e) => setFilters(prev => ({...prev, category: e.target.value})),
        minPrice: (e) => setFilters(prev => ({...prev, minPrice: e.target.value}))
    }

    // Clases base para inputs y selects
    const INPUT_CLASSES = `
        w-full p-3 pl-10 border border-gray-300 rounded-lg 
        focus:ring-indigo-500 focus:border-indigo-500 transition-all 
        duration-200 text-gray-700 placeholder-gray-400
    `;

    // Clases específicas para el input de rango de precio (estilo personalizado de Tailwind)
    const RANGE_CLASSES = `
        w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
        range-lg [&::-webkit-slider-thumb]:bg-indigo-600 [&::-moz-range-thumb]:bg-indigo-600 
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
        [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:shadow-lg
    `;

    return (
        <div className="flex flex-col gap-6"> 
            {/* Contenedor de Búsqueda */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    placeholder="Buscar productos..."
                    className={INPUT_CLASSES}
                    type="text"
                    value={filters.search}
                    onChange={handlers.search}
                />
            </div>
            
            {/* Contenedores de Categoría y Precio */}
            <div className="flex flex-col gap-6">
                
                {/* Filtro de Categoría */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Categoría</span>
                    </div>
                    <select 
                        value={filters.category} 
                        onChange={handlers.category}
                        className={INPUT_CLASSES.replace('pl-10', 'pl-3')} // Usamos el mismo estilo sin el padding de ícono
                    >
                        <option value="all">Todas las categorías</option>
                        <option value="electronicos">Electrónicos</option>
                        <option value="electrodomesticos">Electrodomésticos</option>
                        <option value="mobiliarios">Mobiliarios</option>
                        <option value="resposteria">Resposteria</option>
                        <option value="ropa">Ropa</option>
                    </select>
                </div>

                {/* Filtro de Precio Mínimo */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Precio mínimo</span>
                        <span className="text-base font-bold text-indigo-600">${filters.minPrice}</span>
                    </div>
                    <div className="range-container">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={filters.minPrice}
                            onChange={handlers.minPrice}
                            className={RANGE_CLASSES}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}