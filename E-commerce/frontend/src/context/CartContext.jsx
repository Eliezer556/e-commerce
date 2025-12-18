import { createContext, useEffect, useState, useContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const storedCard = localStorage.getItem('cart')
            return storedCard ? JSON.parse(storedCard) : [] ;
        } catch (error) {
            console.error('Error al guardar el carrito: ', error)
            return []
        }
    })
    
    const saveToCartStorage = (cardData) => {
        try {
            console.log('Carrito guardado en localStorage')
            localStorage.setItem('cart', JSON.stringify(cardData))
        } catch (error) {
            console.error('Error al guardar en el carrito', error)
        }
    }
    
    useEffect(() => {
        saveToCartStorage(cart)
    }, [cart])

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);

            if (existingProduct) {
                // Producto existe - incrementar cantidad
                return prevCart.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: (item.quantity || 1) + 1,
                            totalPrice: parseFloat(item.precio) * ((item.quantity || 1) + 1)
                        }
                        : item
                );
            }

            // Producto nuevo - agregar con cantidad 1
            return [...prevCart, {
                ...product, 
                quantity: 1,
                totalPrice: parseFloat(product.precio)
            }];
        });
    };

    const deleteToCart = (product) => {
        setCart(prevCart => {
            return prevCart.filter(item => item.id !== product.id)
        })
    }

    const resetToCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                deleteToCart,
                resetToCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
};