import api from "./Api/api"

// la funcion asincrona para acceder a los datos de la api
const authService = {
    register: async (userData) => {
        try {
            const response = await api.post('/users/registro/', userData)

            return {
                success: true,
                data: response.data
            }

        } catch (error) {
            console.error('Hubo una complicacion en el registro: ', error)

            if (error.response) {

                return {
                    success: false,
                    errors: error.response.data,
                    message: 'Error al registrarse',
                    status: error.response.status
                }
            }

            else if (error.request) {
                console.log('Hubo un fallo en la conexion')

                return {
                    success: false,
                    errores: { general: 'error de conexion' },
                    message: 'Error en la conexion'
                }
            }

            else {
                console.log('error inesperado: ', error.message)

                return {
                    success: false,
                    errors: { general: 'Error inesperado' },
                    message: 'Error al procesar la solicitud'
                }
            }
        }
    },

    login: async (credentials) => {
        try {
            console.log(`Enviado credenciales de login: /users/login/`)

            const response = await api.post('/users/login/', credentials)

            // if(response.data.access){
            //     localStorage.setItem('access_token', response.data.access)
            // }

            return {
                success: true,
                data: response.data
            }

        } catch (error) {
            console.error('Error en login: ', error)
            if (error.response) {
                return {
                    success: false,
                    errors: error.response.data,
                    message: 'Error !, Las credenciales no son validas',
                    status: error.response.status
                }
            } else if (error.request) {
                return {
                    success: false,
                    errors: { general: 'error de conexion' },
                    message: 'Error en la conexion'
                }
            } else {
                return {
                    success: false,
                    errors: { general: 'Error inesperado' },
                    message: 'Error al procesar la solicitud'
                }
            }
        }
    },

    logout: async () => {
        try {
            localStorage.removeItem('access_token');
            const response = await api.post('users/logout/')
            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error)
            return {
                success: false,
                message: 'Error al cerrar sesión'
            }
        }
    },

}

export default authService