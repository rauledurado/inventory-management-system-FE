import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const WingsList = Loadable(lazy(() => import('./WingsList')))

const wingsRoutes = [
    {
        path: '/wings/list',
        element: <WingsList />,
    },
]

export default wingsRoutes
