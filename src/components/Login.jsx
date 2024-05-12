import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { json, redirect, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import config from '../../config'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user !== '') {
      setTimeout(() => {
        toast('You are already logged in!', {
          icon: '⚠️',
        });
      }, 500)
      navigate('/');
    }
  }, []);

  const handleSubmit = () => {
    axios.post(`${config.baseURL}/admin/login`, {
      email, password
    }).then((response) => {
      toast.loading('logging in...', { duration: 1000 })
      setTimeout(() => {
        toast('Welcome Buddy!', { duration: 1000, icon: '👏' })
      }, 1500)
      setTimeout(() => {
        // console.log(response.data.data[0]);
        //cookie
        setCookie('user', JSON.stringify(response.data.data[0]));
        setCookie('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.data[0]))
        localStorage.setItem('token', response.data.token)
        // dispatch({ type: 'LOGIN', payload: response.data.data[0] })
        navigate('/')
      }, 1000)
    }).catch((error) => {
      console.log(error);
      toast.error('Invalid cridentials...!')
    })

  }

  return (
    <section className='border border-gray-300'>
      <Toaster />
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img src="logo.png" alt="*logo" height={90} width={90} />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-900">
            Omni Market Login
          </h2>

          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-sm font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    value={email}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-sm font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    value={password}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5  leading-7 text-white hover:bg-black/80"
                  onClick={() => { handleSubmit() }}
                >
                  {loading ? 'Logging in...' : 'Get started'}<ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </section>
  )
}

export default Login