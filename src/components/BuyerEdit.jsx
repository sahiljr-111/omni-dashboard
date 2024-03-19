import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const BuyerEdit = () => {

  const navigate = useNavigate()
  const params = useParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/buyer-details/${params.id}`, { headers: { "authentication": token } })
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.data.isDeleted != true) {
          setName(response.data.data.name)
          setEmail(response.data.data.email)
          setContact(response.data.data.contact)
        } else {
          navigate(`/buyers/${params.id}`)
          toast.error('This Buyer is deleted')
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name != '' && email != '') {
      if (Number(contact)) {
        axios.patch(`http://localhost:8080/admin/update/buyer/${params.id}`, {
          name,
          email: email.toLowerCase(),
          contact
        }, { headers: { "authentication": token } })
          .then((response) => {
            console.log('data uppdated successfully')
            toast.success('Data updated successfully!')
            navigate(`/buyers/${params.id}`)
          })
          .catch((err) => {
            console.log(err.response)
            toast.error('Username already exist')
          })
      } else {
        toast.error('contact should me number')
      }
    } else {
      toast.error('Name and email should be valid')
    }


  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-4'>
      <Toaster />
      <h2 className="text-lg ms-1 font-semibold">Buyer Edit</h2>
      <div className="mt-8 p-8 overflow-hidden text-md  rounded-lg shadow-lg bg-white border-gray-300 md:flex-row">
        <form>
          <div className="space-y-5 px-80">
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                Buyer Name :
              </label>
              <div className="mt-2">
                <input
                  value={name}
                  className="flex h-10 w-full rounded-md border-1 bg-white bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Diamond"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                Buyer Email :
              </label>
              <div className="mt-2">
                <input
                  value={email.toLowerCase()}
                  className="flex h-10 w-full rounded-md border-1 bg-white bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Diamond"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                Buyer Contact :
              </label>
              <div className="mt-2">
                <input
                  value={contact}
                  className="flex h-10 w-full rounded-md border-1 bg-white bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Diamond"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
            <div className='text-center mt-6'>
              <button className='bg-blue-900 w-full  px-5 py-2 text-white rounded-md' onClick={handleSubmit}>Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuyerEdit