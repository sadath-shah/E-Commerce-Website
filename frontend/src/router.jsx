import { createBrowserRouter } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";
import Orders from "./Orders";
import Login from "./Login";
import Products from "./Products";
import Register from "./Register";
import EditUser from "./EditUser";
import EditProduct from "./EditProduct";
import RootLayout from "./RootLayout";
import Order from "./Order";
import AdminLayout from "./AdminLayout";
import Users from "./Users";
import AuthGuard from "./AuthGuard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "cart",
                element: <AuthGuard><Cart /></AuthGuard>
            },
            {
                path: "order",
                element: <AuthGuard><Order /></AuthGuard>
            },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            {
                path: "admin",
                element: <AuthGuard role="admin"><AdminLayout /></AuthGuard>,
                children: [
                    { index: true, element: <Users /> },
                    { path: "editUser/:userId", element: <EditUser /> },
                    { path: "products", element: <Products /> },
                    { path: "products/editProduct/:productId", element: <EditProduct /> },
                    { path: "orders", element: <Orders /> },
                ],
            },
        ],
    },
]);