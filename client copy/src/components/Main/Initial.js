import './Main.css'
import React, { useState } from "react";
import axios from 'axios'
import {
    Link
} from "react-router-dom";
function Main() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const handleChange = () => {
        if(!name || !room) {
            return alert('Данные неверны')
        }
        axios.post('http://localhost:5000/rooms').then(res => {
            console.log(res)
        })
        console.log(name, room)
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleChange()
        }
    }

  return (
    <div className='outContainer d-flex align-items-center bg-dark'>
        <div className='container d-flex flex-column align-items-center'>
            <h1 className='header text-light'>Join</h1>
            <div>
                <input placeholder='Name' className='form-control' type='text' onChange={(event) => setName(event.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
                <input placeholder='Room' className='form-control mt-3' type='text' onChange={(event) => setRoom(event.target.value)} onKeyPress={handleKeyPress} />
            </div>
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button className='btn btn-outline-light btn-lg mt-3' onClick={handleChange}>Sign In</button>
            </Link>
        </div>
    </div>
  );
}

export default Main;