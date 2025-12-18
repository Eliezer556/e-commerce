import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function LoginUser() {
    const { login, loading, error, setError } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const redirectPath = searchParams.get('redirect') || '/'

    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: '',
    })

    const [formErrors, setFormErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormDataLogin(prev => ({
            ...prev,
            [name]: value
        }))
        setError(null)
        setFormErrors({})
    }

    const validateForm = () => {
        const errors = {}
        if (!formDataLogin.email.trim()) {
            errors.email = 'Por favor, ingresa un email'
        } else if (!formDataLogin.email.includes('@')) {
            errors.email = 'Por favor introduzca un email valido'
        } else if (!formDataLogin.password.trim()) {
            errors.password = 'Debe ingresar tu contraseña por favor'
        }
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        const result = await login(formDataLogin)
        if (result.success) {
            navigate(redirectPath)
        } else {
            if (result.errors) {
                setFormErrors(result.errors)
            }
        }
    }

    return (
        <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-gray-300 p-4">
            <form className="bg-white p-8 md:p-12 lg:py-[70px] lg:px-[30px] rounded-[20px] w-full max-w-[450px] shadow-xl">
                <div className="mb-8 items-center flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido de vuelta !</h1>
                    <span className="text-gray-500 text-sm">
                        ¿No tienes cuenta? <Link to="/registro" className="text-indigo-600 hover:underline font-medium">Crear una cuenta</Link>
                    </span>
                </div>

                <div className="mb-4">
                    <input
                        className={`w-full p-4 border rounded-lg outline-none transition-all duration-200 ${formErrors.email || error ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-indigo-500'}`}
                        name="email"
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={formDataLogin.email}
                        onChange={handleChange}
                    />
                    {formErrors.email && (
                        <span className="text-red-600 text-xs mt-1 block font-medium">{formErrors.email}</span>
                    )}
                </div>

                <div className="mb-6">
                    <input
                        className={`w-full p-4 border rounded-lg outline-none transition-all duration-200 ${formErrors.password || error ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-indigo-500'}`}
                        name="password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={formDataLogin.password}
                        onChange={handleChange}
                    />
                    {formErrors.password && (
                        <span className="text-red-600 text-xs mt-1 block font-medium">{formErrors.password}</span>
                    )}
                </div>

                <div className="w-full">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-[100px] gap-2 text-gray-600 font-medium text-sm">
                            <span className="h-8 w-8 rounded-full border-[3px] border-gray-300 border-t-transparent animate-spin"></span>
                            Cargando...
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="w-full mt-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors duration-300 tracking-wide"
                            onClick={handleSubmit}
                        >
                            Iniciar sesión
                        </button>
                    )}
                </div>

                {error && (
                    <div className="flex items-center gap-3 bg-red-100 w-full mt-5 rounded-xl p-4 text-red-900 text-sm font-semibold border border-red-200">
                        <X size={20} className="shrink-0" />
                        <span>{error.message}</span>
                    </div>
                )}
            </form>
        </main>
    )
}