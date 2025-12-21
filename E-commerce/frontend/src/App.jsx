import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { ProductList } from './components/features/Product/ProductList';
import { CartProvider } from './context/CartContext';
import { AuthLayout } from './components/layout/AuthLayout';
import { AppLayout } from './components/layout/AppLayout';
import { WebSiteLayout } from './components/layout/WebSiteLayout';
import { AuthProvider } from './context/AuthContext';
import { LoginUser } from './pages/Login/LoginUser';
import { RegisterUser } from './pages/Register/RegisterUser';
import { ProductProvider } from './context/ProductContext';
import { OrderAdress } from './pages/OrderAdress/OrderAdress';
import { PerfilUser } from './pages/PerfilUser/PerfilUser';
import { PerfilUserLayout } from './components/layout/PerfilUserLayout';
import { MyPerfilDetails } from './components/features/MyPerfilDetails/MyPerfilDetails';
import { MyOrders } from './components/features/MyOrders/MyOrders';
import { FiltersProvider } from './context/FiltersContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {

  return (

    <NotificationProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <FiltersProvider>
              <Router>
                <Routes>
                  <Route path='/' element={
                    <WebSiteLayout>
                      <Home />
                    </WebSiteLayout>
                  } />
                  <Route path='/productos' element={
                    <AppLayout>
                      <ProductList />
                    </AppLayout>
                  } />
                  <Route path='/login' element={
                    <AuthLayout>
                      <LoginUser />
                    </AuthLayout>
                  } />

                  <Route path='/registro' element={
                    <AuthLayout>
                      <RegisterUser />
                    </AuthLayout>
                  } />

                  <Route path='/direccion_del_pedido' element={
                    <AppLayout>
                      <OrderAdress />
                    </AppLayout>
                  } />

                  <Route path='/perfil' element={
                    <PerfilUserLayout>
                      <PerfilUser />
                    </PerfilUserLayout>
                  }>
                    <Route index element={<MyPerfilDetails />} />

                    <Route path='pedidos' element={<MyOrders />} />
                  </Route>
                </Routes>
              </Router>
            </FiltersProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App
