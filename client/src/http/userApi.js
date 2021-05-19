const { $host  } = require("../http/index")
import jwt_decode from 'jwt-decode'


export const registration = async (username, password, email, name, surname) => {
    const {data} = await $host.post('/api/v1/auth/registration', {username, password, email, name, surname})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const login = async (username, password) => {
    const {data}= await $host.post('/api/v1/auth/login', {username, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const check = async () => {
    const {data} = await $host.post('/api/v1/auth/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}