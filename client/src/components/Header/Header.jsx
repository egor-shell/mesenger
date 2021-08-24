import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from 'utils/urlpath';
import { logout } from '../../features/isAuth/isAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectName, selectSurname, selectId } from '../../features/user/userSlice';
import PropTypes from 'prop-types';
import { selectUsersId } from 'features/usersId/usersId'

export function Header({ sending, exit }) {
    const dispatch = useDispatch()
    const userId = useSelector(selectId)
    const destinationId = useSelector(selectUsersId)
    const name = useSelector(selectName)
    const surname = useSelector(selectSurname)
    const fullName = name + ' ' + surname
    // eslint-disable-next-line no-unused-vars

    const handleExitUser = (id) => {
        exit(id)
    }

    const handleSend = (sendingId, destId) => {
        sending(sendingId, destId)
    }
    return (
        <div className='d-flex justify-content-between m-3'>
            <h2>{fullName}</h2>
            <Button
                onClick={() => {
                        handleSend(userId, destinationId)
                    }
                }
                
            >
                Отправить
            </Button>
            <NavLink to={LOGIN_ROUTE}>
                <Button
                    onClick={() => {
                            dispatch(logout())
                            localStorage.setItem('token', '')
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

