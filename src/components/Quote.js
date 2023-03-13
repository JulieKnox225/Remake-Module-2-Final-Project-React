import React from "react";
import { nanoid } from "nanoid";
import End from "./End"
import "../index.css";

const ACTIONS = {
    SET_QUOTE_ELEMENTS_CORRECT: 'set-quote-elements-correct',
    SET_QUOTE_ELEMENTS_INCORRECT: 'set-quote-elements-incorrect',
    SET_QUOTE_ELEMENTS_BLANK: 'set-quote-elements-blank',
    SET_QUOTE_ARR: 'set-quote-arr',
    SET_QUOTE_JSONRES: 'set-quote-json-res'
}

function reducer(quotes, action) {
    switch(action.type) {
        case ACTIONS.SET_QUOTE_ELEMENTS_CORRECT:
                return {
                    ...quotes,
                    quoteElements: quotes.quoteArr.map((letter, index) => {
                        if(index === action.payload.i) {
                            return <span key={nanoid()} className={`quote--correct`}>{letter}</span>;
                        } else if(quotes.quoteElements[index].props.className === `quote--incorrect`){
                            return <span key={nanoid()}  className={'quote--incorrect'}>{letter}</span>
                        } else {
                            return <span key={nanoid()} className={'quote'}>{letter}</span>
                        }
                    })    
                }
                
        case ACTIONS.SET_QUOTE_ELEMENTS_INCORRECT:
                return {
                    ...quotes,
                    quoteElements: quotes.quoteArr.map((letter, index) => {
                    if(index === action.payload.i) {
                        return <span key={nanoid()} className={`quote--incorrect`}>{letter}</span>;
                    } else if(quotes.quoteElements[index].props.className === `quote--incorrect`){
                        return <span key={nanoid()}  className={'quote--incorrect'}>{letter}</span>
                    } else {
                        return <span key={nanoid()} className={'quote'}>{letter}</span>
                    }
                })
            }

        case ACTIONS.SET_QUOTE_ELEMENTS_BLANK:
                return {
                    ...quotes,
                    quoteElements: quotes.quoteArr.map(letter => {
                        return <span key={nanoid()} className={'quote'}>{letter}</span>
                    })
                }
                
        case ACTIONS.SET_QUOTE_ARR:
            return {
                ...quotes,
                quoteArr: action.payload.quote
            }
            
        case ACTIONS.SET_QUOTE_JSONRES:
            return {
                ...quotes,
                jsonRes: action.payload.res
            }

        default:
            return "error";
    }
}
    
export default function Quote({ finished, setFinished, setStart, data, handleClick }) {
    /* REDUCERS */
    const [quotes, dispatch] = React.useReducer(reducer, { 
        quoteArr: [], 
        quoteElements: []
    });

    /* REFERENCES */
    let timeElapsedRef = React.useRef(0);
    
    /* STATES */
    const [input, setInput] = React.useState("");
    const [counter, setCounter] = React.useState(0);
    const [charTyped, setCharTyped] = React.useState(0);
    const [timer, setTimer] = React.useState(60);
    const [wpm, setWpm] = React.useState(0);

    /* USE EFFECTS */

    React.useEffect(() => {
        dispatch({type: ACTIONS.SET_QUOTE_ARR, payload: {quote: data[0].q.split('')}});
        dispatch({type: ACTIONS.SET_QUOTE_ELEMENTS_BLANK})

        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
            timeElapsedRef.current += 1;
        }, 1000);
        
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    
    React.useEffect(() => {
        if (timer === 0) {
            setFinished(true);
        }
    }, [timer]);

    React.useEffect(() => {
        for(let i = 0; i < input.length; i++) {
            if(input[i] === quotes.quoteElements[i].props.children) {
                dispatch({type: ACTIONS.SET_QUOTE_ELEMENTS_CORRECT, payload: {i: i}});
            } else {
                dispatch({type: ACTIONS.SET_QUOTE_ELEMENTS_INCORRECT, payload: {i: i}});
            }
        }
        if(input.length === quotes.quoteElements.length) {
            setCounter(prev => prev + 1);
        }
    }, [input]);
    
    React.useEffect(() => {
        setInput("");
        dispatch({type: ACTIONS.SET_QUOTE_ARR, payload: {quote: data[counter].q.split('')}})
        dispatch({type: ACTIONS.SET_QUOTE_ELEMENTS_BLANK});
    }, [counter]);

    React.useEffect(() => {
        setWpm(Math.round((((charTyped / 5) / timeElapsedRef.current) * 60)));
    }, [finished])

    return (
        <div>
            {!finished &&
                <>
                <div className="quote--padding">
                    {quotes.quoteElements}
                </div>
                <div className="quote--padding">
                    <input 
                        autoFocus
                        type='text' 
                        onChange={(e) => {
                            setCharTyped(prev => prev + 1)
                            setInput(e.target.value)
                        }}
                        value={input}
                    ></input>
                </div>
                <div className="quote--info-bar">
                    <h2 id="quote--source">Source: {data[counter].a}</h2>
                    <h2>Timer: {timer}s</h2>

                </div>
                <footer>Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a></footer>
                </>
            }
            {finished && 
                <End 
                    wpm = {wpm}
                    completedQuotes={counter}
                    handleClick={handleClick}
                />
            }
        </div>
    );
}