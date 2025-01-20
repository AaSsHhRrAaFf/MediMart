import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import ShopPage from "../Pages/Shop";
import CategoryDetails from "../Pages/CategoryDetails";
import Cart from "../Pages/Cart";
import CheckoutPage from "../Pages/CheckoutPage";
import UserDashboard from "../Pages/Dashboard/UserDashboard";
import PrivateRoute from "./PrivateRoute";
import SellerDashboard from "../Pages/Dashboard/SellerDashboard";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                path:'/',
                element:<Home/>,
            },
            {
                path:'/login',
                element:<Login/>,
            },
            {
                path:'signUp',
                element:<SignUp/>,
            },
            {
                path:'shop',
                element:<ShopPage/>,
            },
            {
                path: "/category/:categoryName",
                element:  <PrivateRoute> <CategoryDetails /> </PrivateRoute>,
             },
            {
                path:'cart',
                element:<Cart/>,
            },
            {
                path: 'cart/CheckoutPage',
                element: <CheckoutPage />,
            },
            {
                path: '/dashboard/user',
                element: (
                    <PrivateRoute role="user">
                        <UserDashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: '/dashboard/seller',
                element: (
                    <PrivateRoute role="seller">
                        <SellerDashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: '/dashboard/admin',
                element: (
                    <PrivateRoute role="admin">
                        <AdminDashboard />
                    </PrivateRoute>
                ),
            }
        ]
    }
])
export default router;