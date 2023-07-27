"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const RegisterPage = () => {
  const [error, setError] = useState<string>()

  const onSubmit = () => {
    const codeElement = document.getElementById('code') as HTMLInputElement
    const code = codeElement.value
    const usernameElement = document.getElementById('username') as HTMLInputElement
    const username = usernameElement.value
    const passwordElement = document.getElementById('password') as HTMLInputElement
    const password = passwordElement.value

    fetch('/api/register', { 
      method: 'POST',
      headers: {
        'code': code,
        'username': username,
        'password': password
      }
    }).then(async (res) => {
      if (res.status === 404) {
        const json = await res.json()
        setError(json.error)
        return
      }
      
      if (res.status === 400) {
        setError('Invalid registration code!')
        return
      }

      if (res.status === 200) {
        window.location.href = '/login'
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
        <h1 className="text-white text-2xl font-semibold text-center">Register</h1>
        { error ? <p className="text-white bg-red-800 border border-red-500 p-2 px-4 rounded text-center">{ error }</p> : <></> }
        <div className='flex flex-col gap-2'>
          <input type="text" name="code" id="code" placeholder='code' className='bg-neutral-700 rounded p-1 text-center text-white' />
          <input type="text" name="username" id="username" placeholder='username' className='bg-neutral-700 rounded p-1 text-center text-white' />
          <input type='password' name="password" id="password" placeholder='password' className='bg-neutral-700 rounded p-1 text-center text-white' />
        </div>
        <button onClick={ onSubmit } className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded text-center duration-200">
          Register
        </button>
        <p className='text-white text-center'>Already registered? <Link href={'/login'} className='underline'>Login</Link></p>
      </div>
    </main>
  )
}

export default RegisterPage