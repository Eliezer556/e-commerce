import { Users, Target, ShieldCheck, Heart, ShoppingBag, Award } from 'lucide-react';

export function AboutUs() {
    const stats = [
        { label: "Clientes Felices", value: "10k+", icon: <Users className="text-indigo-600" size={24} /> },
        { label: "Productos Premium", value: "500+", icon: <ShoppingBag className="text-indigo-600" size={24} /> },
        { label: "Años de Experiencia", value: "5+", icon: <Award className="text-indigo-600" size={24} /> },
    ];

    const values = [
        {
            title: "Calidad Garantizada",
            description: "Seleccionamos cada producto bajo los más altos estándares para asegurar tu satisfacción total.",
            icon: <ShieldCheck size={32} />
        },
        {
            title: "Pasión por el Cliente",
            description: "Tu experiencia de compra es nuestra prioridad. Estamos aquí para ayudarte en cada paso.",
            icon: <Heart size={32} />
        },
        {
            title: "Visión Innovadora",
            description: "Buscamos constantemente las últimas tendencias para traerte lo mejor del mercado global.",
            icon: <Target size={32} />
        }
    ];

    return (
        <section className="bg-white">
            <div className="relative bg-indigo-900 py-20 mb-16 mt-[80px]">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Nuestra Historia</h1>
                    <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Transformando la manera en que compras online, ofreciendo elegancia y calidad en cada detalle desde nuestra fundación.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mb-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                                alt="Equipo trabajando" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-indigo-600 p-8 rounded-2xl shadow-xl hidden lg:block">
                            <p className="text-white text-3xl font-bold">100%</p>
                            <p className="text-indigo-100 text-sm">Compromiso Real</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900">¿Quiénes Somos?</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            En <span className="text-indigo-600 font-semibold italic">E-Commerce</span>, no solo vendemos productos; creamos conexiones. Nacimos con la idea de simplificar el acceso a artículos exclusivos, combinando tecnología de vanguardia con un servicio humano excepcional.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Creemos que cada compra cuenta una historia, y queremos ser parte de la tuya entregándote excelencia directamente en la puerta de tu hogar.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex justify-center mb-2">{stat.icon}</div>
                                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Valores que nos definen</h2>
                        <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div 
                                key={index} 
                                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
                            >
                                <div className="text-indigo-600 mb-6 transition-transform duration-300 group-hover:scale-110">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-24 text-center">
                <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para mejorar tu estilo de vida?</h2>
                        <p className="text-indigo-100 mb-10 text-lg max-w-xl mx-auto">
                            Únete a miles de personas que ya confían en nuestra selección exclusiva de productos.
                        </p>
                        <button className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg active:scale-95">
                            Explorar Catálogo
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-32 -mt-32 opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full -ml-32 -mb-32 opacity-20"></div>
                </div>
            </div>
        </section>
    );
}