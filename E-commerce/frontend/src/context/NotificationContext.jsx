import { createContext, useCallback, useContext, useState } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null)

    const showNotification = useCallback((message) => {
        setNotification(message)

        const timer = setTimeout(() => {
            setNotification(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [])

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {notification && (
                <div className="fixed bottom-5 right-5 z-[100] bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl animate-in slide-in-from-right-10 duration-300 flex items-center gap-2 z-[1002]">
                    <span className="font-medium">{notification}</span>
                </div>
            )}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error("useNotification debe usarse dentro de un NotificationProvider");
    }
    return context;
}