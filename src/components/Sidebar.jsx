import React from 'react'
import { BarChart, Newspaper, LogOut, Users, UserCog, GemIcon, NotebookTabs, Trash2, Captions, ClipboardList } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../context/useAuthContext';
import '../App.css'
const Sidebar = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()
  const handleLogout = () => {
    toast.loading('logging out...', { duration: 1000 })
    setTimeout(() => {
      toast.success('logout Success!', { duration: 1000 })
    }, 1500)
    setTimeout(() => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    }, 1000)
  }
  return (
    <aside className="flex h-screen w-52 flex-col overflow-x-auto border-r bg-white px-5 py-8">
      <Toaster />
      <div className="inline-flex items-center space-x-2 justify-center">
        <span>
          <img src="logo.png" alt="" width={55} />
        </span>
        <span className="company font-extrabold text-4xl text-gray-900">mni</span>
      </div>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">analytics</label>
            <NavLink
              className={({ isActive }) => isActive ? "flex bg-black text-white transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-900 hover:text-gray-100" : "flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"}
              to="/"
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? "flex bg-black text-white transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-900 hover:text-gray-100" : "flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"}
              to="/sellers"
            >
              <UserCog className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Sellers</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? "flex bg-black text-white transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-900 hover:text-gray-100" : "flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"}
              to="/buyers"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Buyers</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? "flex bg-black text-white transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-900 hover:text-gray-100" : "flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"}
              to="/diamonds"
            >
              <GemIcon className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Diamonds</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? "flex bg-black text-white transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-900 hover:text-gray-100" : "flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"}
              to="/posts"
            >
              <Newspaper className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Posts</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? "flex bg-black text-white transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-900 hover:text-gray-100" : "flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"}
              to="/bids"
            >
              <ClipboardList className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Bids</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? "flex bg-black text-white transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-900 hover:text-gray-100" : "flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"}
              to="/contracts"
            >
              <NotebookTabs className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Contracts</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? "flex bg-black text-white transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-900 hover:text-gray-100" : "flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"}
              to="/trash"
            >
              <Trash2 className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Recycle bin</span>
            </NavLink>
          </div>
        </nav>
      </div>
      <div>
        <button
          className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
          onClick={() => { handleLogout() }}
        >
          Logout
          <LogOut className="ml-2" size={16} />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar;