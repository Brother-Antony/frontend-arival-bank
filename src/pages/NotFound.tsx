import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <section className="container mt-[40px] mb-[60px] text-center">
      <i className='fad fa-outlet text-[54px] text-[var(--bg-current2)] mr-[1rem]'></i>
      <i className='fad fa-plug text-[54px] text-[var(--bg-current2)]'></i>
      <div className='text-[var(--label)] text-8xl font-bold my-4'>404</div>
      <div className='text-[var(--label)] font-bold text-2xl'>{error.error.message}</div>
      <div className='mt-6 text-[var(--title)] text-base'>The page you are looking for was not found. <br /> Check the URL or return to the <button type='button' onClick={() => navigate(-1)} className='underline text-[var(--bg-current2)] font-bold'>Homepage.</button></div>
    </section>
  )
}

export default NotFound