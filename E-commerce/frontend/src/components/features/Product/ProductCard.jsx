import { X, Heart, Star, ShoppingBag, Truck } from 'lucide-react';

export function ProductCard({ product, onClose, addToCart }) {
    if (!product) return null;

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={16}
                    className={i < fullStars ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                />
            );
        }
        return stars;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4 md:p-8">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Contenido del Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto z-[1001]">
                
                {/* Botón de Cerrar */}
                <button
                    className="absolute top-4 right-4 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-md transition-colors hover:bg-gray-100 z-[1002]"
                    onClick={onClose}
                >
                    <X size={20} className="text-gray-600" />
                </button>

                {/* Grid de Detalle del Producto */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
                    
                    {/* Sección de Imagen (Fondo Plano Gris) */}
                    <div 
                        className="
                            flex items-center justify-center bg-gray-100 // FONDO PLANO APLICADO
                            rounded-xl p-6 md:p-10
                        "
                    >
                        <img
                            src={product.imagen_url}
                            alt={product.name}
                            className="w-full max-h-[400px] object-contain"
                            onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
                            }}
                        />
                    </div>

                    {/* Sección de Información */}
                    <div className="flex flex-col gap-4">
                        <span className="text-sm text-gray-500 uppercase tracking-wider">
                            {product.categoria_nombre || product.categoria}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                            {product.name}
                        </h2>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-0.5">
                                {renderStars(4)} {/* Asumiendo un rating estático o que viene de props */}
                            </div>
                            <span className="text-sm text-gray-500">(25 Opiniones)</span>
                        </div>

                        <div className="flex items-center gap-4 py-2">
                            <span className="text-3xl font-extrabold text-gray-900">
                                ${product.precio}
                            </span>
                            {/* Puedes añadir un precio original si lo necesitas: 
                            <span className="text-xl text-gray-400 line-through">$120.00</span>
                            */}
                        </div>

                        <p className="text-base text-gray-600 leading-relaxed my-2">
                            {/* Asumiendo que `product.descripcion` existe o usando un texto por defecto */}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>

                        {/* Acciones */}
                        <div className="flex gap-4 mt-6">
                            <button
                                className="
                                    flex-1 flex items-center justify-center gap-2 p-4 
                                    bg-indigo-600 text-white rounded-lg font-semibold 
                                    transition-colors duration-300 hover:bg-indigo-700 // BOTÓN ÍNDIGO
                                "
                                onClick={() => addToCart(product)}
                            >
                                <ShoppingBag size={20} />
                                Agregar al Carrito
                            </button>
                            <button
                                className="
                                    w-12 h-12 flex items-center justify-center 
                                    border border-gray-300 bg-white rounded-lg 
                                    text-gray-600 transition-all duration-300 hover:border-indigo-600 hover:text-indigo-600
                                "
                            >
                                <Heart size={20} />
                            </button>
                        </div>

                        {/* Características */}
                        <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Truck size={16} className="text-indigo-500" />
                                Envío gratis disponible.
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-medium text-gray-800">Estado:</span> {product.estado}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-medium text-gray-800">Marca:</span> {product.marca || 'Genérica'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Nota: Para usar este componente, asegúrate de haberlo guardado como ProductCard.jsx (o similar)
// y reemplazar el código en el componente padre (ProductList) con este componente actualizado.