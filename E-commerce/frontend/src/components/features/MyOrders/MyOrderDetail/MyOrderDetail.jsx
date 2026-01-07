import { useEffect } from 'react';
import { ShoppingBag, MapPin, Package, X } from 'lucide-react';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString();
    } catch (e) {
        return 'Fecha Inválida';
    }
}

const formatCurrency = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return 'N/A';
    return num.toLocaleString('es-VE', { style: 'currency', currency: 'USD' });
}

export function MyOrderDetail({ onClose, children }) {
    const {
        numero_pedido,
        estado_display,
        usuario_email,
        fecha_creacion,
        total,
        subtotal,
        impuesto,
        envio,
        descuento,
        direccion_envio,
        items,
        estado 
    } = children;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const statusStyles = {
        'pendiente-de-pago': 'bg-amber-100 text-amber-700 border-amber-200',
        'confirmado': 'bg-cyan-100 text-cyan-700 border-cyan-200',
        'entregado': 'bg-green-100 text-green-700 border-green-200',
        'cancelado': 'bg-red-100 text-red-700 border-red-200',
        'desconocido': 'bg-gray-100 text-gray-700 border-gray-200'
    };

    const statusClass = estado ? estado.toLowerCase().replace(/\s+/g, '-') : 'desconocido';
    const address = direccion_envio || {};

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
            
            <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[0.20rem] shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden">
                
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 z-50"
                >
                    <X size={20} />
                </button>

                <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
                    
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                            <ShoppingBag size={24} />
                        </div>
                        <h3 className="text-xl font-black text-gray-800 tracking-tight">
                            Pedido <span className="text-indigo-600 ml-1">#{numero_pedido || 'N/A'}</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
                                Información General
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-gray-500">Estado</span>
                                    <span className={`px-3 py-1 rounded-full text-[0.70rem] font-semibold border ${statusStyles[statusClass] || statusStyles['desconocido']}`}>
                                        {estado_display}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-gray-500">Fecha</span>
                                    <span className="font-semibold text-gray-800">{formatDate(fecha_creacion)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-gray-500">Email</span>
                                    <span className="font-semibold text-gray-800 truncate ml-4 italic">{usuario_email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 flex items-center gap-2">
                                <MapPin size={14} /> Envío
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-bold text-gray-500">Ciudad</span>
                                    <span className="font-semibold text-gray-800">{address.ciudad || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold text-gray-500">C.P.</span>
                                    <span className="font-semibold text-gray-800">{address.codigo_postal || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between text-right">
                                    <span className="font-bold text-gray-500">Dirección</span>
                                    <span className="font-semibold text-gray-800 ml-4">
                                        {address.calle || 'N/A'} #{address.numero_de_casa || ''}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                            <Package size={16} /> Productos ({items ? items.length : 0})
                        </h4>
                        
                        <div className="bg-gray-50 rounded-[0.50rem] p-2">
                            <div className="grid grid-cols-[3fr_1fr_1.5fr] p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                                <div>Producto</div>
                                <div className="text-center">Cant.</div>
                                <div className="text-right">Subtotal</div>
                            </div>
                            
                            <div className="divide-y divide-gray-100">
                                {items && items.length > 0 ? (
                                    items.map((item) => (
                                        <div key={item.id} className="grid grid-cols-[3fr_1fr_1.5fr] p-4 items-center text-sm">
                                            <span className="font-bold text-gray-800 truncate pr-2">{item.nombre_producto || 'Producto'}</span>
                                            <span className="text-center font-bold text-gray-500">{item.cantidad}</span>
                                            <span className="text-right font-black text-indigo-600">
                                                {formatCurrency(item.precio_total_linea || (item.precio_unitario * item.cantidad))}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="p-6 text-center text-sm text-gray-400 italic">No hay productos en este pedido.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-600 rounded-[0.50rem] p-8 text-white shadow-xl shadow-indigo-100 space-y-3">
                        <div className="flex justify-between text-sm opacity-80 font-medium">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm opacity-80 font-medium">
                            <span>Envío</span>
                            <span>{formatCurrency(envio)}</span>
                        </div>
                        <div className="flex justify-between text-sm opacity-80 font-medium">
                            <span>Impuestos</span>
                            <span>{formatCurrency(impuesto)}</span>
                        </div>
                        {descuento > 0 && (
                             <div className="flex justify-between text-sm text-green-300 font-bold">
                                <span>Descuento</span>
                                <span>-{formatCurrency(descuento)}</span>
                            </div>
                        )}
                        <div className="pt-4 mt-2 border-t border-white/20 flex justify-between items-center">
                            <span className="text-lg font-black uppercase tracking-tight">Total Final</span>
                            <span className="text-2xl font-black">{formatCurrency(total)}</span>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center pb-2">
                        <button
                            className="w-full md:w-auto px-10 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-black rounded-2xl transition-all active:scale-95"
                            onClick={onClose}
                        >
                            Cerrar Detalles
                        </button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 0 2rem 2rem 0;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c7d2fe;
                    border-radius: 10px;
                    border: 2px solid #f1f1f1;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #818cf8;
                }
            `}} />
        </div>
    )
}