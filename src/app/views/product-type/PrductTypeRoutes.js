import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const ProductTypeList = Loadable(lazy(() => import("./ProductTypeList")));


const productTypeRoute = [
    {
        path: '/productTypeList/list',
        element: <ProductTypeList/>,
    },
]

export default productTypeRoute;
