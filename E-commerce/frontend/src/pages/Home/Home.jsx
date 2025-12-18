import { Carrousel } from "../../components/features/Carrousel/Carrousel"
import { ArrowUpRight, Minus } from "lucide-react"
// import './Home.css'

export function Home() {
    const SECONDARY_BUTTON_CLASSES = "w-full sm:w-auto px-8 py-3 bg-white cursor-pointer text-indigo-700 hover:text-white border-2 border-indigo-500 rounded-full font-semibold transition-all duration-300 hover:bg-indigo-900 hover:shadow-md flex items-center justify-center gap-2 group";

    const REDIRECT_BUTTON_CLASS = "text-white font-semibold text-sm py-2 px-6 rounded-full cursor-pointer bg-blue-900 hover:bg-blue-950 transition-all duration-300 shadow-md shadow-indigo-400/50";

    return (
        <main className="flex flex-col items-center">
            <Carrousel />
            <section className="flex items-center justify-center w-full h-auto lg:h-[620px] bg-slate-50 py-10">
                <div className="
        p-4 flex flex-col items-center justify-center gap-10 lg:flex-row 
        max-w-7xl mx-auto
    ">
                    <div className="order-2 lg:order-1">
                        <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">Exclusividad En Moda</h4>
                        <p className="max-w-full lg:max-w-xl mb-4 text-gray-700 text-base md:text-xl">
                            Si eres un amante de la ropa moderna y buscas constantemente estilos que definan tu individualidad, has llegado al lugar correcto. Hemos seleccionado cuidadosamente una colección de prendas que no solo siguen las últimas tendencias, sino que las redefinen, asegurando que cada pieza hable por sí misma.
                        </p>
                        <button className={REDIRECT_BUTTON_CLASS}>Ir a sección</button>
                    </div>
                    <div className="
            relative w-full h-[350px] sm:w-[500px] sm:h-[450px] 
            order-1 lg:order-2"
                    >
                        <div className="absolute bottom-0 right-0 w-4/5 h-4/5 bg-indigo-900 z-0 rounded-lg">
                        </div>
                        <div className="absolute top-0 left-0 z-10 
                translate-x-8 -translate-y-1
                w-4/5 h-4/5 bg-slate-100 shadow-2xl overflow-hidden rounded-lg">
                            <img
                                className="w-full h-full object-cover"
                                src="/img1.png"
                                alt="Modelo"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex justify-center items-center w-full bg-gradient-to-r from-indigo-900 to-violet-600 p-4 md:p-8">
                <div className="
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                        gap-4 md:gap-6 max-w-7xl mx-auto py-10 md:py-20
                    ">

                    {/* Tarjeta 1 */}
                    <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg h-full flex flex-col justify-between">
                        <div>
                            <img src="/img7.webp" alt="Batidora" className="w-full h-56 md:h-80 object-cover mb-4 rounded-lg" />
                            <h4 className="text-xl font-semibold mb-2">El Corazón de su Hogar</h4>
                            <p className="text-gray-700 mb-4">Transforme su cocina en un espacio de creatividad y eficiencia. Desde utensilios profesionales hasta gadgets inteligentes, nuestra selección está pensada para hacer cada receta más fácil y placentera.</p>
                        </div>
                        <button className={SECONDARY_BUTTON_CLASSES}>Ir a categoria</button>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg h-full flex flex-col justify-between">
                        <div>
                            <img src="/img6.webp" alt="Laptop" className="w-full h-56 md:h-80 object-cover mb-4 rounded-lg" />
                            <h4 className="text-xl font-semibold mb-2">Potencia y conexion</h4>
                            <p className="text-gray-700 mb-4">Manténgase a la vanguardia con nuestra colección de electrónica cuidadosamente seleccionada. Le ofrecemos la última innovación, rendimiento excepcional y diseño vanguardista.</p>
                        </div>
                        <button className={SECONDARY_BUTTON_CLASSES}>Ir a categoria</button>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="col-span-1 bg-white p-6 shadow-lg rounded-lg h-full flex flex-col justify-between">
                        <div>
                            <img src="/img3.webp" alt="Mesa" className="w-full h-56 md:h-80 object-cover mb-4 rounded-lg" />
                            <h4 className="text-xl font-semibold mb-2">Estilo y función</h4>
                            <p className="text-gray-700 mb-4">Descubra la pieza central perfecta para su hogar con nuestra colección de mesas de casa seleccionadas con esmero. Le brindamos la mejor calidad, estabilidad insuperable y diseños que se integran con elegancia en cualquier ambiente.</p>
                        </div>
                        <button className={SECONDARY_BUTTON_CLASSES}>Ir a categoria</button>
                    </div>
                </div>
            </section>
            <section className="bg-slate-100 py-16 md:py-24 overflow-hidden"> 
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                        Lo que nuestros clientes dicen
                    </h2>

                    <div className="flex flex-col items-center gap-12 md:gap-16"> {/* Flexbox para apilar los testimonios */}

                        {/* Testimonio 1 */}
                        <div className="
                            w-full md:w-4/5 lg:w-3/5 p-8 bg-white shadow-xl rounded-xl relative 
                            transform md:rotate-2 md:-translate-x-1/12
                        ">
                            <div className="flex items-center mb-6">
                                <img src="/img5.png" alt="Avatar Cliente 1" className="w-16 h-16 rounded-full object-cover mr-4 shadow-md" />
                                <div>
                                    <h5 className="text-lg font-bold text-gray-900">Miguel López</h5>
                                    <p className="text-sm text-gray-600">Comprador frecuente</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-500 mb-4">
                                ⭐⭐⭐⭐⭐
                            </div>
                            <p className="text-gray-800 leading-relaxed italic">
                                "Compré un smartphone y quedé impresionado. Desde la navegación hasta la entrega, todo fue perfecto. El producto llegó antes de lo esperado, bien empaquetado y exactamente como se mostraba. ¡Definitivamente mi nueva tienda favorita de tecnología!"
                            </p>
                            <span className="absolute -top-3 -right-3 text-7xl font-bold text-gray-200 opacity-50 select-none">“</span>
                        </div>

                        {/* Testimonio 2 (Intercalado - hacia la otra dirección) */}
                        <div className="
                            w-full md:w-4/5 lg:w-3/5 p-8 bg-white shadow-xl rounded-xl relative 
                            transform md:-rotate-2 md:translate-x-1/12
                        ">
                            <div className="flex items-center mb-6">
                                <img src="/user_perfil1.jpg" alt="Avatar Cliente 2" className="w-16 h-16 rounded-full object-cover mr-4 shadow-md" />
                                <div>
                                    <h5 className="text-lg font-bold text-gray-900">Ana García</h5>
                                    <p className="text-sm text-gray-600">Diseñadora de interiores</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-500 mb-4">
                                ⭐⭐⭐⭐⭐
                            </div>
                            <p className="text-gray-800 leading-relaxed italic">
                                "Las mesas de esta tienda son increíbles. Encontré la pieza perfecta que complementa mi comedor a la perfección. La calidad es excelente y el envío fue muy rápido. ¡Recomiendo totalmente esta tienda para muebles de calidad!"
                            </p>
                            <span className="absolute -top-3 -right-3 text-7xl font-bold text-gray-200 opacity-50 select-none">“</span>
                        </div>

                        {/* Testimonio 3 */}
                        <div className="
                            w-full md:w-4/5 lg:w-3/5 p-8 bg-white shadow-xl rounded-xl relative 
                            transform md:rotate-1 md:-translate-x-1/12
                        ">
                            <div className="flex items-center mb-6">
                                <img src="/user_perfil2.png" alt="Avatar Cliente 3" className="w-16 h-16 rounded-full object-cover mr-4 shadow-md" />
                                <div>
                                    <h5 className="text-lg font-bold text-gray-900">Carlos Ruíz</h5>
                                    <p className="text-sm text-gray-600">Chef aficionado</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-500 mb-4">
                                ⭐⭐⭐⭐⭐
                            </div>
                            <p className="text-gray-800 leading-relaxed italic">
                                "Los utensilios de cocina son de primera. Mi experiencia cocinando ha mejorado muchísimo gracias a la calidad de los productos. La descripción en la web es muy precisa y el servicio al cliente es excepcional."
                            </p>
                            <span className="absolute -top-3 -right-3 text-7xl font-bold text-gray-200 opacity-50 select-none">“</span>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}