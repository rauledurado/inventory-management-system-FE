import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Offices = Loadable(lazy(() => import("./Offices")));


const officesRoutes = [
    {
        path: '/office/list',
        element: <Offices />,
    },
]

export default officesRoutes;