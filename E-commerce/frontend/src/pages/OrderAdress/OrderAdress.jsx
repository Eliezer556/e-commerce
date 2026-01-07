import { useContext, useState, useEffect } from 'react';
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (event) => {
        setErrors({});
        const { name, value } = event.target;

        if (name === 'numero_de_casa') {
            const onlyNums = value.replace(/[^0-9]/g, '');
            setUserAddress(prev => ({ ...prev, [name]: onlyNums }));
            return;
        }

        setUserAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitChange = (event) => {
        event.preventDefault();
        if (cart.length === 0) return;

        const validationErrors = validateAddress(userAddress);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;
        setAddressSubmitted(true);
        window.scrollTo(0, 0);
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
        if (!address.numero_de_casa?.trim()) {
            tempErrors.numero_de_casa = 'Ingresa solo el número de casa.';
        }
        if (!address.calle) tempErrors.calle = 'Requerido';

        return tempErrors;
    };

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
            <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="pb-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Verifica tu pedido</h2>
                        <p className="text-gray-600 text-sm font-xl tracking-wide text-[12px]">Revisa los artículos antes de continuar</p>
                    </div>

                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <img className="w-32 h-32 mb-4 opacity-40 grayscale" src="./emptyCart.jpeg" alt="Vacío" />
                            <p className="text-gray-400 font-medium">Tu carrito está esperando ser llenado</p>
                        </div>
                    ) : (
                        <div className="max-h-[500px] overflow-y-auto rounded-2xl border border-gray-50 pr-1">
                            <div className="flex flex-col">
                                {cart.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`
                            flex gap-4 p-4 transition-all duration-300 items-center
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/80'}
                            hover:bg-indigo-50/30
                        `}
                                    >
                                        <div className="relative group flex-shrink-0">
                                            <img
                                                className="w-20 h-20 rounded-2xl object-contain bg-white border border-gray-100 p-1 shadow-sm transition-transform duration-300 group-hover:scale-105"
                                                src={item.imagen_url}
                                                alt={item.name}
                                            />
                                            <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                                {item.quantity}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-800 text-sm truncate mb-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">
                                                {item.categoria_nombre || 'Producto'}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-400 font-medium">Precio Unitario</span>
                                                <span className="font-black text-indigo-600 text-base italic">
                                                    ${item.precio}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {cart.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Total estimado</span>
                            <span className="text-2xl font-black text-slate-900">
                                ${cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0).toFixed(2)}
                            </span>
                        </div>
                    )}
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 lg:sticky lg:top-28">
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
                                            className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${errors.numero_de_casa ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 shadow-sm'
                                                }`}
                                            name="numero_de_casa"
                                            value={userAddress.numero_de_casa}
                                            onChange={handleInputChange}
                                            placeholder="Ej: 123"
                                            inputMode="numeric"
                                        />
                                        {errors.numero_de_casa && (
                                            <span className="text-red-500 text-[10px] italic">{errors.numero_de_casa}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-semibold text-gray-600 ml-1">Calle / Av.</label>
                                        <input
                                            className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${errors.calle
                                                ? 'border-red-400 bg-red-50'
                                                : 'border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 shadow-sm'
                                                }`}
                                            name="calle"
                                            value={userAddress.calle}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Los Olivos"
                                        />
                                        {errors.calle && (
                                            <span className="text-red-500 text-[10px] italic">{errors.calle}</span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={cart.length === 0}
                                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-4 shadow-lg ${cart.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 hover:-translate-y-0.5'}`}
                                >
                                    {cart.length === 0 ? <>Carrito vacío <Ban size={16} /></> : 'Confirmar Datos de Envío'}
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