import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext';

export function RegisterUser() {
    const { register, loading, error } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: '',
        telefono: '',
        fecha_nacimiento: ''
    })

    const [formErrors, setFormErrors] = useState({})

    const validateForm = () => {
        const errors = {}

        if (!formData.first_name.trim()) {
            errors.first_name = 'El nombre es obligatorio'
        }

        if (!formData.last_name.trim()) {
            errors.last_name = 'El apellido es obligatorio'
        }

        if (!formData.email.trim()) {
            errors.email = 'El email es requerido'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'El email no es válido'
        }

        if (!formData.password) {
            errors.password = 'La contraseña es requerida'
        } else if (formData.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres'
        }

        if (formData.password !== formData.password_confirm) {
            errors.password_confirm = 'Las contraseñas no coinciden'
        }

        if (!formData.telefono.trim()) {
            errors.telefono = 'El teléfono es requerido'
        }

        if (!formData.fecha_nacimiento) {
            errors.fecha_nacimiento = 'La fecha de nacimiento es requerida'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleChangeInput = (e) => {
        setFormErrors({})
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        const result = await register(formData)
        if (result.success) {
            navigate('/')
        } else {
            if (result.errors) {
                setFormErrors(result.errors)
            }
        }
    }

    return (
        <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-gray-300 p-4 font-['Lato',_sans-serif]">
            <form className="bg-white rounded-[20px] p-8 md:p-10 lg:py-[60px] lg:px-[40px] w-full max-w-[500px] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
                <div className="mb-6 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-gray-800">Registrate en E-commerce</h1>
                    <span className="text-gray-500 text-sm">
                        ¿Ya estas registrado? <Link to="/login" className="text-indigo-600 hover:underline font-medium">Inicia sesion aqui</Link>
                    </span>
                </div>

                <div className="flex flex-col md:flex-row gap-[15px]">
                    <div className="flex-1">
                        <input
                            className={`mt-[25px] p-[10px_13px] border rounded-[7px] text-[0.95rem] tracking-[0.02rem] w-full outline-none transition-all ${formErrors.first_name ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 focus:border-indigo-500'}`}
                            name='first_name'
                            type="text"
                            placeholder="Nombre"
                            value={formData.first_name}
                            onChange={handleChangeInput}
                        />
                        {formErrors.first_name && (
                            <span className="text-red-500 text-[0.75rem] mt-1 block">{formErrors.first_name}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <input
                            className={`mt-[25px] p-[10px_13px] border rounded-[7px] text-[0.95rem] tracking-[0.02rem] w-full outline-none transition-all ${formErrors.last_name ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 focus:border-indigo-500'}`}
                            name='last_name'
                            type="text"
                            placeholder="Apellido"
                            value={formData.last_name}
                            onChange={handleChangeInput}
                        />
                        {formErrors.last_name && (
                            <span className="text-red-500 text-[0.75rem] mt-1 block">{formErrors.last_name}</span>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        className={`mt-[25px] p-[10px_13px] border rounded-[7px] text-[0.95rem] tracking-[0.02rem] w-full outline-none transition-all ${formErrors.email ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 focus:border-indigo-500'}`}
                        name='email'
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={formData.email}
                        onChange={handleChangeInput}
                    />
                    {formErrors.email && (
                        <span className="text-red-500 text-[0.75rem] mt-1 block">{formErrors.email}</span>
                    )}
                </div>

                <div>
                    <input
                        className={`mt-[25px] p-[10px_13px] border rounded-[7px] text-[0.95rem] tracking-[0.02rem] w-full outline-none transition-all ${formErrors.fecha_nacimiento ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 focus:border-indigo-500'}`}
                        name='fecha_nacimiento'
                        type="date"
                        value={formData.fecha_nacimiento}
                        onChange={handleChangeInput}
                    />
                    {formErrors.fecha_nacimiento && (
                        <span className="text-red-500 text-[0.75rem] mt-1 block">{formErrors.fecha_nacimiento}</span>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-[15px]">
                    <div className="flex-1">
                        <input
                            className={`mt-[25px] p-[10px_13px] border rounded-[7px] text-[0.95rem] tracking-[0.02rem] w-full outline-none transition-all ${formErrors.password ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 focus:border-indigo-500'}`}
                            name='password'
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={formData.password}
                            onChange={handleChangeInput}
                        />
                        {formErrors.password && (
                            <span className="text-red-500 text-[0.75rem] mt-1 block">{formErrors.password}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <input
                            className={`mt-[25px] p-[10px_13px] border rounded-[7px] text-[0.95rem] tracking-[0.02rem] w-full outline-none transition-all ${formErrors.password_confirm ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 focus:border-indigo-500'}`}
                            name='password_confirm'
                            type="password"
                            placeholder="Repite tu contraseña"
                            value={formData.password_confirm}
                            onChange={handleChangeInput}
                        />
                        {formErrors.password_confirm && (
                            <span className="text-red-500 text-[0.75rem] mt-1 block">{formErrors.password_confirm}</span>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        className={`mt-[25px] p-[10px_13px] border rounded-[7px] text-[0.95rem] tracking-[0.02rem] w-full outline-none transition-all ${formErrors.telefono ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 focus:border-indigo-500'}`}
                        name='telefono'
                        type="text"
                        placeholder="Ingresa tu teléfono"
                        value={formData.telefono}
                        onChange={handleChangeInput}
                    />
                    {formErrors.telefono && (
                        <span className="text-red-500 text-[0.75rem] mt-1 block">{formErrors.telefono}</span>
                    )}
                </div>

                <div className="mt-5">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-[100px] text-gray-500 text-sm gap-2">
                            <span className="h-8 w-8 rounded-full border-[3px] border-gray-200 border-t-indigo-600 animate-spin"></span>
                            Cargando...
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="w-full py-[17px] px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-[7px] text-base tracking-[0.05rem] transition-all duration-150 cursor-pointer shadow-md active:scale-[0.98]"
                            onClick={handleSubmit}
                        >
                            Crear cuenta
                        </button>
                    )}
                </div>

                {error && (
                    <div className="mt-5 p-4 bg-red-50 border border-red-100 rounded-[10px] text-center">
                        <span className="text-red-500 text-[0.85rem] font-semibold">{error.message}</span>
                    </div>
                )}
            </form>
        </main>
    )
}