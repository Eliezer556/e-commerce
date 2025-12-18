import api from "./Api/api"

// Configuracion axios api
const productService = {
    // Función para obtener productos
    getProducts: async () => {
        // Usamos la instancia 'api' y completamos la ruta desde la raíz
        // GET http://127.0.0.1:8000/products/producto/
        const response = await api.get('/products/producto/');
        return response.data;
    },
    
    // Ejemplo: Si en el futuro necesitas obtener un producto por ID
    getProductById: async (id) => {
        const response = await api.get(`/products/producto/${id}/`);
        return response.data;
    }
};

export default productService