import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from 'utils/urlpath';
import { logout } from '../../features/isAuth/isAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectName, selectSurname } from '../../features/user/userSlice';

export function Header() {
    const dispatch = useDispatch()
    const name = useSelector(selectName)
    const surname = useSelector(selectSurname)
    const fullName = name + ' ' + surname
    return (
        <div className='d-flex justify-content-between m-3'>
            <h2>{fullName}</h2>
            <NavLink to={LOGIN_ROUTE}>
                <Button
                    onClick={() => dispatch(logout())}
                >
                    Выход
                </Button>
            </NavLink>
        </div>
    )
}

