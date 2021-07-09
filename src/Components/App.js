import React, { useEffect, useState } from 'react'
import AppRouter from 'Components/Router'
import { authService } from 'fBase';


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false)
  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsloggedIn(true)
      } else {
        setIsloggedIn(false)
      }
      setInit(true)
    })
  }, [])
  

  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."  }
      <footer>&copy; {new Date().getFullYear()} </footer>
    </>
  )
}

export default App;
