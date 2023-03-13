import React from 'react'

export default function Start({ handleClick }) {
    return (
        <div className='start'>
            <h1>Ready to start?</h1>
            <button onClick={handleClick}>Yes!</button>
        </div>

    )
}