import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen">
                
                <div className="py-10 lg:py-2 mx-auto w-[450px]">
                    <Logo />
                
                    <div className="mt-10">
                        <Outlet />
                    </div>
                    
                </div>
            </div>

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
