import React from 'react'
import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { useNavigate, Link} from 'react-router-dom'
import {toast} from 'react-toastify'

function Profile() {
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)

    const[formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const{name, email} = formData

    const navigate = useNavigate()

    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }

    /* update in Firebase when submitting changes */
    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                //Update display name in Firebase (returns a promise)
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                //update in firestore
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name,   //name: name
                })
            }
        } catch (error) {
            toast.error('Could not update profile details')
        }
    }

    const onChange = (e) => {
        //update form state with the value of each input id
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]:e.target.value,
        }))
    }

    return <div className='profile'>
    <header className='profileHeader'>
        <p className='pageHeader'>My profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
            Logout
        </button>
    </header>

        <main>
            <div className='profileDetailsHeader'>
                <p className='profileDetailsText'>PersonalDetails</p>
                <p
                    className='changePersonalDetails'
                    /* change done button depending on the current state */
                    onClick={() => {
                        changeDetails && onSubmit() //if changeDetials is true, go to onSubmit
                        setChangeDetails((prevState) => !prevState) //flip change details to the opposite state
                }}>
                    {changeDetails ? 'done' : 'change'}
                </p>
            </div>

            {/* display profile detials */}
            <div className='profileCard'>
                <form>
                    <input
                        type='text'
                        id='name'
                        className={!changeDetails ? 'profileName' : 'profileNameActive'} //active goes into a form and allow users to update, not active just shows the profile details.
                        disabled={!changeDetails}
                        value={name}
                        onChange={onChange}
                    />
                    <input
                        type='text'
                        id='email'
                        className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                        disabled={!changeDetails}
                        value={email}
                        onChange={onChange}
                    />
                </form>
            </div>
        </main>
    </div>
}

//Firebase stores authentication in Application => IndexedDB => firebaseLocalStorage

export default Profile