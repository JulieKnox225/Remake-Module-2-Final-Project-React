import React from 'react'

export default function End({ handleClick, wpm, completedQuotes }) {
    return (
        <div className='end'>
            <h2>{wpm === 0 ? 'Hello, any one there?' : `You completed with a raw words per minute of: ${wpm}!`}</h2>
            <h2>You completed {completedQuotes - 2} quotes{completedQuotes - 2 === 0 ? '...' : '!'}</h2>
            <button onClick={handleClick}>Restart?</button>
        </div>
    )
}