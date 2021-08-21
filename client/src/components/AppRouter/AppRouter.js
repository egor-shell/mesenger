import { authRoutes, publicRoutes } from '../Routers/Routers'
import { selectValue, auth, logout } from '../../features/isAuth/isAuthSlice'
import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { setDbUsername, setDbName, setDbSurname, setDbId } from '../../features/user/userSlice'
import { check } from 'http/userApi';

export const AppRouter = () => {
    const isAuth = useSelector(selectValue)
    const dispatch = useDispatch()
 
    const checkedAuth = async () => {
        let data = await check()
        if(data) {
            dispatch(setDbId(data.id))
            dispatch(setDbUsername(data.username))
            dispatch(setDbName(data.name))
            dispatch(setDbSurname(data.surname))
            dispatch(auth())
        } else {
            dispatch(logout())
        }

    }

    useEffect(() => {
        checkedAuth()
    }, [])
    
    return isAuth ? (
        <Switch>
            {
                authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )
            }
            <Redirect to='/im' />
        </Switch>
    )
    :
    (
        <Switch>
            {
                publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )
            }
            <Redirect to='/login' />
        </Switch>
    )
}