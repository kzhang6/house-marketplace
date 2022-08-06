import React from 'react'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const {name, email, password} = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        /* update form data state when user enters data in the form */
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value   //e.target.id = email or password id
        }))
    }
    
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth();
            /* register user */
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            /* get user */
            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name
            })

            /* register user with the firestore Database user collection */
            // making a copy to not change the formData (name, email, password) and deleting the password so it doesn't get put into the database 
            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            // update the database and add user to the users collection
            await setDoc(doc(db, 'users', user.uid), formDataCopy)

        navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome Back!</p>
                </header>

                <form onSubmit={onSubmit}>
                    <input
                        type='name'
                        className='nameInput'
                        placeholder="Name"
                        id='name'
                        value={name}
                        onChange={onChange}
                    />
                    
                    <input
                        type='email'
                        className='emailInput'
                        placeholder="Email"
                        id='email'
                        value={email}
                        onChange={onChange}
                    />

                    <div className="passwordInputDiv">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='passwordInput'
                            placeholder='Password'
                            id="password"
                            value={password}
                            onChange={onChange}
                        />

                        <img
                            src={visibilityIcon}
                            alt='showPassword'
                            className='showPassword'
                            /* set the opposite of prevState of showPassword */
                            onClick={() => setShowPassword((prevState) => !prevState)}
                            />
                    </div>

                    <Link
                        to='/forgot-password'
                        className='forgotPasswordLink'>
                        Forgot Password
                    </Link>

                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon
                                fill='#ffffff'
                                width='34px'
                                height='34px'
                            />
                        </button>
                    </div>
                </form>

                <Link to='/sign-in' className='registerLink'>
                    Sign In Instead
                </Link>
            </div>
        </>
  )
}

export default SignUp