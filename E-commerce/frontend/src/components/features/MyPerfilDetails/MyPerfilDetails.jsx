import { Camera, Trash2, Loader2 } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext';
import { useRef, useState } from 'react';
import { userService } from '../../../services/userService';

export function MyPerfilDetails() {
    const { user, updateUser } = useAuth()
    const fileInputRef = useRef(null)
    const [loadingImage, setLoadingImage] = useState(false)

    const handleButtonClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0]
        if (!file) return;

        setLoadingImage(true)
        const formData = new FormData()
        formData.append('foto_perfil', file)

        try {
            const result = await userService.updateProfileImage(formData);
            if (result.success) {
                updateUser(result.user)
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        } finally {
            setLoadingImage(false)
        }
    }

    const handleDeletePhoto = async () => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar tu foto de perfil?')) return;

        setLoadingImage(true)
        try {
            const result = await userService.deleteProfileImage()
            if (result.success) {
                updateUser(result.user)
            }
        } catch (err) {
            console.error("Error en la eliminación:", err);
        } finally {
            setLoadingImage(false);
        }
    }

    const DataField = ({ label, value, type = 'text' }) => (
        <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-bold text-gray-400 uppercase tracking-wider'>{label}</label>
            <input 
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all' 
                type={type} 
                value={value || 'N/A'} 
                readOnly 
            />
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className='text-2xl font-bold text-gray-800 tracking-tight'>Mi Perfil Público</h2>

            {/* Bloque de Foto de Perfil */}
            <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8'>
                <div className='relative group'>
                    <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center'>
                        {loadingImage ? (
                            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                        ) : (
                            <img 
                                className='w-full h-full object-cover' 
                                src={user?.foto_perfil} 
                                alt="Profile" 
                            />
                        )}
                    </div>
                    <button 
                        onClick={handleButtonClick}
                        className="absolute bottom-0 right-0 bg-indigo-600 p-2.5 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
                    >
                        <Camera size={18} />
                    </button>
                </div>

                <div className='flex-1 text-center md:text-left space-y-1'>
                    <h3 className='text-xl font-bold text-gray-900'>¡Hola, {user?.first_name || 'Usuario'}!</h3>
                    <p className='text-gray-500 text-sm font-medium'>Miembro desde 2024</p>
                    
                    <div className='flex flex-wrap justify-center md:justify-start gap-3 mt-4'>
                        <input
                            type='file'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept='image/jpeg,image/png'
                            className="hidden"
                            disabled={loadingImage}
                        />
                        <button
                            className='text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors'
                            onClick={handleButtonClick}
                            disabled={loadingImage}
                        >
                            Cambiar Foto
                        </button>
                        <button
                            className='text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1'
                            onClick={handleDeletePhoto}
                            disabled={loadingImage}
                        >
                            <Trash2 size={12} /> Eliminar Foto
                        </button>
                    </div>
                </div>
            </div>

            {/* Bloque de Datos Personales */}
            <div className='bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm'>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                    <h4 className='text-lg font-bold text-gray-800'>Detalles de la Cuenta</h4>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <DataField label="Nombre" value={user?.first_name} />
                    <DataField label="Apellido" value={user?.last_name} />
                    <DataField label="Correo Electrónico" value={user?.email} type='email' />
                    <DataField label="Teléfono" value={user?.telefono} />
                </div>

                <div className='mt-8 pt-6 border-t border-gray-50 flex justify-end'>
                    <button className='bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all'>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    )
}