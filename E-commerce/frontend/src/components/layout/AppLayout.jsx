import { NavBar } from '../common/NavBar/NavBar';
import { Footer } from '../common/Footer/Footer';

export function AppLayout({ children }) {
    return (
        <div className="app-layout">
            <NavBar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}