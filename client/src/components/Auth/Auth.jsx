import './Main.css'
import React, { useState } from "react";
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, MESSENGER_ROUTE, REGISTRATION_ROUTE } from 'utils/urlpath';
import { login, registration } from 'http/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectValue, auth, logout } from '../../features/isAuth/isAuthSlice';
import { setDbUsername, setDbName, setDbSurname, reset, setDbId } from '../../features/user/userSlice'

const Auth = () => {
    const location = useLocation()
    // eslint-disable-next-line no-unused-vars
    const isAuth = useSelector(selectValue)
    const history = useHistory()
    const dispatch = useDispatch()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const click = async () => {
        try {
            let data
            if(isLogin) {
                data = await login(username, password)
                // dispatch(setDbUsername(data.username))
                // dispatch(setDbName(data.name))
                // dispatch(setDbSurname(data.surname))
            } else {
                // eslint-disable-next-line no-unused-vars
                data = await registration(username, password, email, name, surname)
                
            }
            dispatch(setDbId(data.id))
            dispatch(setDbUsername(data.username))
            dispatch(setDbName(data.name))
            dispatch(setDbSurname(data.surname))
            dispatch(auth())
            history.push(MESSENGER_ROUTE)
        } catch (e) {
            dispatch(logout())
        }

    }

    if(isAuth === false) {
        dispatch(reset())
    }
    
    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {isLogin ?
                    <Form className='d-flex flex-column'>
                        <Form.Control 
                            className='mt-3'
                            placeholder='Введите логин...'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control 
                            className='mt-3'
                            placeholder='Введите пароль...'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                            <div className='align-self-center'>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь!</NavLink>
                            </div>
                            <Button 
                                variant={'outline-success'}
                                onClick={click}
                            >
                                Войти
                            </Button>
                        </Row>
                    </Form>
                :
                    <Form className='d-flex flex-column'>
                        <Form.Control 
                            className='mt-3'
                            placeholder='Введите логин...'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control 
                            className='mt-3'
                            placeholder='Введите пароль...'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Form.Control 
                            className='mt-3'
                            placeholder='Введите E-mail...'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control 
                            className='mt-3'
                            placeholder='Введите имя...'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Form.Control 
                            className='mt-3'
                            placeholder='Введите фамилию...'
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                        />
                        <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                            <div className='align-self-center'>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                            <Button 
                                variant={'outline-success'}
                                onClick={click}
                            >
                                Зарегестрироваться
                            </Button>
                        </Row>
                    </Form>
                }
                
            </Card>
        </Container>
    )
}
export default Auth