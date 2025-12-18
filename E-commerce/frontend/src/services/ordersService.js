import api from "./Api/api";

const ordersService = {
    createOrder: async (orderPayload) => {
        try {
            console.log('Enviando pedido a: /orders/pedidos/');

            const response = await api.post('/orders/pedidos/', orderPayload)

            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            console.error('Error al crear el pedido:', error);

            // 4. Manejo de Errores robusto (Igual que en tu authService)
            if (error.response) {
                // El servidor respondió con un código de error (400, 401, 500)
                console.log('Django respondió con error:', error.response.data);

                return {
                    success: false,
                    errors: error.response.data, // Aquí vienen los errores de validación de DRF
                    status: error.response.status,
                    message: 'Error de validación o servidor'
                };
            } else if (error.request) {
                // La petición se hizo pero no hubo respuesta (Server caído / Sin internet)
                return {
                    success: false,
                    errors: { general: 'No hay respuesta del servidor' },
                    message: 'Error de conexión'
                };
            } else {
                // Error en la configuración de la petición
                return {
                    success: false,
                    errors: { general: error.message },
                    message: 'Error inesperado'
                };
            }
        }
    },

    getOrders: async () => {
        try {
            console.log('Obteniendo orden de usuario: /orders/pedidos/');

            const response = await api.get('/orders/pedidos/')

            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            console.error('Error al obtener los pedidos:', error);

            if (error.response) {
                return {
                    success: false,
                    message: `Error ${error.response.status}: No se pudieron cargar los pedidos.`,
                    errors: error.response.data
                };
            } else {
                return {
                    success: false,
                    message: 'Error de conexión. Inténtalo de nuevo.',
                    errors: null
                };
            }
        }
    }
}

export default ordersService