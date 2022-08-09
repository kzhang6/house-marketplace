import React from 'react'
import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

function Profile() {
    const[user, setUser] = useState(null)

    const auth = getAuth()
    useEffect(() => {
        setUser(auth.currentUser)
    }, [])

  return user ? <h1>{user.displayName}</h1> : 'Not Logged In'
}

//Firebase stores authentication in Application => IndexedDB => firebaseLocalStorage

export default Profile