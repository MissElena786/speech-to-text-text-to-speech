import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SpeechToText from './components/SpeechToText'
import TextToSpeech from './components/TextToSpeech'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
function App() {
  const [count, setCount] = useState(0)

  const handleRefresh = () => {
    window.location.reload(); // This refreshes the entire page
  };

  return (
    <div className=' relative'>
      <div className='fixed top-4 right-4.5 z-10 ' onClick={handleRefresh} >
        <Header />
      </div>
      <Toaster />
      <SpeechToText />
      <TextToSpeech />
    </div>
  )
}

export default App
