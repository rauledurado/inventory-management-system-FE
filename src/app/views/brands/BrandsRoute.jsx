import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Brands = Loadable(lazy(() => import("./Brands")));


const brandsRoute = [
    {
        path: '/brand/list',
        element: <Brands />,
    },
]

export default brandsRoute;