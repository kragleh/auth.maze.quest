"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const LoginPage = () => {
  const [error, setError] = useState<string>()

  const onSubmit = () => {
    const usernameElement = document.getElementById('username') as HTMLInputElement
    const username = usernameElement.value
    const passwordElement = document.getElementById('password') as HTMLInputElement
    const password = passwordElement.value

    fetch('/api/login', { 
      method: 'POST',
      headers: {
        'username': username,
        'password': password
      }
    }).then(async (res) => {
      if (res.status === 404) {
        const json = await res.json()
        setError(json.error)
        return
      }
      
      if (res.status === 500) {
        setError('Wrong password!')
        return
      }

      if (res.status === 200) {
        window.location.href = '/success'
        return
      }

      setError('Error logged in console!')
      console.error(res)
    }).catch((err) => {
      setError(err)
    })
  }

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center gap-4">
      <div className="bg-neutral-800 rounded-xl p-4 flex flex-col gap-2">
        <h1 className="text-white text-2xl font-semibold text-center">Login</h1>
        { error ? <p className="text-white bg-red-800 border border-red-500 p-2 px-4 rounded text-center">{ error }</p> : <></> }
        <div className='flex flex-col gap-2'>
          <input type="text" name="username" id="username" placeholder='username' className='bg-neutral-700 rounded p-1 text-center text-white' />
          <input type='password' name="password" id="password" placeholder='password' className='bg-neutral-700 rounded p-1 text-center text-white' />
        </div>
        <button onClick={ onSubmit } className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded text-center duration-200">
          Login
        </button>
        <p className='text-white text-center'>Not registered? <Link href={'/register'} className='underline'>Register</Link></p>
      </div>
    </main>
  )
}

export default LoginPage