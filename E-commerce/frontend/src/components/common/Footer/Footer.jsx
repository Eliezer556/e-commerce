import { useCart } from "../../../context/CartContext"
import './Footer.css'
import { useAuth } from "../../../context/AuthContext"
import { 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react'

export function Footer() {
    return (
        <footer className="footer">
            {/* Sección superior con información */}
            <div className="footer-top">
                <div className="footer-container">
                    {/* Información de la empresa */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <ShoppingBag className="logo-icon" />
                            <span className="logo-text">E-Commerce</span>
                        </div>
                        <p className="footer-description">
                            Tu tienda online de confianza. Ofrecemos los mejores productos 
                            con calidad garantizada y envío rápido a todo el país.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="YouTube">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="footer-section">
                        <h3 className="footer-title">Enlaces Rápidos</h3>
                        <ul className="footer-links">
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/productos">Productos</a></li>
                            <li><a href="/categories">Categorías</a></li>
                            <li><a href="/offers">Ofertas</a></li>
                            <li><a href="/about">Nosotros</a></li>
                        </ul>
                    </div>

                    {/* Servicio al cliente */}
                    <div className="footer-section">
                        <h3 className="footer-title">Servicio al Cliente</h3>
                        <ul className="footer-links">
                            <li><a href="/contact">Contáctanos</a></li>
                            <li><a href="/shipping">Envíos y Entregas</a></li>
                            <li><a href="/returns">Devoluciones</a></li>
                            <li><a href="/faq">Preguntas Frecuentes</a></li>
                            <li><a href="/terms">Términos y Condiciones</a></li>
                        </ul>
                    </div>

                    {/* Información de contacto */}
                    <div className="footer-section">
                        <h3 className="footer-title">Contáctanos</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <Phone size={16} />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={16} />
                                <span>info@ecommerce.com</span>
                            </div>
                            <div className="contact-item">
                                <MapPin size={16} />
                                <span>Av. Principal 123, Ciudad</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de características */}
            <div className="features-section">
                <div className="footer-container">
                    <div className="feature-item">
                        <Truck size={32} />
                        <div className="feature-text">
                            <h4>Envío Gratis</h4>
                            <p>En compras mayores a $50</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <Shield size={32} />
                        <div className="feature-text">
                            <h4>Pago Seguro</h4>
                            <p>Transacciones 100% protegidas</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <CreditCard size={32} />
                        <div className="feature-text">
                            <h4>Garantía</h4>
                            <p>30 días de garantía</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <Phone size={32} />
                        <div className="feature-text">
                            <h4>Soporte 24/7</h4>
                            <p>Ayuda cuando la necesites</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección inferior */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <div className="copyright">
                            &copy; 2024 E-Commerce. Todos los derechos reservados.
                        </div>
                        <div className="footer-bottom-links">
                            <a href="/privacy">Privacidad</a>
                            <a href="/terms">Términos</a>
                            <a href="/cookies">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}