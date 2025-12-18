import api from "./Api/api";

export const userService = {
    updateProfileImage: async (formData) => {
        try {
            const response = await api.patch('/users/profile/update-image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return {
                success: true,
                user: response.data.user
            }

        } catch (error) {
            console.error('Error al actualizar la foto de perfil:', error.response ? error.response.data : error.message);

            return {
                success: false,
                errors: error.response ? error.response.data : { general: 'Error de conexión' },
                message: 'Error al subir la foto'
            };
        }
    },

    deleteProfileImage: async () => {
        try {

            const response = await api.patch('/users/profile/update-image/', {
                foto_perfil : null
            });

            return {
                success: true,
                user: response.data.user
            }

        } catch (error) {
            console.error('Error al eliminar la foto de perfil:', error.response ? error.response.data : error.message);
            
            return {
                success: false,
                errors: error.response ? error.response.data : { general: 'Error de conexión' },
                message: 'Error al eliminar la foto'
            };
        }
    }
}