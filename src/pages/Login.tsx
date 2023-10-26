import React, { useState, Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Listbox, Transition } from '@headlessui/react'

import axios, { AxiosResponse } from 'axios'
import Cookies from "universal-cookie"

interface Country {
  name: {
    common: string
  }
  region: string
}

const cookies = new Cookies()
const Placeholder = { name: "Select country" }
const ERROR_MESSAGES = {
  username: 'Username must be between 4 and 12 characters',
  email: 'The email is not valid',
  phone: 'The phone number is not valid',
  country: 'Please select a country',
}

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [selected, setSelectedCountry] = useState<typeof Placeholder | string>(Placeholder)
  const [regions, setRegions] = useState<string[]>([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [countryError, setCountryError] = useState<string | null>(null)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response: AxiosResponse<Country[]>) => {
      const countryRegions = response.data.map((country) => country.name.common)
      setRegions(countryRegions)
    }).catch((err) => {
      console.error('Error getting countries:', err)
    })
  }, [])

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const isPhoneValid = (phone: string) => {
    return phone.length > 0
  }

  const handleListboxChange = (value: typeof Placeholder | string) => {
    setSelectedCountry(value)
    setCountryError(value === Placeholder ? ERROR_MESSAGES.country : null)
  }

  const isSubmitEnabled = (): boolean => {
    return (username.length >= 4 && username.length <= 12 && isEmailValid(email) && isPhoneValid(phone) && selected !== Placeholder)
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setUsernameError(e.target.value.length < 4 || e.target.value.length > 12 ? ERROR_MESSAGES.username : null)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError(!isEmailValid(e.target.value) ? ERROR_MESSAGES.email : null)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
    setPhoneError(e.target.value.length === 0 ? ERROR_MESSAGES.phone : null)
  }

  const validateForm = (): boolean => {
    let isValid = true

    if (username.length < 4 || username.length > 12) {
      setUsernameError(ERROR_MESSAGES.username)
      isValid = false
    }

    if (!isEmailValid(email)) {
      setEmailError(ERROR_MESSAGES.email)
      isValid = false
    }

    if (!isPhoneValid(phone)) {
      setPhoneError(ERROR_MESSAGES.phone)
      isValid = false
    }

    if (selected === Placeholder) {
      setCountryError(ERROR_MESSAGES.country)
      isValid = false
    }

    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      cookies.set('documentUsername', username)
      cookies.set('documentEmail', email)
      cookies.set('documentPhone', phone)
      cookies.set('documentCountry', selected)
      navigate('/password')
    }
  }

  return (
    <div className="login">
      <div className="container">
        <div className="login__stepper">
          <div className="stepper active"><div className="bg"></div><div className="text">Initial info</div></div>
          <div className="stepper"><div className="bg"></div><div className="text">Password screen</div></div>
          <div className="stepper"><div className="bg"></div><div className="text">Review</div></div>
        </div>

        <div className="login__content">
          <div className="text-center text-[36px] leading-[43.57px] text-[var(--title)] font-medium">Super test form</div>
          <div className="text-center text-[20px] leading-[24.2px] text-[var(--text)] mt-[17px]">Initial info</div>
          <form onSubmit={handleSubmit} className="login__form">
            <div className="login__form--box">
              <label htmlFor="username" className="text-[var(--white)] text-[14px] leading-[16px]">Username</label>
              <div className='relative'>
                <input type="text" placeholder="Input username" id="username" className={`input ${usernameError ? 'pr-[40px]' : ''}`} value={username} onChange={handleUsernameChange} />
                {usernameError && (<img src="./iconError.svg" alt="Error Icon" className="absolute right-[12px] translate-y-1/2 bottom-2/4" />)}
              </div>
              {usernameError && (<div className="text-red-500">{usernameError}</div>)}
            </div>

            <div className="login__form--box">
              <label htmlFor="email" className="text-[var(--white)] text-[14px] leading-[16px]">Email</label>
              <div className='relative'>
                <input type="email" placeholder="Input email" id="email" className={`input ${emailError ? 'pr-[40px]' : ''}`} value={email} onChange={handleEmailChange} />
                {emailError && (<img src="./iconError.svg" alt="Error Icon" className="absolute right-[12px] translate-y-1/2 bottom-2/4" />)}
              </div>
              {emailError && (<div className="text-red-500">{emailError}</div>)}
            </div>

            <div className="login__form--box">
              <label htmlFor="phone" className="text-[var(--white)] text-[14px] leading-[16px]">Phone</label>
              <div className='relative'>
                <input type="number" placeholder="Input phone" id="phone" className={`input ${phoneError ? 'pr-[40px]' : ''}`} value={phone} onChange={handlePhoneChange} />
                {phoneError && (<img src="./iconError.svg" alt="Error Icon" className="absolute right-[12px] translate-y-1/2 bottom-2/4" />)}
              </div>
              {phoneError && (<div className="text-red-500">{phoneError}</div>)}
            </div>

            <div className="login__form--box">
              <div className="text-[var(--white)] text-[14px] leading-[16px]">Country</div>
              <Listbox value={selected} onChange={handleListboxChange}>
                <div className="relative">
                  <Listbox.Button className={`relative w-full cursor-default bg-[var(--white)] py-[12px] pl-[16px] pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ${selected === Placeholder ? 'text-[var(--text-input)]' : 'text-[var(--title)]'}`}>
                    <span className="block truncate">{typeof selected === 'string' ? selected : selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[16px]"><img src="./iconChevron.svg" alt="" /></span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-[8px] max-h-[242px] w-full overflow-auto bg-[var(--white)] text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {regions.map((region, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-[12px] px-[16px] flex items-center gap-[8px] ${
                              active ? 'bg-[var(--active-drop)] text-[var(--title)]' : 'text-[var(--title)]'
                            }`
                          }
                          value={region}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-semibold' : 'font-normal'
                                }`}
                              >
                                {region}
                              </span>
                              {selected ? (
                                <span className="text-[var(--primary-day)]">
                                  <img src="./iconUnion.svg" alt="" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              {countryError && <div className="text-[var(--red)] text-[14px] leading-[16px]">{countryError}</div>}
            </div>

            <button type="submit" className="btn bg-[var(--white)]" disabled={!isSubmitEnabled()}>Continue</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login