import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import Cookies from "universal-cookie"

const cookies = new Cookies()

const Review: React.FC = () => {
  let navigate = useNavigate()

  useEffect(() => {
    if (!cookies.get('documentUsername') || !cookies.get('documentEmail') || !cookies.get('documentPhone') || !cookies.get('documentCountry') || !cookies.get('documentPassword')) {
      navigate('/password')
    }
  }, [navigate])

  const handleContinue: () => void = () => {
    cookies.remove('documentUsername');
    cookies.remove('documentEmail');
    cookies.remove('documentPhone');
    cookies.remove('documentCountry');
    cookies.remove('documentPassword');
    navigate('/')
  }

  return (
    <div className="login">
      <div className="container">
        <div className="login__stepper">
          <div className="stepper show"><div className="bg"></div><div className="text">Initial info</div></div>
          <div className="stepper show"><div className="bg"></div><div className="text">Password screen</div></div>
          <div className="stepper active"><div className="bg"></div><div className="text">Review</div></div>
        </div>

        <div className="login__content">
          <div className="text-center text-[36px] leading-[43.57px] text-[var(--title)] font-medium">Super test form</div>
          <div className="text-center text-[20px] leading-[24.2px] text-[var(--text)] mt-[17px]">Review screen</div>
          <div className="login__form gap-[24px]">
            <div className="flex items-center justify-between gap-5">
              <div className="text-[var(--title-input)] text-[14px] leading-[16px]">Username</div>
              <div className="text-[var(--white)] text-[14px] leading-[16px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">{cookies.get('documentUsername')}</div>
            </div>

            <div className="flex items-center justify-between gap-5">
              <div className="text-[var(--title-input)] text-[14px] leading-[16px]">Email</div>
              <div className="text-[var(--white)] text-[14px] leading-[16px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">{cookies.get('documentEmail')}</div>
            </div>

            <div className="flex items-center justify-between gap-5">
              <div className="text-[var(--title-input)] text-[14px] leading-[16px]">Phone</div>
              <div className="text-[var(--white)] text-[14px] leading-[16px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">{cookies.get('documentPhone')}</div>
            </div>

            <div className="flex items-center justify-between gap-5">
              <div className="text-[var(--title-input)] text-[14px] leading-[16px]">Country</div>
              <div className="text-[var(--white)] text-[14px] leading-[16px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">{cookies.get('documentCountry')}</div>
            </div>

            <button type="button" onClick={handleContinue} className="btn bg-[var(--white)]">Complete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review