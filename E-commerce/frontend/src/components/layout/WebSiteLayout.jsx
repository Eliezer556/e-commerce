import { Footer } from "../common/Footer/Footer";
import { Header } from "../common/Header/Header";
import { NavBar } from "../common/NavBar/NavBar";

export function WebSiteLayout({ children }) {
    return (
        <div className="website-layout">
            <NavBar />
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}