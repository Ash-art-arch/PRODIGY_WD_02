import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [hour,setHour] = useState(0)
  const [minute,setMinute] = useState(0)
  const [second,setSecond] = useState(0)
  const [isRunning,setIsRunning] = useState(false)
  const [array,setArray] = useState([])
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecond(second => {
          if (second >= 59) {
            setSecond(0);
            setMinute(minute => {
              if (minute >= 59) {
                setMinute(0);
                setHour(hour => {
                  if (hour >= 23) {
                    // If the hour reaches 24, reset the timer
                    setIsRunning(false);
                    setHour(0);
                    setMinute(0);
                    setSecond(0);
                    setArray([]);
                    return 0;
                  }
                  return hour + 1;
                });
              } else {
                return minute + 1;
              }
            });
          } else {
            return second + 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  const setTimer=()=>{
    setIsRunning(true)
  }
  const setReset=()=>{
    setIsRunning(false)
    setSecond(0)
    setMinute(0)
    setHour(0)
    setArray([])
  }
  const setPause=()=>{

    setArray([...array,{hour,minute,second}])
  }
  return (
    <>
      <div className='main'>
        <div>
        <div className='watch'><h1>{hour<10?`0${hour}`:hour}:{minute<10?`0${minute}`:minute}:{second<10?`0${second}`:second}</h1></div>
        <div className='part'>

        <button onClick={setTimer}>Start</button>
        <button onClick={setPause}>Pause</button>
        <button onClick={setReset}>Reset</button>
        </div>
        </div>
        
        <div className='laps'>
          {isRunning && array.map((item,index)=>(
            <div key={index} className='lap'><div>Lap {index+1}</div>{item.hour}:{item.minute}:{item.second}</div>
          )      )}</div>
      </div>
    </>
  )
}

export default App
