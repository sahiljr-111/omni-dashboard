
import './App.css'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthContext } from './context/AuthContext'
import { useAuthContext } from './context/useAuthContext'

function App() {
  const navigate = useNavigate();
  const { user } = useAuthContext(AuthContext)
  useEffect(() => {
    if (user == null) {
      navigate('/login');
    }
  }, [user])

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
