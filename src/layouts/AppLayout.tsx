import { Link, Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function AppLayout() {
    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className=" max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
                    <div className="w-64">
                        <Link to="/" className="text-white font-bold text-2xl">
                            <Logo />
                        </Link>

                    </div>

                    <NavMenu />

                </div>
            </header>

            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>

            <footer className="py-5 bg-gray-800 text-white text-center">
                <p className="text-sm text-center">
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>

    )
}
