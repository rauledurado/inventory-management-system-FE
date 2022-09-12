import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import categoriesRoutes from 'app/views/Categories/categoriesRoutes'
import productsRoutes from 'app/views/Products/ProductsRoutes'
import productTypeRoute from 'app/views/product-type/PrductTypeRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import qrcodeRoutes from 'app/views/QRcode/qrCodeRoutes'
import mapRuotes from 'app/views/map/mapRoutes'
import { Navigate } from 'react-router-dom'
import MapRuotes from 'app/views/map/mapRoutes'
import UsersListRoute from 'app/views/users/UsersRoute'
import usersRoute from 'app/views/users/UsersRoute'
import brandsRoute from 'app/views/brands/BrandsRoute'
import officesRoutes from 'app/views/offices/OfficeRoutes'
import purchaseditemsRoute from 'app/views/items/purchaseditemsRoute'
import DepartmentRouter from 'app/views/department/DepartmentRouter'
import AppUsersRoutes from 'app/views/AppUsers/AppUsersRoutes'
import wingsRoutes from 'app/views/wings/WingsRoutes'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [
                ...dashboardRoutes,
                ...chartsRoute,
                ...qrcodeRoutes,
                ...MapRuotes,
                ...materialRoutes,
                ...productsRoutes,
                ...categoriesRoutes,
                ...productTypeRoute,
                ...usersRoute,
                ...brandsRoute,
                ...officesRoutes,
                ...DepartmentRouter,
                ...purchaseditemsRoute,
                ...AppUsersRoutes,
                ...wingsRoutes,
            ],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard/default" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
