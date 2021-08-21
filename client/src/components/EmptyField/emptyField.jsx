import React from 'react'
import { Container } from 'react-bootstrap'
import './emptyField.css'

export function EmptyField() {
    return (
        <Container>
            <div className='beginDialoge'>
                <div className='beginText'>
                    Выберите с кем начать диалог
                </div>
            </div>
        </Container>
    )
}