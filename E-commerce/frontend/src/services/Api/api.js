import axios from 'axios';

// 1. Definimos la URL Raíz (Sin sub-rutas como /products o /users)
const API_BASE_URL = 'http://127.0.0.1:8000';

// 2. Creamos la instancia ÚNICA de axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": 'application/json'
    }
});

export default api

// 3. Interceptor de solicitud
api.interceptors.request.use(
    (config) => {
        // Buscamos el token guardado
        const token = localStorage.getItem('access_token');
        
        // Si existe, lo inyectamos. Si no, la petición sale sin token (útil para login/register)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 4. Interceptor de Respuesta para manejar la caducidad del token (401)
api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refresh_token');

        // Condición para intentar refrescar: error 401, y no es la solicitud de refresh en sí, y tenemos un refresh token
        if (error.response?.status === 401 && !originalRequest._isRetry && refreshToken) {
            
            originalRequest._isRetry = true; // Marca esta petición como reintentada
            console.log('Token de acceso caducado. Intentando renovar...');

            try {
                // Llama al endpoint de Django para obtener un nuevo token
                const refreshResponse = await axios.post(`${API_BASE_URL}/users/token/refresh/`, {
                    refresh: refreshToken
                });

                const newAccessToken = refreshResponse.data.access;
                
                // Actualiza el token en el Local Storage
                localStorage.setItem('access_token', newAccessToken);

                // Actualiza el header de la solicitud original y la reenvía
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return api(originalRequest); // Repite la solicitud original
                
            } catch (refreshError) {
                // Si falla la renovación del token (refresh token caducado o inválido)
                console.error('Fallo la renovación del token. Forzando logout.', refreshError);
                
                // Forzar el logout y limpiar tokens (usando el contexto o limpiando localStorage)
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                // Nota: Podrías necesitar acceder al contexto de React para llamar a la función logout()
                
                return Promise.reject(refreshError);
            }
        }
        // Si no es un 401 o si el refresh falló, pasa el error
        return Promise.reject(error);
    }
);