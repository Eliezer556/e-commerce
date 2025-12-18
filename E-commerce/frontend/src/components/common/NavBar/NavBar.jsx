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
  
  // 💡 ESTADOS DE COMPONENTE para la funcionalidad responsive y de búsqueda
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    // Lógica adicional si es necesario
  }, []);

  // ----------------------------------------------------------------------------------
  // CLASES BASE DEL NAVBAR CON ANIMACIONES MEJORADAS
  
  // Enlaces: subrayado más grueso, transición de color y escala sutil al pasar el mouse
  const BASE_LINK_CLASSES = "text-gray-700 font-semibold text-sm hover:text-indigo-600 transition-all duration-300 relative after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[3px] after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:scale-[1.05]";
  
  // Botones de acción: tamaño ligeramente más grande, redondeado completo, sombra y efecto "flotante" al hacer hover
  const ACTION_BTN_CLASSES = "flex items-center justify-center w-11 h-11 rounded-full text-gray-700 bg-gray-50 border-none cursor-pointer transition-all duration-300 hover:bg-indigo-100 hover:text-indigo-700 shadow-md hover:shadow-lg hover:-translate-y-0.5";
  
  // Botón de usuario: más presencia visual y efecto de contorno animado
  const USER_BTN_CLASSES = "flex items-center gap-2 px-4 py-2 rounded-full border-2 border-transparent bg-white cursor-pointer transition-all duration-300 hover:border-indigo-500 shadow-sm hover:shadow-lg";
  // ----------------------------------------------------------------------------------

  return (
    <>
      {/* 1. Header principal - Fixed, Glassmorphism, Sombra y Z-Index alto */}
      <header className="
        fixed top-0 left-0 w-full 
        bg-white/85 backdrop-blur-sm 
        shadow-xl shadow-gray-100/50 
        z-[1000] transition-all duration-300
      ">
        
        {/* 1.1. Contenedor principal - Centrado y con Flexbox */}
        <div className="
          flex items-center justify-between 
          max-w-7xl mx-auto px-6 
          h-[80px]  // Altura ligeramente mayor para más presencia
        ">
          
          {/* Logo - Llamativo y animado */}
          <Link to="/" className="flex items-center gap-2 font-black text-2xl text-gray-900 no-underline transition-all duration-300 hover:scale-[1.05]">
            <ShoppingBag className="text-indigo-600 w-8 h-8 transition-colors duration-500 hover:text-pink-500" />
            <span className="text-indigo-600 md:text-gray-900 transition-colors hidden sm:block">E-Commerce</span>
          </Link>

          {/* Navegación principal (Oculta en móvil, visible en escritorio) */}
          <nav className={`
            hidden lg:flex gap-10
          `}>
            {/* Los enlaces están más separados para mejorar la legibilidad y el impacto */}
            <Link to="/" className={`${BASE_LINK_CLASSES} text-indigo-700 after:scale-x-100`}>Inicio</Link>
            <Link to="/productos" className={BASE_LINK_CLASSES}>Productos</Link>
            <Link to="/categories" className={BASE_LINK_CLASSES}>Categorías</Link>
            <Link to="/offers" className={BASE_LINK_CLASSES}>Ofertas</Link>
            <Link to="/about" className={BASE_LINK_CLASSES}>Nosotros</Link>
          </nav>

          {/* Acciones de usuario */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Barra de búsqueda (Botón animado) */}
            <button 
                className={ACTION_BTN_CLASSES} 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button className={`${ACTION_BTN_CLASSES} hidden lg:flex`}>
              <Bell className="w-5 h-5" />
            </button>

            <div className={`${ACTION_BTN_CLASSES} cart-btn`}>
              <Cart /> 
            </div>

            {/* Perfil de usuario - Dropdown Animado y con Sombra */}
            <div className="relative group ml-2 hidden md:block">
              <div className="user-dropdown">
                {isAuthenticated ? (
                  <button className={USER_BTN_CLASSES}>
                    <User className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-semibold text-gray-800 hidden lg:inline">
                      Hola, {user.first_name} !
                    </span>
                  </button>
                ) : (
                  <Link to="/login" className={`${USER_BTN_CLASSES} text-gray-800 text-sm font-semibold hover:bg-indigo-50`}>
                    <User className="w-5 h-5 text-indigo-500" />
                    Iniciar sesión
                  </Link>
                )}
                {isAuthenticated && (
                  <div className="
                    absolute top-full right-0 mt-3 w-52 
                    bg-white rounded-xl shadow-2xl border border-gray-100
                    p-2 
                    opacity-0 invisible transform -translate-y-4 
                    transition-all duration-300 ease-out
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    z-[1001]
                  ">
                    <Link to="/perfil" className="block w-full px-4 py-2 text-gray-700 no-underline rounded-lg hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors">Mi Perfil</Link>
                    <Link to="/perfil/pedidos" className="block w-full px-4 py-2 text-gray-700 no-underline rounded-lg hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors">Mis Pedidos</Link>
                    <Link to="/settings" className="block w-full px-4 py-2 text-gray-700 no-underline rounded-lg hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors">Configuración</Link>
                    <button className='w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium text-left mt-2 border-t border-gray-100' onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Botón menú móvil (Solo visible en pantallas pequeñas) */}
            <button 
                className={`${ACTION_BTN_CLASSES} lg:hidden`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 2. Barra de búsqueda expandible (Con animación de altura y padding) */}
        <div className={`
          overflow-hidden bg-white 
          border-t border-gray-100 
          transition-all duration-300 ease-in-out
          ${isSearchOpen ? 'h-[90px]' : 'h-0'}
        `}>
          <div className="
            flex items-center 
            max-w-7xl mx-auto px-6 
            h-full relative
          ">
            <Search className="absolute left-9 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Buscar productos, categorías, marcas..."
              className="
                w-full py-4 pl-14 pr-16 
                border-2 border-indigo-400 rounded-full 
                text-lg 
                focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all
              "
            />
            <button 
                className="
                    absolute right-8 
                    bg-indigo-500 hover:bg-indigo-600 text-white
                    p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-[1.05]
                "
                onClick={() => setIsSearchOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
      {/* 3. Menú Lateral Móvil (Overlay y Menú) */}
      <div 
        className={`fixed top-[80px] left-0 w-full h-full bg-black/50 z-[999] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <nav className={`
        fixed top-[80px] h-[calc(100vh-80px)] w-72 
        bg-white flex flex-col p-6 
        border-r border-gray-200 shadow-2xl z-[1000] 
        transition-all duration-500 ease-in-out
        ${isMenuOpen ? 'left-0' : '-left-full'}
      `}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors rounded-md">Inicio</Link>
          <Link to="/productos" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors rounded-md">Productos</Link>
          <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors rounded-md">Categorías</Link>
          <Link to="/offers" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors rounded-md">Ofertas</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors rounded-md">Nosotros</Link>
      </nav>
        
      </header>
    </>
  );
}