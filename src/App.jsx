import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './services/supabaseClient'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Expense Tracker</h1>
      </div>
    </>
  )
}

export default App
