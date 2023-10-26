import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Cookies from "universal-cookie"

const cookies = new Cookies()

const Password: React.FC = () => {
  let navigate = useNavigate()

  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordErrorRepeat, setPasswordErrorRepeat] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  useEffect(() => {
    if (!cookies.get('documentUsername') || !cookies.get('documentEmail') || !cookies.get('documentPhone') || !cookies.get('documentCountry')) {
      navigate('/')
    }
  }, [navigate])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    validatePasswords(newPassword, repeatPassword)
  }

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRepeatPassword = e.target.value
    setRepeatPassword(newRepeatPassword)
    validatePasswords(password, newRepeatPassword)
  }

  const validatePasswords = (newPassword: string, newRepeatPassword: string) => {
    if (newPassword.length < 8 || newPassword.length > 16) {
      setPasswordError('Password must be between 8 and 16 characters')
    } else {
      setPasswordError(null)
    }

    if (newPassword !== newRepeatPassword) {
      setPasswordErrorRepeat('Passwords do not match')
    } else {
      setPasswordErrorRepeat(null)
    }
  }

  const isSubmitDisabled = !!passwordError || !!passwordErrorRepeat || !password || !repeatPassword

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    validatePasswords(password, repeatPassword)

    if (!passwordError && !passwordErrorRepeat) {
      cookies.set('documentPassword', password)
      navigate('/review')
    }
  }

  return (
    <div className="login">
      <div className="container">
        <div className="login__stepper">
          <div className="stepper show"><div className="bg"></div><div className="text">Initial info</div></div>
          <div className="stepper active"><div className="bg"></div><div className="text">Password screen</div></div>
          <div className="stepper"><div className="bg"></div><div className="text">Review</div></div>
        </div>

        <div className="login__content">
          <div className="text-center text-[36px] leading-[43.57px] text-[var(--title)] font-medium">Super test form</div>
          <div className="text-center text-[20px] leading-[24.2px] text-[var(--text)] mt-[17px]">Password screen</div>
          <form onSubmit={handleSubmit} className="login__form">
            <div className="login__form--box">
              <label htmlFor="pass" className="text-[var(--white)] text-[14px] leading-[16px]">Password</label>
              <div className='relative'>
                <input type="password" placeholder="Input password" id="pass" className={`input ${passwordError ? 'pr-[40px]' : ''}`} value={password} onChange={handlePasswordChange} />
                {passwordError && (<img src="./iconError.svg" alt="Error Icon" className="absolute right-[12px] translate-y-1/2 bottom-2/4" />)}
              </div>
              {passwordError && (<div className="text-red-500">{passwordError}</div>)}
            </div>

            <div className="login__form--box">
              <label htmlFor="repeat" className="text-[var(--white)] text-[14px] leading-[16px]">Repeat passport</label>
              <div className='relative'>
                <input type="password" placeholder="Repeat password" id="repeat" className={`input ${passwordErrorRepeat ? 'pr-[40px]' : ''}`} value={repeatPassword} onChange={handleRepeatPasswordChange} />
                {passwordErrorRepeat && (<img src="./iconError.svg" alt="Error Icon" className="absolute right-[12px] translate-y-1/2 bottom-2/4" />)}
              </div>
              {passwordErrorRepeat && (<div className="text-red-500">{passwordErrorRepeat}</div>)}
            </div>

            <button type="submit" className="btn bg-[var(--white)]" disabled={isSubmitDisabled}>Continue</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Password