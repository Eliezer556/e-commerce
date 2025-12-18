import { useContext, createContext, useState, useEffect } from "react";
import authService from "../services/authService";
import { userService } from "../services/userService";

// Crear contexto
export const AuthContext = createContext()

// Proveer contexto
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = () => {
        const token = localStorage.getItem('access_token')
        const userData = localStorage.getItem('user')

        if (token && userData && userData !== 'undefined') {
            try {
                setUser(JSON.parse(userData)) // ⬅️ Ahora dentro de un try/catch
            } catch (e) {
                console.error("Error al parsear el usuario de localStorage:", e);
                // Si falla el parseo, limpiamos el localStorage para evitar el bucle de error.
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
            }
        }
    }

    const register = async (userData) => {
        setLoading(true)

        try {
            const response = await authService.register(userData)

            if (response.success) {
                console.log('Registro completado: ', response.data)

                const userToStore = response.data.usuario || response.data
                setUser(userToStore)
                localStorage.setItem('user', JSON.stringify(userToStore))
                return {
                    success: true,
                    user: response.data
                }
            } else {
                setError(response.errors)
                setUser(null)

                return {
                    success: false,
                    errors: response.errors
                }
            }
        } catch (error) {
            console.error({ general: 'error inesperado en servidor: ', error })

            setError({ general: 'error en el servidor' })
            setUser(null)

            return {
                success: false,
                errors: { general: 'error en el servidor' }
            }
        } finally {
            setLoading(false)
        }
    }

    const login = async (credentials) => {
        setLoading(true)
        setError(null)

        try {
            const result = await authService.login(credentials)

            if (result.success) {

                const accessToken = result.data.access
                const refreshToken = result.data.refresh

                if (!accessToken) {
                    console.error("❌ Token de acceso no encontrado en la respuesta del servidor.");
                    setError({ general: 'Respuesta de login incompleta: falta el token de acceso.' });
                    return { success: false, message: 'Falta el token de acceso.' };
                }

                setUser(result.data.user)
                localStorage.setItem('user', JSON.stringify(result.data.user))
                localStorage.setItem('access_token', accessToken)

                if (refreshToken) {
                    localStorage.setItem('refresh_token', refreshToken)
                }

                return result
            } else {
                setError(result)
                return result
            }
        } catch (error) {
            setError(error)
            return { success: false, message: error.message }
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(false)

        try {
            await authService.logout()
        } catch (error) {
            console.error('Error en logout:', error)
        } finally {
            setUser(null)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            setLoading(false)
        }
    }

    const updateUser = (newUserData) => {
        // Actualizar el antiguo usuario con el nuevo usuario
        console.log('usuario viejo', newUserData)
        const newUpdateUser = { ...user, ...newUserData }
        console.log('usuario nuevo', newUpdateUser)
        setUser(newUpdateUser)
        localStorage.setItem('user', JSON.stringify(newUpdateUser));

        return newUpdateUser;
    }

    const value = {
        user,
        loading,
        error,
        setError,
        register,
        logout,
        login,
        updateUser,
        isAuthenticated: !!user,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook de AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }

    return context
};