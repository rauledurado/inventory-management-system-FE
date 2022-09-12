
    import React, { lazy } from 'react'
    import Loadable from 'app/components/Loadable/Loadable';
     const MapMain = Loadable(lazy(() => import("./MapMain")));
        const mapRuotes = [
            {
                path: '/mapMain/main',
                element: <MapMain />,
            }
        ]

export default mapRuotes;

