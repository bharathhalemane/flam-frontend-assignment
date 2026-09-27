import { useState } from 'react'

import './App.css'

function App() {
  const [status, setStatus] = useState("not checked")

  const checkHealth = async() => {
    try{
      const res = await fetch("http://localhost:5000/api/health")
      const data = await res.json()
      setStatus(data.status)
    } catch (err) {
      setStatus("error: " + err.message)
    }
  }
  
  return(
    <div>
      <button onClick={checkHealth}>Check Health</button>
      <p>Status: {status}</p>
    </div>
  )
}

export default App
