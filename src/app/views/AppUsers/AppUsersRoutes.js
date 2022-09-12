import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppUsersList = Loadable(lazy(() => import("./AppUsersList")));
const AppUserDetails = Loadable(lazy(() => import("./AppUserDetail")));
const AppUserRegister = Loadable(lazy(() => import("./JwtRegister")));


const AppUsersRoutes = [
    {
        path: '/appUsers/list',
        element: <AppUsersList />,
    },
    {
        path: '/appUser/details',
        element: <AppUserDetails />,
    },
    {
        path: '/appUser/register',
        element: <AppUserRegister />,
    },
]

export default AppUsersRoutes;
