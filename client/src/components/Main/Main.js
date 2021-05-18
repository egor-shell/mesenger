import './Main.css'
import React, { useState, useRef } from "react";
import { useLocalStorage } from "react-use";
import { Form, Button } from 'react-bootstrap'
// import axios from 'axios'
import {
    Link
} from "react-router-dom";
export function Main() {
    const [name, setName] = useLocalStorage('name', 'John')
    const [roomId, setRoomId] = useState('free')
    const linkRef = useRef(null)
    // const [room, setRoom] = useState('')

    // const handleChange = () => {
    //     if(!name || !room) {
    //         return alert('Данные неверны')
    //     }
    //     axios.post('http://localhost:5000/rooms').then(res => {
    //         console.log(res)
    //     })
    //     console.log(name, room)
    // }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name || !roomId) {
            return alert('Данные неверны')
        }

        linkRef.current.click()
    }

    const trimmed = name.trim()

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleSubmit()
        }
    }

  return (
    <div className='outContainer d-flex align-items-center bg-dark'>
        <div className='container d-flex flex-column align-items-center'>
            <h1 className='header text-light'>Join</h1>
            <Form
                className='mt-5'
                onSubmit={handleSubmit}
            >
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control value={name} onChange={(event) => setName(event.target.value)} onKeyPress={handleKeyPress}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Room:</Form.Label>
                    <Form.Control as='select' value={roomId} onChange={(event) => setRoomId(event.target.value)} onKeyPress={handleKeyPress}>
                        <option value='free'>Free</option>
                        <option value='job' disabled>Job</option>
                    </Form.Control>
                </Form.Group>
                {trimmed && (
                    <Button as={Link} to={`/${roomId}`} ref={linkRef}>
                        Chat
                    </Button>
                )}
            </Form>
            {/* <div>
                <input placeholder='Name' className='form-control' type='text' onChange={(event) => setName(event.target.value)} onKeyPress={handleKeyPress}/>
            </div>
            <div>
                <input placeholder='Room' className='form-control mt-3' type='text' onChange={(event) => setRoom(event.target.value)} onKeyPress={handleKeyPress} />
            </div> */}
            {/* <Link onClick={event => (!name || !roomId) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}> */}
                {/* <button className='btn btn-outline-light btn-lg mt-3' onClick={handleSubmit}>Sign In</button> */}
            {/* </Link> */}
            
        </div>
    </div>
  );
}