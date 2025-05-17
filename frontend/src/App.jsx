import Navbar  from './navbar/navbar'
import Login from './login/login'
import React from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <Login />
      <Navbar />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
        </a>
      </div>
    </>
  )
}

export default App
