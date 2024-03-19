import React, { useEffect, useState } from 'react'
import { Home, Link } from 'lucide-react'
import { useLocation } from 'react-router-dom'
const Header = () => {
  // const { user } = useAuthContext(AuthContext)
  var user;
  if (localStorage.getItem('user') != '') {
    user = JSON.parse(localStorage.getItem('user'))
  }
  const location = useLocation()
  let curruntLink = ''
  const crumps = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(Linkcrumb => {
      curruntLink += `/${Linkcrumb}`
      return (
        <li className="inline-flex items-center" key={Linkcrumb}>
          <span className='text-sm'>/</span> <a href={curruntLink} className="align-middle inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2" >{Linkcrumb}</a>
        </li>
      )
    })

  return (
    <nav className="flex w-full items-center justify-between  p-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 p-2 rounded-md bg-gray-100">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="align-middle inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
          >
            <Home className="mr-4 mt-0.5 h-4 w-4" />
            home
          </a>
        </li>
        {
          crumps
        }
      </ol>
      <div className="flex  items-center justify-between space-x-2 cursor-pointer">
        <div className='border gap-2 rounded-full flex items-center ps-3 shadow-md'>
          <span className="flex flex-col items-center justify-center">
            <span className="text-md font-medium text-gray-900">@{user?.email}</span>
          </span>
          <img
            className="shadow-lg h-10 w-10 border object-contain rounded-full"
            src="logo.png"
            alt="Dan_Abromov"
          />
        </div>
      </div>
    </nav>
  )
}

export default Header