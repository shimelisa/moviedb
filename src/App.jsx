import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './Components/Header/Header'
import Banner from './Components/Banner/Banner'
// import SlideShow from './Components/SlideShow/SlideShow'
import DisplayRow from './Components/DisplayRow/DisplayRow'
import Footer from './Components/Footer/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Banner />
      <DisplayRow />
      <Footer />
    </>
  )
}

export default App
