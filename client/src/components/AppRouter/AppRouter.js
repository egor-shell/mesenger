import { authRoutes, publicRoutes } from '../Routers/Routers'
import { selectValue } from '../../features/isAuth/isAuthSlice'
import { React } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

export const AppRouter = () => {
    const isAuth = useSelector(selectValue)

    let location = useLocation()
    if(location.pathname === '/') {
        return <Redirect to='/login' />
    }
    
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