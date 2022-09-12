import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const PurchasedItems = Loadable(lazy(() => import("./PurchasedItems")));
const PurchaseItemDetail = Loadable(lazy(() => import("./PurchaseItemDetail")));
const purchaseditemsRoute = [
    {
        path: 'items/PurchasedItems/:page',
        element: <PurchasedItems/>,
    },
    {
        path: 'items/PurchasedItemsDetail',
        element: <PurchaseItemDetail />,
    },
]
export default purchaseditemsRoute;