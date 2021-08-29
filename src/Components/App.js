import React, { useEffect, useState } from 'react'
import AppRouter from 'Components/Router'
import { authService } from 'fBase';


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsloggedIn(true)
        setUserObj(user)
      } else {
        setIsloggedIn(false)
      }
      setInit(true)
    })
  }, [])
  

  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."  }
      <footer>&copy; {new Date().getFullYear()} </footer>
    </>
  )
}

export default App;
