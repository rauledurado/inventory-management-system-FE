import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const ProductList = Loadable(lazy(() => import("./ProductsList")));
const ProductDetail = Loadable(lazy(() => import("./ProductDetail")));
const AddProduct = Loadable(lazy(() => import("./AddProduct")));
const AddProductMain = Loadable(lazy(() => import("./AddProductMain")));
const ProductDetailMain = Loadable(lazy(() => import("./ProductDetailMain")));
const SearchProduct = Loadable(lazy(() => import("./SearchProduct")));
const WebcamSample = Loadable(lazy(() => import("./WebcamSample")));


const productsRoutes = [
    {
        path: '/products/list',
        element: <ProductList />,
    },
    {
        path: '/products/details',
        element: <ProductDetail />,
    },
    {
        path: '/products/add',
        element: <AddProduct />,
    },
    {
        path: '/products/add/main',
        element: <AddProductMain />,
    },
    {
        path: '/products/details/main',
        element: <ProductDetailMain />,
    },
    {
        path: '/products/search',
        element: <SearchProduct />,
    },
]

export default productsRoutes
