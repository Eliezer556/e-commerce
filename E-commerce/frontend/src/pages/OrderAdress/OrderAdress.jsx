import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { VENEZUELAN_CITIES as cities } from './CitiesList';
import { Order } from '../Order/Order';
import { useAuth } from '../../context/AuthContext';
import { Ban, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function OrderAdress() {
    const location = useLocation();
    const redirectTo = location.pathname;
    const { cart } = useContext(CartContext);
    const { isAuthenticated } = useAuth();

    const [addressSubmitted, setAddressSubmitted] = useState(false);
    const [userAddress, setUserAddress] = useState({
        codigo_postal: '',
        fecha: '',
        ciudad: '',
        numero_de_casa: '',
        calle: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        setErrors({});
        const { name, value } = event.target;
        setUserAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitChange = (event) => {
        event.preventDefault();
        if (cart.length === 0) return;

        const validationErrors = validateAddress(userAddress);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;
        setAddressSubmitted(true);
    };

    const validateAddress = (address) => {
        const tempErrors = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const shippingDate = new Date(address.fecha);

        if (!address.codigo_postal?.trim() || address.codigo_postal.length !== 4) {
            tempErrors.codigo_postal = 'Código postal de 4 dígitos requerido.';
        }
        if (!address.ciudad?.trim()) tempErrors.ciudad = 'Ciudad obligatoria';
        if (!address.fecha) {
            tempErrors.fecha = 'Fecha obligatoria';
        } else if (shippingDate < today) {
            tempErrors.fecha = 'No puede ser fecha pasada';
        }
        if (!address.numero_de_casa) tempErrors.numero_de_casa = 'Requerido';
        if (!address.calle) tempErrors.calle = 'Requerido';

        return tempErrors;
    };

    return (
        /* pt-24 compensa los 80px del NavBar fijo + un margen extra */
        <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
            <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* LADO IZQUIERDO: Resumen del Carrito */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="border-b pb-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Verifica tu pedido</h2>
                        <p className="text-indigo-600 text-sm font-medium">Revisa los artículos antes de continuar</p>
                    </div>

                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center py-10 text-center">
                            <img className="w-48 h-48 mb-4 opacity-80" src="./emptyCart.jpeg" alt="Vacío" />
                            <p className="text-gray-400">No hay productos en tu carrito</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border-b last:border-0">
                                    <img className="w-16 h-16 rounded-lg object-cover" src={item.imagen_url} alt={item.name} />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-xs text-gray-500">Cant: {item.quantity}</span>
                                            <span className="font-bold text-indigo-600">${item.precio}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* LADO DERECHO: Formulario de Dirección */}
                <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-28">
                    {isAuthenticated ? (
                        addressSubmitted ? (
                            <Order shippingAdress={userAddress} />
                        ) : (
                            <form className="space-y-5" onSubmit={handleSubmitChange}>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <MapPin className="text-indigo-600" size={20} />
                                        Dirección de Envío
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">Completa los datos para el delivery</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-600 ml-1">C. P.</label>
                                        <input
                                            className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${errors.codigo_postal ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 shadow-sm'}`}
                                            name="codigo_postal"
                                            value={userAddress.codigo_postal}
                                            onChange={handleInputChange}
                                            placeholder="Ej: 1010"
                                        />
                                        {errors.codigo_postal && <span className="text-red-500 text-[10px] italic">{errors.codigo_postal}</span>}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-600 ml-1">Fecha de entrega</label>
                                        <input
                                            className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${errors.fecha ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 shadow-sm'}`}
                                            name="fecha"
                                            value={userAddress.fecha}
                                            onChange={handleInputChange}
                                            type="date"
                                        />
                                        {errors.fecha && <span className="text-red-500 text-[10px] italic">{errors.fecha}</span>}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600 ml-1">Ciudad</label>
                                    <select
                                        className={`w-full p-3 rounded-xl border text-sm outline-none bg-gray-50 transition-all ${errors.ciudad ? 'border-red-400 bg-red-50' : 'border-gray-100 focus:bg-white focus:border-indigo-500 shadow-sm'}`}
                                        name="ciudad"
                                        value={userAddress.ciudad}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar ciudad...</option>
                                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    {errors.ciudad && <span className="text-red-500 text-[10px] italic">{errors.ciudad}</span>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-600 ml-1">Nº Casa/Apto</label>
                                        <input
                                            className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm focus:bg-white outline-none focus:border-indigo-500 shadow-sm"
                                            name="numero_de_casa"
                                            value={userAddress.numero_de_casa}
                                            onChange={handleInputChange}
                                            placeholder="Ej: 42-B"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-600 ml-1">Calle / Av.</label>
                                        <input
                                            className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm focus:bg-white outline-none focus:border-indigo-500 shadow-sm"
                                            name="calle"
                                            value={userAddress.calle}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Los Olivos"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={cart.length === 0}
                                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-4 shadow-lg ${cart.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 hover:-translate-y-0.5'}`}
                                >
                                    {cart.length === 0 ? <>Carrito vacío <Ban size={16}/></> : 'Confirmar Datos de Envío'}
                                </button>
                            </form>
                        )
                    ) : (
                        <div className="text-center py-6">
                            <h4 className="text-gray-800 font-bold">¡Casi listo!</h4>
                            <p className="text-sm text-gray-500 mb-4">Inicia sesión para poder procesar tu pedido</p>
                            <Link 
                                to={`/login?redirect=${encodeURIComponent(redirectTo)}`}
                                className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                            >
                                Iniciar Sesión aquí
                            </Link>
                        </div>
                    )}
                </section>
            </section>
        </main>
    );
}