import { useProducts } from "../../../context/ProductContext"
import { ChevronRight, ChevronLeft, ShoppingBag, Zap, MoveRight } from 'lucide-react';
import { useState, useMemo } from 'react';
// import './Carrousel.css'

// export function Carrousel() {
//     const { products } = useProducts()
//     const [currentIndex, setCurrentIndex] = useState(0)
//     const [loadedImages, setLoadedImages] = useState({})

//     const handleImageLoaded = (productId) => {
//         setLoadedImages(prev => ({
//             ...prev,
//             [productId]: true,
//         }));
//     }

//     const productsOffer = useMemo(() => {
//         return products.filter(product => (product.estado === 'oferta'))
//     }, [products])

//     const nextSlide = () => {
//         if (currentIndex < productsOffer.length - 3) {
//             setCurrentIndex(currentIndex + 1)
//         }
//     }

//     const prevSlide = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1)
//         }
//     }

//     const visibleProducts = productsOffer.slice(currentIndex, currentIndex + 3)

//     return (
//         <div className="container-products-top">
//             <button className="btn-slide" onClick={prevSlide}>
//                 <ChevronLeft />
//             </button>

//             {visibleProducts.map(product => (
//                 <div className="product-top" key={product.id}>
//                     <div className="image-container">
//                         {!loadedImages[product.id] && (
//                             <div className="skeleton-placeholder"></div>
//                         )}
//                         <img
//                             src={product.imagen_url}
//                             alt={product.name} loading="lazy"
//                             width={150}
//                             height={150}
//                             style={{ opacity: loadedImages[product.id] ? 1 : 0 }}
//                             onLoad={() => handleImageLoaded(product.id)}
//                         />
//                     </div>
//                     <div className="product-info-offer">
//                         <span className="product-name-offer">{product.name}</span>
//                         <h3 className="offer-text">Oferta al 40%</h3>
//                         <a href="#" className="buy-button">
//                             <ShoppingBag size={18} />Comprar ahora
//                         </a>
//                     </div>
//                 </div>
//             ))}

//             <button className="btn-slide" onClick={nextSlide}>
//                 <ChevronRight />
//             </button>
//         </div>
//     )
// }

export function Carrousel() {
    const { products } = useProducts()
    const VISIBLE_ITEMS = 3; 
    const [currentIndex, setCurrentIndex] = useState(0);

    const maxScrollIndex = products.length - VISIBLE_ITEMS; 

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            // Asegura que no se desplace más allá del final
            return Math.min(prevIndex + 1, maxScrollIndex);
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            // Asegura que no se desplace más allá del inicio (0)
            return Math.max(prevIndex - 1, 0);
        });
    };

    const filterOfferProducts = useMemo(() => {
        return products.filter( product => (product.estado === 'oferta' ))
    }, [products])
    
    return (
        <div className="container mx-auto px-4 md:px-6 pt-16 pb-20">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center md:text-left flex items-center gap-3">
                    Ofertas de la Semana 
                </h2>
                <span className="flex items-center text-xl gap-1">
                    Ver mas
                    <MoveRight size={20} />
                </span>
            </div>
            
            <div className="relative">
                {/* Botón de navegación izquierda */}
                <button
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-300 transform -translate-x-1/2 focus:outline-none 
                        ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white'}`}
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Contenedor del Carrusel y Transición */}
                <div className="overflow-hidden rounded-3xl p-2">
                    <div 
                        className="flex"
                        style={{ 
                            transform: `translateX(-${currentIndex * 33.33}%)`,
                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
                        }}
                    >
                        {filterOfferProducts.map((product) => (
                            <div 
                                key={product.id} 
                                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/5 p-4" 
                            >
                                <div className="bg-gray-100 p-6 transition-all duration-300 cursor-pointer w-[280px] h-full">
                                    <div className="relative h-40 mb-4 overflow-hidden rounded-xl">
                                        <img 
                                            src={product.imagen_url} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105" 
                                        />
                                        <span className="absolute top-2 left-2 bg-indigo-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            -20%
                                        </span>
                                    </div>

                                    <h4 className="font-bold text-lg text-slate-900 mb-1 truncate">{product.name}</h4>
                                    <p className="text-sm text-slate-500 mb-4">{product.categoria_nombre}</p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-extrabold text-stone-800">
                                            ${product.precio}
                                        </span>
                                        <button className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-110">
                                            <ShoppingBag size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Botón de navegación derecha */}
                 <button
                    onClick={nextSlide}
                    disabled={currentIndex >= maxScrollIndex}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-300 transform translate-x-1/2 focus:outline-none 
                        ${currentIndex >= maxScrollIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white'}`}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
