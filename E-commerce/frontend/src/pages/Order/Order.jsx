import { useState } from 'react';
import ordersService from '../../services/ordersService';
import { MapPin, CreditCard, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export function Order({ shippingAdress }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { cart, resetToCart } = useCart();
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

    const handleCreateOrder = async () => {
        setLoading(true);
        setError(null);

        try {
            const itemsForBakend = cart.map(item => ({
                producto: item.id,
                cantidad: item.quantity
            }));

            const orderPayload = {
                direccion_envio: shippingAdress,
                items: itemsForBakend
            };

            const result = await ordersService.createOrder(orderPayload);

            if(result.success){
                resetToCart();
                navigate('/');
            } else {
                let message = result.message || "Error al procesar el pedido.";
                if (result.errors) {
                    message += " Detalles: " + JSON.stringify(result.errors);
                }
                setError(message);
            }
        } catch (error) {
            setError("Ocurrió un error inesperado. Revisa la conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="animate-in fade-in duration-500">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center gap-2 border-b pb-4">
                    <h3 className="text-lg font-bold text-gray-800">Resumen de Entrega</h3>
                    <MapPin size={20} className="text-indigo-600" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Código Postal</span>
                        <span className="text-gray-800 font-semibold">{shippingAdress.codigo_postal}</span>
                    </div>
                    <div className="flex flex-col p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Fecha Estimada</span>
                        <span className="text-gray-800 font-semibold">{shippingAdress.fecha}</span>
                    </div>
                </div>

                <div className="flex flex-col p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Ciudad de Destino</span>
                    <span className="text-gray-800 font-semibold">{shippingAdress.ciudad}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Nº de Casa</span>
                        <span className="text-gray-800 font-semibold">{shippingAdress.numero_de_casa}</span>
                    </div>
                    <div className="flex flex-col p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Calle</span>
                        <span className="text-gray-800 font-semibold truncate">{shippingAdress.calle}</span>
                    </div>
                </div>

                <div className="mt-2 pt-6 border-t border-dashed border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                        <CreditCard size={18} className="text-gray-400" />
                        <h5 className="font-bold text-gray-700 text-sm">Método de Pago</h5>
                    </div>
                    
                    <div className="relative group">
                        <select className="w-full p-3 bg-white border border-gray-200 rounded-xl appearance-none outline-none focus:border-indigo-500 transition-all text-sm font-medium text-gray-700 cursor-pointer shadow-sm">
                            <option value="">Seleccionar método...</option>
                            <option value="transferencia">Transferencia Bancaria</option>
                            <option value="pago_movil">Pago Móvil</option>
                            <option value="zelle">Zelle</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-indigo-500 transition-colors" size={16} />
                    </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl flex justify-between items-center">
                    <span className="text-indigo-900 font-bold uppercase text-xs tracking-widest">Total a Pagar</span>
                    <span className="text-2xl font-black text-indigo-700">${total}</span>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg text-center animate-shake">
                        {error}
                    </div>
                )}

                <button
                    className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex justify-center items-center ${
                        loading 
                        ? 'bg-gray-400 text-white cursor-wait' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                    }`}
                    onClick={handleCreateOrder}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Procesando...
                        </div>
                    ) : 'Finalizar Pedido'}
                </button>
            </div>
        </section>
    );
}