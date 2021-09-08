import React, { useEffect, useState } from 'react'
import AppRouter from 'Components/Router'
import { authService } from 'fBase';


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if (user.displayName === null) {
        user.updateProfile({
          displayName: "Nwitter",
          });
      } 
      if (user) {
        setIsloggedIn(true)
        setUserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        })
      } else {
        setIsloggedIn(false)
      }
      setInit(true)
    })
  }, [])
  
  const refreshUser = () => {
    setUserObj(authService.currentUser)
  }

  return (
    <>
      { init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."  }
      <footer>&copy; {new Date().getFullYear()} </footer>
    </>
  )
}

export default App;
