import { ArrowBigRight } from "lucide-react";
import { Link } from "react-router-dom"
// import './Header.css'

export function Header() {
    const PRIMARY_BUTTON_CLASSES = "w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-lg shadow-indigo-500/50 hover:bg-indigo-700 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl";
    const SECONDARY_BUTTON_CLASSES = "w-full sm:w-auto px-8 py-3 bg-white text-indigo-700 border-2 border-indigo-500 rounded-full font-semibold transition-all duration-300 hover:bg-indigo-50 hover:shadow-md flex items-center justify-center gap-2 group";

    return (
        // Contenedor principal: Fondo sutil de gradiente (para un toque premium) y espacio para el Navbar fijo.
        <section className="bg-gradient-to-br from-indigo-50/50 via-white to-pink-50/50 pt-[70px] min-h-[85vh]">
            <header className="
                container mx-auto px-6 max-w-7xl
                flex flex-col md:flex-row items-center justify-between 
                gap-12 lg:gap-20 
                py-16 md:py-24 
            ">
                <section className="
                    flex-1 flex flex-col 
                    gap-6 md:gap-8 
                    text-center md:text-left 
                    max-w-xl mx-auto md:mx-0
                ">

                    {/* Contenedor del Título */}
                    <div className="max-w-full">
                        {/* Título: Responsive, impactante y con gradiente de color */}
                        <h1 className="
                            text-4xl sm:text-5xl lg:text-6xl 
                            font-extrabold 
                            text-slate-900 
                            leading-tight
                        ">
                            Bienvenido a tu centro E-commerce

                            de confianza
                        </h1>
                    </div>

                    {/* Subtítulos */}
                    <div className="text-xl text-gray-600 max-w-full mx-auto md:mx-0 leading-relaxed">
                        <p className='mt-0 mb-1'>Encontrarás todo lo que puedas desear, con un simple click</p>
                        <p className='m-0'>Todos los productos de calidad en la palma de tu mano</p>
                    </div>

                    {/* Contenedor de Botones: Flexbox y responsive */}
                    <div className="
                        flex flex-col sm:flex-row 
                        items-center gap-4 mt-8 
                        justify-center md:justify-start
                    ">

                        {/* Botón Principal */}
                        <Link to='/productos' className={PRIMARY_BUTTON_CLASSES}>
                            Ir a productos
                        </Link>

                        {/* Botón Secundario */}
                        <button className={SECONDARY_BUTTON_CLASSES}>
                            Vender mi producto
                            {/* Ícono animado */}
                            <ArrowBigRight
                                size={20}
                                className="text-indigo-500 transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </button>
                    </div>
                </section>

                {/* Sección de la Imagen: Oculta en pantallas pequeñas (max-width: 768px) */}
                <section className="
                    flex-1 flex justify-center 
                    mt-10 md:mt-0 
                    hidden md:flex  /* <-- CLAVE: Oculta en móvil, visible en md (768px) y superiores */
                ">
                    {/* La imagen es sensible y tiene un efecto de sombra para resaltarla */}
                    <img
                        src="/header.webp"
                        alt="E-commerce Hero"
                        // Clases para hacerla sensible, redondeada y con efecto de sombra/zoom
                        className="
                            w-full h-auto max-w-lg 
                            transition-transform duration-500 
                            hover:scale-[1.03] 
                            object-cover
                            mask-fade-30
                        "
                        // Mantenemos los atributos width y height originales para optimización
                        width='500px'
                        height='500px'
                    />
                </section>

            </header>
        </section>
    );
}