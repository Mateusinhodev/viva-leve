import { useState } from 'react'

// import ImcCalc from './components/ImcCalc'
// import ImcTable from './components/ImcTable'

import './App.css'
import Header from "./components/Header.jsx"
import Home from "./pages/Home/index.jsx"
import Main from "./pages/Main/index.jsx"
import Artigo from "./pages/Artigos/index.jsx"

function App() {

  return (
    <>
      <div id='container'>
        <Header/>
        <Home/>
        <Main/>
        <Artigo/>
      </div>
    </>
  )
}

export default App
