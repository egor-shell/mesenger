import { authRoutes, publicRoutes } from '../Routers/Routers'
import { selectValue } from '../../features/isAuth/isAuthSlice'
import { React } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

export const AppRouter = () => {
    const isAuth = useSelector(selectValue)
    return (
        <Switch>
            {isAuth ?
                authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )
            :
                publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )
            }
        </Switch>
    )
}