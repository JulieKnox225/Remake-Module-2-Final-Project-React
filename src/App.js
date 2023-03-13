import React, { useState, useEffect } from 'react'
import Quote from "./components/Quote"
import Start from "./components/Start"


function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = React.useState([]);
  const [start, setStart] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState('Loading...');
  const [counter, setCounter] = useState(0)

  // useEffect(() => {
  //   fetch("https://zenquotes.io/api/quotes/")
  //   .then(res => res.json())
  //   .then(thisData => {
  //     console.log(thisData)
  //       setData(thisData)
  //       setStart(true)
  //       setLoading(false)
  //   })
  // }, [])

  useEffect(() => {
    fetch("https://zenquotes.io/api/quotes/")
    .then(res => res.json())
    .then(thisData => {
      console.log(thisData)
        setData(thisData)
        setStart(true)
        setLoading(false)
    })
    .catch(() => setError('Uh Oh! Looks like we need to let the code rest for a bit. Please try again in one minute!'))
  }, [counter])

  return (
    <>
      {loading && 
        <h2 className='loading'>{error}</h2>
      }
      {start && !loading &&
        <Start 
          handleClick={() => {
              setStart(false);
          }}
        />
      }
      {!start && !loading &&
        <div className="App">
          {!finished && <h1>Quote:</h1>}
          <Quote 
            finished={finished}
            setFinished={(bool) => setFinished(bool)}
            setStart={(bool) => setStart(bool)}
            data={data}
            handleClick={() => {
              setFinished(false);
              setLoading(true);
              setCounter(prev => prev + 1)
            }}
          />
        </div>
      }
      
    </>
  );
}

export default App;
