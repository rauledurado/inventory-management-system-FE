import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
 const QrcodeMain = Loadable(lazy(() => import("./QrCodeMain")));
 const QrcodeList = Loadable(lazy(() => import("./QrCodeList")));
    const qrcodeRoutes = [
        {
            path: '/qrCode/main',
            element: <QrcodeMain />,
        },
        {
            path: '/qrCode/list',
            element: <QrcodeList/>,
        }
    ]

export default qrcodeRoutes;