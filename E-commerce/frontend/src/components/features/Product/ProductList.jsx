import { useContext, useState } from "react"
import { ProductCard } from "./ProductCard"
import { ProductFilters } from "./ProductFilters"
import { CartContext } from "../../../context/CartContext"
import { CirclePlus, Filter, DollarSignIcon } from "lucide-react"
import { useProductsFilter } from "../../../hooks/useProductsFilter"
import { useProducts } from "../../../context/ProductContext"

export function ProductList() {
    const { products } = useProducts()
    const { filteredProducts } = useProductsFilter()

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [showDetail, setShowDetail] = useState(false)
    const { addToCart } = useContext(CartContext)

    const detailProduct = (productId) => {
        const product = products.find(p => p.id === productId)
        setSelectedProduct(product)
        setShowDetail(true)
    }

    const closeDetail = () => {
        setShowDetail(false)
        setSelectedProduct(null)
    }

    // Botón unificado a la paleta Indigo
    const ADD_TO_CART_CLASSES = `
        flex items-center justify-center gap-1 flex-1 bg-indigo-600 text-white 
        border-none p-3 rounded-md font-semibold text-sm whitespace-nowrap 
        transition-colors duration-300 cursor-pointer hover:bg-indigo-700
    `;

    // Botón unificado a la paleta Indigo
    const QUICK_VIEW_CLASSES = `
        bg-indigo-600 text-white border-none px-6 py-3 rounded-full 
        font-semibold cursor-pointer transition-colors duration-300 hover:bg-indigo-700
    `;

    return (
        <>
            <section
                className="p-4 md:p-8 max-w-7xl mx-auto mt-16 min-h-[calc(100vh-140px)] md:mt-[70px]"
            >
                <div
                    className="
                        grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr] 
                        md:gap-8 items-start
                    "
                >
                    <nav
                        className="
                            bg-white p-6 rounded-xl shadow-lg 
                            md:sticky md:top-24 md:max-h-[calc(100vh-140px)] 
                            overflow-y-auto
                        "
                    >
                        <div
                            className="
                                text-lg font-semibold text-gray-800 mb-6 pb-3 
                                border-b-2 border-gray-100 flex items-center gap-2
                            "
                        >
                            <h2 className="flex items-center gap-2"><Filter size={20} />Filtros</h2>
                        </div>
                        <ProductFilters />
                    </nav>

                    <main className="min-h-screen md:min-h-[50vh]">
                        <div className="text-center mb-12">
                            <h1 className="text-3xl font-normal text-gray-800 mb-2">Lista de productos</h1>
                            <p className="text-xl text-gray-500">Descubre nuestra colección exclusiva</p>
                        </div>

                        <div
                            className="
                                grid gap-6 mb-8 align-top 
                                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 
                            "
                        >
                            {filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="
                                        bg-gray-100 shadow-md overflow-hidden 
                                        transition-all duration-300 relative group 
                                        hover:translate-y-[-3px] hover:shadow-xl
                                        flex flex-col // AÑADIDO: HACE DE LA TARJETA UN CONTENEDOR FLEXIBLE VERTICAL
                                    "
                                >
                                    <div
                                        className="
                                            relative h-52 w-full flex items-center justify-center 
                                            bg-gray-100
                                        "
                                    >
                                        <img
                                            src={product.imagen_url}
                                            alt={product.name}
                                            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                                            onError={(e) => {
                                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L2VzdmdyPg==';
                                            }}
                                        />

                                        <div
                                            className="
                                                absolute inset-0 bg-black/70 flex items-center 
                                                justify-center opacity-0 transition-opacity duration-300 
                                                group-hover:opacity-100
                                            "
                                        >
                                            <button
                                                className={QUICK_VIEW_CLASSES}
                                                onClick={() => detailProduct(product.id)}
                                            >
                                                Vista rápida
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col justify-between flex-grow">
                                        <div className="mb-4">
                                            <span className="block text-sm text-gray-500 uppercase tracking-wider mb-2">
                                                {product.categoria_nombre || product.categoria}
                                            </span>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-snug">
                                                {product.name}
                                            </h3>

                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span key={star} className="text-sm">⭐</span>
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500">(25)</span>
                                            </div>

                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-base font-bold text-gray-800 tracking-wide flex items-center">
                                                    <DollarSignIcon className="mr-0.5 text-gray-600" size={15} />{product.precio}
                                                </span>
                                                <span className="text-sm text-gray-600 font-medium">
                                                    {product.estado}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-auto">
                                            <button
                                                className={ADD_TO_CART_CLASSES}
                                                onClick={() => addToCart(product)}
                                            >
                                                <CirclePlus size={17} />
                                                Agregar al carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>

                {products.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 text-gray-500">
                        <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                        <p>Cargando productos...</p>
                    </div>
                )}

                {filteredProducts.length === 0 && products.length > 0 && (
                    <div className="col-span-full text-center p-12 text-gray-500 text-lg bg-gray-50 rounded-lg my-8 min-h-[200px]">
                        No se encontraron productos que coincidan con los filtros aplicados.
                    </div>
                )}
            </section>

            {showDetail && selectedProduct && (
                <ProductCard
                    addToCart={addToCart}
                    product={selectedProduct}
                    onClose={closeDetail}
                />
            )}
        </>
    )
}