import React from 'react'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [fromDta, setFormData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = FormData

    const navigate = useNavigate()

    const onChange = () => {}

    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome Back!</p>
                </header>

                <form>
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

                    <div className="signInBar">
                        <p className="signInText">
                            Sign In
                        </p>
                        <button className="signInButton">
                            <ArrowRightIcon
                                fill='#ffffff'
                                width='34px'
                                height='34px'
                            />
                        </button>
                    </div>
                </form>

                <Link to='/sign-up' className='registerLink'>
                    Sign up Instead
                </Link>
            </div>
        </>
  )
}

export default SignIn