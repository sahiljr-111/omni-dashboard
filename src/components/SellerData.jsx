import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SellerData = () => {
  const [data, setData] = useState([])
  const params = useParams()
  const token = localStorage.getItem('token')
  useEffect(() => {
    axios.get(`http://localhost:8080/admin/seller-details/${params.id}`, { headers: { "authentication": token } })
      .then((response) => {
        setData(response.data.data)
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  return (
    <div className='mx-auto max-w-7xl px-4 py-4'>
      <h2 className="text-lg ms-1 font-semibold">Seller Details</h2>
      <div className="mt-8 p-8 overflow-hidden text-md  rounded-lg shadow-lg bg-white border-gray-300 md:flex-row">
        <h2>#{data?._id}</h2>
        <div className="py-8">
          <div className="mb-5 py-5 flex flex-col gap-5 text-center  items-center justify-between w-full rounded-md  flex-wrap overflow-hidden lg:flex-row lg:text-left">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="text-sm font-medium mb-1 text-gray-700">seller-name</div>
              <div className="text-lg font-semibold">{data?.name?.charAt(0).toUpperCase() + data?.name?.substr(1)}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="text-sm font-medium mb-1 text-gray-700">seller-email</div>
              <div className="text-lg font-semibold">{data?.email}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="text-sm font-medium mb-1 text-gray-700">seller-contact</div>
              <div className="text-lg font-semibold">{data?.contact}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="text-sm font-medium mb-1 text-gray-700">seller-category</div>
              <div className="text-lg font-semibold">{data?.seller_category}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="text-sm font-medium mb-1 text-gray-700">createdAt</div>
              <div className="text-lg font-semibold">{data?.createdAt?.substr(0, 10)}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="text-sm font-medium mb-1 text-gray-700">updatedAt</div>
              <div className="text-lg font-semibold">{data?.updatedAt?.substr(0, 10)}</div>
            </div>
          </div>
        </div>
        <div className='text-end'>
          <button className='bg-blue-900  px-5 py-2 text-white mx-2 rounded-md'>Edit</button>
          <button className='border border-red-900 px-5 py-2 text-red-900 hover:bg-red-900 hover:text-white ease-in mx-2 rounded-md'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default SellerData