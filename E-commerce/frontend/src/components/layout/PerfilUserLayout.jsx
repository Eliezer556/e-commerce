import { Footer } from "../common/Footer/Footer";

export function PerfilUserLayout({ children }) {
    return (
        <div className='auth-layout'>
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}