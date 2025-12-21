import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { ShoppingCart, X, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export function Cart() {
    const { cart, deleteToCart, resetToCart, addToCart } = useContext(CartContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const total = cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    const isCartEmpty = cart.length === 0;

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);

    return (
        <div className="relative">
            {/* BOTÓN DEL CARRITO */}
            <button
                className="relative p-3 bg-gray-100 rounded-full text-gray-700 transition-all duration-300 hover:bg-gray-200 focus:outline-none"
                onClick={toggleDropdown}
            >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                        {cart.length}
                    </span>
                )}
            </button>

            {/* DROPDOWN Y OVERLAY */}
            {isDropdownOpen && (
                <>
                    {/* Overlay: Bloquea el fondo y permite cerrar al hacer clic fuera */}
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={closeDropdown} 
                    />

                    {/* CONTENEDOR DEL CARRITO */}
                    <div
                        className="
                            fixed top-20 left-4 right-4 z-50 
                            md:absolute md:top-full md:right-0 md:left-auto md:mt-4 md:w-[400px]
                            bg-white rounded-2xl shadow-2xl border border-gray-100 
                            flex flex-col overflow-hidden max-h-[80vh]
                        "
                    >
                        {/* HEADER */}
                        <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800">Carrito de productos</h3>
                                <button onClick={closeDropdown} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            <button
                                onClick={() => resetToCart()}
                                disabled={isCartEmpty}
                                className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 disabled:opacity-50 transition-colors"
                            >
                                <Trash size={14} />
                                Vaciar carrito
                            </button>
                        </div>

                        {/* LISTA DE PRODUCTOS */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white">
                            {isCartEmpty ? (
                                <div className="py-10 text-center">
                                    <p className="text-gray-400 text-sm">Tu carrito está vacío</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                        <img
                                            src={item.imagen_url}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-xl bg-gray-50 flex-shrink-0"
                                        />
                                        <div className="flex-grow min-w-0">
                                            <h4 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-xs text-gray-500 font-medium">Cant: {item.quantity}</p>
                                                <p className="text-sm font-bold text-gray-900">${(item.totalPrice || 0).toFixed(2)}</p>
                                            </div>
                                            {/* ACCIONES DE ITEM */}
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => deleteToCart(item)}
                                                    className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* FOOTER / CHECKOUT */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 font-medium">Subtotal</span>
                                <span className="text-xl font-black text-gray-900">${(total || 0).toFixed(2)}</span>
                            </div>
                            
                            {isCartEmpty ? (
                                <button className="w-full py-3 bg-gray-300 text-white rounded-xl font-bold cursor-not-allowed" disabled>
                                    Realizar pedido
                                </button>
                            ) : (
                                <Link
                                    to="/direccion_del_pedido"
                                    onClick={closeDropdown}
                                    className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                                >
                                    Realizar pedido
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}