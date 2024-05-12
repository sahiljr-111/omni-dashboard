import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import config from '../../config'

const BuyerData = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [btnName, setBtnName] = useState("")
  const params = useParams()
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')
  useEffect(() => {
    axios.get(`${config.baseURL}/admin/buyer-details/${params.id}`, { headers: { "authentication": token } })
      .then((response) => {
        // console.log(response.data.data);
        setData(response.data.data)
        setLoading(false)
        if (response.data.data.isDeleted == true) {
          setBtnName("Restore")
        } else {
          setBtnName("Delete")
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [btnName])
  const handleDeleteBuyer = (id) => {
    const handleConfirm = window.confirm(`Are you sure want to ${btnName == "Restore" ? 'Restore' : 'Delete'}`)
    if (handleConfirm) {
      if (btnName == 'Restore') {
        axios.get(`${config.baseURL}/admin/restore/client/${id}`, { headers: { "authentication": token } })
          .then((response) => {
            console.log('restore success')
            setBtnName("Delete")
            toast.success("Restored Successfull!")
          })
          .catch((err) => {
            console.log(err)
            setBtnName(btnName);
            toast.error('something went wrong!')
          })

      } else {
        axios.delete(`${config.baseURL}/admin/delete/buyer/${params.id}`, { headers: { "authentication": token } })
          .then((response) => {
            // console.log(response)
            toast.success('Buyer deleted!')
            setBtnName("Restore")
          })
          .catch((err) => {
            console.log(err)
            toast.error('Buyer already deleted!')
            setBtnName("Restore")
          })
      }
    } else {
      console.log('You clicked cancle')
    }
  }
  return (
    loading ? <div className='m-5 font-2xl text-center'>Loading...</div> :  
    <div className='mx-auto max-w-7xl px-4 py-4'>
      <Toaster />
      <h2 className="text-lg ms-1 font-semibold">Buyer Details</h2>
      <div className="mt-8 p-8 overflow-hidden text-md  rounded-lg shadow-lg bg-white border-gray-300 md:flex-row">
        <div className='flex align-middle gap-2'>
          {
            data && data.profile == null
              ?
              <img className="rounded-full" src="/profile-user.png" alt="*profile" width={35} />
              :
              <img className="rounded-full" src={data?.profile} alt="*profile" width={45} />
          }
          <span className='text-gray-500 self-center'>#{data?._id}</span>
        </div>
        <div className="py-8">
          <div className="mb-5 py-5 flex flex-col gap-5 text-center  items-center justify-between w-full rounded-md  flex-wrap overflow-hidden lg:flex-row lg:text-left">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="text-sm font-medium mb-1 text-gray-700">buyer-name</div>
              <div className="text-lg font-semibold">{data?.name?.charAt(0).toUpperCase() + data?.name?.substr(1)}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 text-wrap">
              <div className="text-sm font-medium mb-1 text-gray-700">buyer-email</div>
              <div className="text-lg font-semibold">{data?.email}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="text-sm font-medium mb-1 text-gray-700">buyer-contact</div>
              <div className="text-lg font-semibold">{data?.contact}</div>
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
          <button disabled={data.isDeleted} className={data.isDeleted ? `cursor-not-allowed bg-blue-200  px-5 py-2 text-white mx-2 rounded-md ` : ` bg-blue-900  px-5 py-2 text-white mx-2 rounded-md `} onClick={() => navigate(`/buyers/edit/${data?._id}`)}>Edit</button>
          <button className={`border ${btnName == "Delete" ? 'border-red-900 px-5 py-2 text-red-900 hover:bg-red-900' : ' border-green-900 px-5 py-2 text-green-900 hover:bg-green-900'} hover:text-white ease-in mx-2 rounded-md`} onClick={() => handleDeleteBuyer(data?._id)}>{btnName}</button>
        </div>
      </div>
    </div>
  )
}

export default BuyerData