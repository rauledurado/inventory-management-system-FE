import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const UsersList = Loadable(lazy(() => import("./UsersList")));
const UserDetail = Loadable(lazy(() => import("./UserDetail")));


const usersRoute = [
    {
        path: '/user/UsersList',
        element: <UsersList/>,
    },
    {
        path: '/user/details',
        element: <UserDetail />,
    },
]

export default usersRoute;