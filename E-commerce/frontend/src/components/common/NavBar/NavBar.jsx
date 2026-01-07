import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Heart,
  Search,
  Menu,
  X,
  Bell,
} from 'lucide-react';
import { Cart } from '../../features/Cart/Cart';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';

export function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const BASE_LINK_CLASSES = "text-gray-700 font-semibold text-sm hover:text-indigo-600 transition-all duration-300 relative after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[3px] after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:scale-[1.05]";
  const ACTION_BTN_CLASSES = "flex items-center justify-center w-11 h-11 rounded-full text-gray-700 bg-gray-50 border-none cursor-pointer transition-all duration-300 hover:bg-indigo-100 hover:text-indigo-700 shadow-md hover:shadow-lg hover:-translate-y-0.5";
  const USER_BTN_CLASSES = "flex items-center gap-2 px-4 py-2 rounded-full border-2 border-transparent bg-white cursor-pointer transition-all duration-300 hover:border-indigo-500 shadow-sm hover:shadow-lg";

  return (
    <div className="relative">
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav className={`
        fixed top-0 left-0 h-full w-72 
        bg-white flex flex-col p-6 
        shadow-2xl z-[2100] 
        transition-transform duration-500 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <span className="font-black text-xl text-indigo-600">Menú</span>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer border-none bg-transparent">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-indigo-600 font-semibold hover:bg-indigo-50 px-2 transition-colors rounded-md no-underline">Inicio</Link>
          <Link to="/productos" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 px-2 transition-colors rounded-md no-underline">Productos</Link>
          {/* <Link to="/offers" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 px-2 transition-colors rounded-md no-underline">Ofertas</Link> */}
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 px-2 transition-colors rounded-md no-underline">Nosotros</Link>
          <Link to="/help_center" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 px-2 transition-colors rounded-md no-underline">Ayuda</Link>
        </div>

        {!isAuthenticated && (
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mt-auto bg-indigo-600 text-white p-4 rounded-xl text-center font-bold shadow-lg no-underline">
            Iniciar Sesión
          </Link>
        )}
      </nav>

      <header className="fixed top-0 left-0 w-full bg-white/85 backdrop-blur-sm shadow-xl shadow-gray-100/50 z-[1000]">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 h-[80px]">
          
          <Link to="/" className="flex items-center gap-2 font-black text-2xl text-gray-900 no-underline transition-all duration-300 hover:scale-[1.05]">
            <ShoppingBag className="text-indigo-600 w-8 h-8" />
            <span className="text-indigo-600 md:text-gray-900 hidden sm:block">E-Commerce</span>
          </Link>

          <nav className="hidden lg:flex gap-10">
            <Link to="/" className={`${BASE_LINK_CLASSES} text-indigo-700 after:scale-x-100 no-underline`}>Inicio</Link>
            <Link to="/productos" className={`${BASE_LINK_CLASSES} no-underline`}>Productos</Link>
            {/* <Link to="/offers" className={`${BASE_LINK_CLASSES} no-underline`}>Ofertas</Link> */}
            <Link to="/about" className={`${BASE_LINK_CLASSES} no-underline`}>Nosotros</Link>
            <Link to="/help_center" className={`${BASE_LINK_CLASSES} no-underline`}>Ayuda</Link>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <button className={ACTION_BTN_CLASSES} onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center relative">
              <Cart />
            </div>

            <div className="md:block relative"> {/* Contenedor del usuario */}
              {isAuthenticated ? (
                <>
                  <button 
                    className={USER_BTN_CLASSES} 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <User className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-semibold text-gray-800 hidden sm:inline ml-1">
                      Hola, {user.first_name}
                    </span>
                  </button>

                  {/* MENÚ DESPLEGABLE CON ESTADO REACT */}
                  <div className={`
                    absolute top-full right-0 mt-3 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 transition-all duration-300 z-50
                    ${isUserMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
                  `}>
                    <Link 
                      to="/perfil" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block w-full px-4 py-2 text-gray-700 no-underline rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      Mi Perfil
                    </Link>
                    <button 
                      onClick={() => { handleLogout(); setIsUserMenuOpen(false); }} 
                      className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left mt-2 border-t border-gray-100 cursor-pointer border-none bg-transparent"
                    >
                      Cerrar sesión
                    </button>
                  </div>

                  {/* Overlay invisible para cerrar el menú al hacer clic fuera */}
                  {isUserMenuOpen && (
                    <div 
                      className="fixed inset-0 z-[-1]" 
                      onClick={() => setIsUserMenuOpen(false)} 
                    />
                  )}
                </>
              ) : (
                <Link to="/login" className={`${USER_BTN_CLASSES} no-underline`}>
                  <User className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span className="hidden md:inline text-sm font-semibold text-gray-800 whitespace-nowrap">Iniciar sesión</span>
                </Link>
              )}
            </div>

            <button className={`${ACTION_BTN_CLASSES} lg:hidden border-none bg-transparent`} onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className={`overflow-hidden bg-white border-t border-gray-100 transition-all duration-300 ${isSearchOpen ? 'h-[90px]' : 'h-0'}`}>
          <div className="flex items-center max-w-7xl mx-auto px-6 h-full relative">
            <Search className="absolute left-9 text-gray-400 w-6 h-6" />
            <input type="text" placeholder="Buscar productos..." className="w-full py-4 pl-14 pr-16 border-2 border-indigo-400 rounded-full focus:outline-none" />
            <button className="absolute right-8 bg-indigo-500 text-white p-3 rounded-full cursor-pointer border-none" onClick={() => setIsSearchOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}