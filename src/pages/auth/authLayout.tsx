import { Outlet } from "react-router";

export const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <Outlet />
        </div>
    );
}