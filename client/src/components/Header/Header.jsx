import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from 'utils/urlpath';
import { logout } from '../../features/isAuth/isAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectName, selectSurname, selectId } from '../../features/user/userSlice';
import PropTypes from 'prop-types';

export function Header({ sending, exit}) {
    const dispatch = useDispatch()
    const userId = useSelector(selectId)
    const name = useSelector(selectName)
    const surname = useSelector(selectSurname)
    const fullName = name + ' ' + surname
    // eslint-disable-next-line no-unused-vars

    const handleExitUser = (id) => {
        exit(id)
    }

    const handleSend = (id) => {
        sending(id)
    }
    return (
        <div className='d-flex justify-content-between m-3'>
            <h2>{fullName}</h2>
            <Button
                onClick={() => {
                        console.log(userId)
                        handleSend(userId)
                    }
                }
                
            >
                Отправить
            </Button>
            <NavLink to={LOGIN_ROUTE}>
                <Button
                    onClick={() => {
                            dispatch(logout())
                            console.log(userId)
                            handleExitUser(userId)
                        }
                    }
                >
                    Выход
                </Button>
            </NavLink>
        </div>
    )
}

Header.propTypes = {
    exit: PropTypes.func,
    sending: PropTypes.func
}

