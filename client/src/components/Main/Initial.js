import './Main.css'
import React, { useState } from "react";
import {
    Link
} from "react-router-dom";
function Main() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

  return (
    <div className='outContainer d-flex align-items-center bg-dark'>
        <div className='container d-flex flex-column align-items-center'>
            <h1 className='header text-light'>Join</h1>
            <div>
                <input placeholder='Name' className='form-control' type='text' onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
                <input placeholder='Room' className='form-control mt-3' type='text' onChange={(event) => setRoom(event.target.value)} />
            </div>
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button className='btn btn-outline-light btn-lg mt-3'>Sign In</button>
            </Link>
        </div>
    </div>
  );
}

export default Main;