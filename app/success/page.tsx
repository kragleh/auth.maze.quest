"use client"
import React, { useEffect, useState } from 'react'

const SuccessPage = () => {
  const [count, setCount] = useState(30)

  useEffect(() => {
    setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 1) {
          window.location.href = '/'
        }

        return prevCount - 1
      })
    }, 1000)
  }, [])

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-white text-2xl font-semibold">Logged In</h1>
      <p className='text-gray-300 text-center'>You have { count } seconds to join.</p>
    </main>
  )
}

export default SuccessPage