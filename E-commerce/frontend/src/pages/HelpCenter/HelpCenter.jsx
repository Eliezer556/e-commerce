import { HelpCircle, ChevronDown, Truck,ShieldCheck, CreditCard, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

export function HelpCenter() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "¿Cuánto tarda en llegar mi pedido?",
            answer: "Los envíos estándar demoran entre 3 a 5 días hábiles. Si te encuentras en la zona metropolitana, podrías recibirlo en menos de 48 horas.",
            icon: <Truck size={20} className="text-indigo-600" />
        },
        {
            question: "¿Qué métodos de pago aceptan?",
            answer: "Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, Amex), PayPal y transferencias bancarias directas.",
            icon: <CreditCard size={20} className="text-indigo-600" />
        },
        {
            question: "¿Es seguro comprar en este sitio?",
            answer: "Absolutamente. Contamos con certificados SSL de 256 bits y procesadores de pago encriptados para que tus datos estén siempre protegidos.",
            icon: <ShieldCheck size={20} className="text-indigo-600" />
        },
        {
            question: "¿Puedo realizar cambios o devoluciones?",
            answer: "Sí, tienes hasta 30 días naturales después de tu compra para solicitar un cambio o devolución sin costo adicional, siempre que el producto esté en su estado original.",
            icon: <RefreshCcw size={20} className="text-indigo-600" />
        }
    ];

    return (
        <section className="py-20 bg-white min-h-[calc(100vh-140px)] mt-[80px]">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-4">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Centro de Ayuda</h1>
                    <p className="text-gray-500 text-lg">Resolvemos tus dudas para que tu única preocupación sea elegir tu producto favorito.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className="border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <button 
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-indigo-50 rounded-xl">
                                        {faq.icon}
                                    </div>
                                    <span className="font-bold text-slate-800 md:text-lg">{faq.question}</span>
                                </div>
                                <ChevronDown 
                                    size={20} 
                                    className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-indigo-900 rounded-[2.5rem] text-center relative overflow-hidden shadow-xl">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-2">¿Aún tienes preguntas?</h3>
                        <p className="text-indigo-200 mb-6">Nuestro equipo de soporte está disponible 24/7 para ayudarte.</p>
                        <button className="bg-white text-indigo-600 px-8 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-lg">
                            Contactar Soporte
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16"></div>
                </div>
            </div>
        </section>
    );
}