# 🛒 E-commerce Full-Stack

![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-green)
![Versión](https://img.shields.io/badge/Versi%C3%B3n-1.0.0-blue)
![Actualización](https://img.shields.io/badge/%C3%9Altima%20Actualizaci%C3%B3n-Enero%202026-orange)

Plataforma de comercio electrónico de alto rendimiento desarrollada con una arquitectura desacoplada. Este sistema integra un **Backend robusto en Django** con un **Frontend dinámico en React**, garantizando una experiencia de usuario fluida y una gestión de datos eficiente.

🚀 **[Ver Demo en Vivo](https://e-commerce-nine-amber-50.vercel.app)**

---

## ✨ Características Principales

* **Catálogo Dinámico:** Gestión completa de productos con detalles, precios e imágenes sincronizados en tiempo real.
* **Gestión de Carrito:** Sistema funcional para agregar, eliminar y modificar cantidades con persistencia de datos.
* **Autenticación Segura:** Registro de usuarios, inicio de sesión y perfiles protegidos mediante Django Auth.
* **Panel Administrativo:** Interfaz profesional para el control de inventario, categorías y pedidos.
* **Arquitectura API REST:** Comunicación estandarizada entre el cliente y el servidor mediante JSON.
* **Diseño Responsivo:** Interfaz adaptada para una navegación óptima en dispositivos móviles y de escritorio.

---

## 🛠️ Tecnologías Utilizadas



### **Frontend**
* **React** (Biblioteca principal para la UI)
* **Vite** (Entorno de desarrollo y empaquetado ultra rápido)
* **React Router DOM** (Gestión de navegación y rutas)
* **CSS Modules** (Estilos aislados para evitar colisiones)
* **Axios** (Cliente HTTP para el consumo de la API)

### **Backend**
* **Python & Django** (Framework de alto nivel para el servidor)
* **Django REST Framework** (Toolkit para construir potentes APIs web)
* **PostgreSQL / SQLite** (Gestión de base de datos relacional)

---

## ⚙️ Configuración e Instalación Local

Sigue estos pasos para poner en marcha el proyecto en tu máquina:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
cd E-commerce

2. Configurar el Backend (Django)
Bash

cd backend
python -m venv venv
source venv/bin/activate  # En Windows usa: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

3. Configurar el Frontend (React)
Bash

cd ../frontend
pnpm install  # También puedes usar npm install
pnpm dev

📁 Estructura del Proyecto
Plaintext

E-commerce/
├── backend/              # Lógica del servidor (Django)
│   ├── apps/             # Aplicaciones modulares (orders, products, users, etc.)
│   ├── config/           # Ajustes globales del proyecto
│   ├── data.json         # Datos iniciales (Seeds)
│   └── manage.py         # Utilidad de línea de comandos de Django
├── frontend/             # Interfaz de usuario (React)
│   ├── src/
│   │   ├── components/   # Componentes atómicos y reutilizables
│   │   ├── context/      # Manejo de estados globales
│   │   ├── pages/        # Vistas principales de la aplicación
│   │   └── services/     # Lógica de conexión con la API
│   └── vite.config.js    # Configuración de compilación de Vite
└── README.md

📊 Métricas del Proyecto

    Commits realizados: 18

    Contribuidores: 1 (Desarrollador independiente)

    Lenguajes: JavaScript (68.9%), Python (29.2%), CSS/HTML (1.9%)

🤝 Contribución y Soporte

Si deseas mejorar el proyecto:

    Realiza un Fork.

    Crea una rama con tu mejora (git checkout -b feature/MejoraX).

    Envía un Pull Request detallando tus cambios.