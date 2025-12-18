import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { ShoppingCart, X, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
// import './Cart.css' // ¡Eliminado para usar solo Tailwind!

export function Cart() {
    const { cart, deleteToCart, resetToCart, addToCart } = useContext(CartContext)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // Nota: Es mejor usar un valor por defecto de 0 si cart es undefined/null
    const total = cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

    const isCartEmpty = cart.length === 0;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const closeDropdown = () => {
        setIsDropdownOpen(false)
    }

    // Clases unificadas para el botón de acción principal (Checkout/Pedido)
    const PRIMARY_BUTTON_CLASSES = `
        w-full py-3 px-4 rounded-lg font-semibold text-white 
        transition-colors duration-300 flex items-center justify-center 
        gap-2
    `;

    return (
        // Contenedor principal: Posicionamiento relativo para el dropdown
        <div className="relative"> 
            <button
                className="
                    relative p-3 bg-gray-100 rounded-full text-gray-700 
                    transition-colors duration-300 hover:bg-gray-200 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
                onClick={toggleDropdown}
            >
                <ShoppingCart className="w-5 h-5" />
                {/* Muestra la cantidad de items */}
                {cart.length > 0 && (
                    <span 
                        className="
                            absolute -top-1 -right-1 bg-indigo-600 text-white 
                            text-xs font-bold w-5 h-5 rounded-full flex items-center 
                            justify-center ring-2 ring-white
                        "
                    >
                        {cart.length}
                    </span>
                )}
            </button>

            {isDropdownOpen && (
                <>
                    {/* Overlay para cerrar al hacer click fuera */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={closeDropdown}
                    />

                    {/* Dropdown del Carrito */}
                    <div 
                        className="
                            absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-lg 
                            shadow-2xl z-50 transform origin-top-right border 
                            border-gray-100 flex flex-col max-h-[90vh]
                        "
                    >
                        {/* Cabecera del Carrito */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-gray-800">Carrito de compras</h3>
                                <button 
                                    onClick={closeDropdown}
                                    className="p-1 text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            {/* Botón Vaciar carrito */}
                            <div className="flex items-center">
                                <button
                                    className="
                                        flex items-center gap-1 text-sm font-medium 
                                        text-red-600 hover:text-red-700 transition-colors
                                    "
                                    onClick={() => resetToCart()}
                                    disabled={isCartEmpty}
                                >
                                    <Trash size={15} />
                                    Vaciar carrito
                                </button>
                            </div>
                        </div>

                        {/* Items del Carrito */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {isCartEmpty ? (
                                <p className="text-center py-6 text-gray-500 text-sm">El carrito está vacío</p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                                        <img
                                            src={item.imagen_url}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md bg-gray-50 flex-shrink-0"
                                            onError={(e) => {
                                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5JbWFnZW48L3RleHQ+PC9zdmc+';
                                            }}
                                        />
                                        <div className="flex flex-col flex-grow min-w-0">
                                            <span className="text-sm font-medium text-gray-800 truncate">{item.name}</span>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-xs text-gray-500">Cant: {item.quantity}</span>
                                                <span className="text-sm font-semibold text-gray-900">${(item.totalPrice || 0).toFixed(2)}</span>
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                {/* Botón para eliminar un item (restar cantidad) */}
                                                <button
                                                    className="
                                                        p-1 bg-red-100 text-red-600 rounded-full 
                                                        hover:bg-red-200 transition-colors
                                                    "
                                                    onClick={() => deleteToCart(item)}
                                                >
                                                    <X size={15} className="w-4 h-4" />
                                                </button>
                                                {/* Botón para añadir un item (sumar cantidad) */}
                                                <button
                                                    className="
                                                        p-1 bg-indigo-100 text-indigo-600 rounded-full 
                                                        hover:bg-indigo-200 transition-colors
                                                    "
                                                    onClick={() => addToCart(item)}
                                                >
                                                    <Plus size={15} className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Resumen y Botón de Compra */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex justify-between items-center mb-3">
                                <p className="text-base font-medium text-gray-700">Subtotal:</p>
                                <span className="text-lg font-bold text-gray-900">${(total || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex">
                                {isCartEmpty ? (
                                    <button 
                                        className={`${PRIMARY_BUTTON_CLASSES} bg-gray-400 cursor-not-allowed opacity-70`} 
                                        disabled
                                    >
                                        Realizar pedido
                                    </button>
                                ):(
                                    <Link 
                                        to="/direccion_del_pedido" 
                                        className={`${PRIMARY_BUTTON_CLASSES} bg-indigo-600 hover:bg-indigo-700`}
                                        onClick={closeDropdown}
                                    >
                                        Realizar pedido
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}