
import './App.css'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

function App() {
  const [cookies, setCookies] = useCookies()
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (user && token) {
      if (user == '' && token === '') {
        setCookies('user', '')
        setCookies('token', '')
        localStorage.setItem('user', '')
        localStorage.setItem('token', '')
        navigate('/login');
      }
    } else {
      setCookies('user', '')
      setCookies('token', '')
      localStorage.setItem('user', '')
      localStorage.setItem('token', '')
      navigate('/login');
    }
    // console.log('->cookies --->', cookies);
    // console.log(localStorage)

  }, [])

  return (
    <>
      <div className="flex">
        <aside className='h-screen sticky top-0'>
          <Sidebar />
        </aside>
        <div className='w-full'>
          <Header />
          <div className="m-4 h-auto border bg-gray-100 rounded-xl">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
