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
    const token = localStorage.getItem('token')
    const {data} = await $host.get('/api/v1/auth/auth', { headers: { Authorization: "Bearer " + token }})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const checkChats = async (userId) => {
    const {data} = await $host.post('/api/v1/auth/chats', {userId})
    return data.chats
}