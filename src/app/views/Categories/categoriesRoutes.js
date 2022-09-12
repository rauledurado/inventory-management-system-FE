import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const CategoriesList = Loadable(lazy(() => import("./CategoriesList")));
const CategoriesDetail = Loadable(lazy(() => import("./CategoriesDetail")));


const categoriesRoutes = [
    {
        path: '/categories/list',
        element: <CategoriesList/>,
    },
    {
        path: '/categories/details',
        element: <CategoriesDetail/>,
    },
]

export default categoriesRoutes;
