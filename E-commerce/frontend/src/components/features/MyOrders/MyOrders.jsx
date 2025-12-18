import { useEffect, useState } from "react"
import { Calendar, ArrowRight, Handbag, AlertTriangle, Info, Loader2 } from 'lucide-react'
import ordersService from "../../../services/ordersService"
import { MyOrderDetail } from "./MyOrderDetail/MyOrderDetail";

const OrderItem = ({ order, handleOrderDetailClick }) => {
    const statusClass = order.estado_display
        ? order.estado_display.toLowerCase().replace(/\s+/g, '-')
        : 'desconocido';

    const statusStyles = {
        'pendiente-de-pago': 'bg-amber-500 text-white',
        'pendiente': 'bg-amber-500 text-white',
        'confirmado': 'bg-cyan-500 text-white',
        'preparando': 'bg-orange-500 text-white',
        'enviado': 'bg-emerald-500 text-white',
        'entregado': 'bg-green-600 text-white font-black',
        'cancelado': 'bg-red-500 text-white opacity-80',
        'reembolsado': 'bg-red-500 text-white opacity-80',
        'desconocido': 'bg-gray-400 text-white'
    };

    const fechaCreacion = order.fecha_creacion 
        ? new Date(order.fecha_creacion).toLocaleDateString() 
        : 'N/A';

    return (
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
            <div className="flex flex-wrap items-center gap-6 md:gap-10 w-full md:w-auto">
                
                <div className="flex flex-col gap-1 border-r border-gray-100 pr-6 last:border-0">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Pedido #</span>
                    <span className="text-sm font-bold text-indigo-600">
                        {order.numero_pedido || order.id}
                    </span>
                </div>

                <div className="flex flex-col gap-1 border-r border-gray-100 pr-6 last:border-0">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center gap-1">
                        <Calendar size={12} /> Fecha
                    </span>
                    <span className="text-sm font-bold text-gray-700">{fechaCreacion}</span>
                </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${statusStyles[statusClass] || statusStyles['desconocido']}`}>
                    {order.estado_display}
                </span>

                <button 
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95" 
                    onClick={() => handleOrderDetailClick(order.id)}
                >
                    Detalles
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export function MyOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [showDetail, setShowDetail] = useState(false)

    const handleOrderDetailClick = (orderId) => {
        const orderItem = orders.find(o => o.id === orderId)
        if(orderItem){
            setSelectedOrder(orderItem)
            setShowDetail(true)
        }
    }

    const handleCloseDetailOrder = () => {
        setSelectedOrder(null)
        setShowDetail(false)
    }

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            setError(null);
            try {
                const result = await ordersService.getOrders()
                if (result.success) {
                    setOrders(result.data.results || [])
                } else {
                    setOrders([]);
                    setError(result.message || 'Error al cargar pedidos.');
                }
            } catch (err) {
                setOrders([]);
                setError('Error de conexión con el servidor.');
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                    <Handbag size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Mis Pedidos</h2>
                    <p className="text-sm text-gray-500 font-medium">Historial de tus compras realizadas</p>
                </div>
            </div>

            <div className="min-h-[300px]">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                        <p className="text-gray-500 font-bold animate-pulse">Buscando tus pedidos...</p>
                    </div>
                )}

                {error && (
                    <div className="p-5 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-start gap-4">
                        <AlertTriangle className="shrink-0" size={24} />
                        <div>
                            <p className="font-bold">Error del sistema</p>
                            <p className="text-sm opacity-90">{error}</p>
                        </div>
                    </div>
                )}

                {(!loading && !error && orders.length === 0) && (
                    <div className="p-8 bg-blue-50 border border-blue-100 text-blue-700 rounded-3xl flex flex-col items-center text-center gap-4">
                        <div className="p-4 bg-white rounded-full shadow-sm text-blue-500">
                            <Info size={32} />
                        </div>
                        <div>
                            <p className="text-lg font-black tracking-tight">Sin actividad reciente</p>
                            <p className="text-sm opacity-80">Aún no has realizado ningún pedido en nuestra tienda.</p>
                        </div>
                    </div>
                )}

                {orders.length > 0 && !loading && !error && (
                    <div className="flex flex-col gap-2">
                        {orders.map((order) => (
                            <OrderItem 
                                key={order.id} 
                                order={order} 
                                handleOrderDetailClick={handleOrderDetailClick}
                            />
                        ))}
                    </div>
                )}
            </div>
            
            {showDetail && selectedOrder && (
                <MyOrderDetail 
                    onClose={handleCloseDetailOrder}
                >
                    {selectedOrder}
                </MyOrderDetail>
            )}
        </div>
    )
}