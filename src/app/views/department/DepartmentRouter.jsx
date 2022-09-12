import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Department = Loadable(lazy(() => import("./Department")));


const DepartmentRouter = [
    {
        path: '/department/list',
        element: <Department />,
    },
]

export default DepartmentRouter;