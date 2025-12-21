import { useProducts } from "../../../context/ProductContext"
import { ChevronRight, ChevronLeft, ShoppingBag, MoveRight, CirclePlus } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useCart } from "../../../context/CartContext";

export function Carrousel() {
    const { products } = useProducts()
    const { addToCart } = useCart()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(5);

    const filterOfferProducts = useMemo(() => {
        return products.filter(product => product.estado === 'oferta')
    }, [products])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setItemsToShow(5);
            else if (window.innerWidth >= 768) setItemsToShow(3);
            else if (window.innerWidth >= 640) setItemsToShow(2);
            else setItemsToShow(1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxScrollIndex = Math.max(0, filterOfferProducts.length - itemsToShow);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxScrollIndex));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    return (
        <div className="container mx-auto px-4 md:px-6 pt-16 pb-20 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 xl:items-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2 md:gap-3">
                    Ofertas de la Semana
                </h2>
                <span className="flex items-center text-xs md:text-sm lg:text-base font-semibold gap-1 cursor-pointer text-indigo-500 hover:text-indigo-700 transition-colors self-start sm:self-center">
                    Ver más
                    <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
                </span>
            </div>

            <div className="relative group">
                <button
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-2xl transition-all duration-300 transform -translate-x-1/2 focus:outline-none 
                        ${currentIndex === 0 ? 'opacity-0 scale-0' : 'opacity-100 scale-100 hover:bg-indigo-600 hover:text-white'}`}
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="overflow-hidden rounded-3xl">
                    <div
                        className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                        }}
                    >
                        {filterOfferProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-3"
                            >
                                <div className="bg-white border border-gray-100 rounded-3xl p-5 transition-all duration-300 hover:shadow-2xl hover:border-indigo-100 h-full flex flex-col">
                                    <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-gray-50">
                                        <img
                                            src={product.imagen_url}
                                            alt={product.name}
                                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-110"
                                        />
                                        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wider">
                                            -20%
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">{product.categoria_nombre}</p>
                                        <h4 className="font-bold text-base text-slate-800 mb-4 line-clamp-2">{product.name}</h4>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400 line-through">${(product.precio * 1.2).toFixed(2)}</span>
                                            <span className="text-xl font-black text-slate-900">${product.precio}</span>
                                        </div>
                                        <button 
                                            className="cursor-pointer p-2.5 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all active:scale-95"
                                            onClick={() => addToCart(product)}
                                        >
                                            <CirclePlus size={17}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={nextSlide}
                    disabled={currentIndex >= maxScrollIndex}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-2xl transition-all duration-300 transform translate-x-1/2 focus:outline-none 
                        ${currentIndex >= maxScrollIndex ? 'opacity-0 scale-0' : 'opacity-100 scale-100 hover:bg-indigo-600 hover:text-white'}`}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}