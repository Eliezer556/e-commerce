import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink, Outlet } from 'react-router-dom'; 
import { LogOut, User, ShoppingCart, Lock, Undo2, ChevronRight } from 'lucide-react'; 

const navItems = [
    { to: "/perfil", icon: User, label: "Mi Perfil" },
    { to: "/perfil/pedidos", icon: ShoppingCart, label: "Mis Pedidos" },
    { to: "/perfil/seguridad", icon: Lock, label: "Seguridad y Clave" },
    { to: "/", icon: Undo2, label: "Volver a inicio" },
];

export function PerfilUser() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const HandleChangeLogout = () => {
        logout();
        navigate('/');
    };

    return (
        /* pt-[80px] compensa exactamente la altura del navbar fijo */
        <main className="min-h-screen bg-gray-50 pt-[80px]">
            <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 lg:py-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    
                    {/* SIDEBAR NAVEGACIÓN - Sticky debajo del Navbar */}
                    <aside className="lg:sticky lg:top-[100px] self-start space-y-6">
                        <div className="hidden lg:block">
                            <h3 className="text-2xl font-bold text-gray-900 px-4">Mi Cuenta</h3>
                            <p className="text-sm text-gray-500 px-4 mt-1">Gestiona tu información</p>
                        </div>

                        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                            {navItems.map((item) => (
                                <NavLink 
                                    key={item.to} 
                                    to={item.to} 
                                    end={item.to === "/perfil"}
                                    className={({ isActive }) => `
                                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap
                                        ${isActive 
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 font-bold' 
                                            : 'text-gray-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm'}
                                    `}
                                >
                                    <item.icon size={20} />
                                    <span className="text-sm">{item.label}</span>
                                    {/* Flechita decorativa solo en desktop y si está activo */}
                                    <ChevronRight className="ml-auto hidden lg:block opacity-50" size={14} />
                                </NavLink>
                            ))}
                            
                            <button 
                                onClick={HandleChangeLogout} 
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 mt-0 lg:mt-6 font-semibold whitespace-nowrap"
                            >
                                <LogOut size={20} />
                                <span className="text-sm">Cerrar Sesión</span>
                            </button>
                        </nav>
                    </aside>

                    {/* CONTENIDO DINÁMICO (Outlet) */}
                    <section className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10 min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </section>

                </div>
            </div>
        </main>
    );
}