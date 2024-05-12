import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import config from '../../config'

const SellerEdit = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [catname, setCatName] = useState([])

  const token = localStorage.getItem('token')
  useEffect(() => {
    axios.get(`${config.baseURL}/admin/seller-details/${params.id}`, { headers: { "authentication": token } })
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.data.isDeleted != true) {
          setId(response.data.data._id)
          setName(response.data.data.name)
          setEmail(response.data.data.email)
          setContact(response.data.data.contact)
          setCatName(response.data.data.seller_category)
        } else {
          navigate(`/sellers/${params.id}`)
          toast.error('This seller is deleted')
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name != '' && email != '') {
      if (catname != '') {
        if (Number(contact)) {
          axios.patch(`${config.baseURL}/admin/update/seller/${params.id}`, {
            name,
            email: email.toLowerCase(),
            seller_category: catname,
            contact
          }, { headers: { "authentication": token } })
            .then((response) => {
              console.log('data uppdated successfully')
              toast.success('Data updated successfully!')
              navigate(`/sellers/${params.id}`)
            })
            .catch((err) => {
              console.log(err.response)
              toast.error('Username already exist')
            })
        } else {
          toast.error('contact should me number')
        }
      } else {
        toast.error('Seller category must be valid')
      }

    } else {
      toast.error('Name and email should be valid')
    }

  }

  const handleName = (e) => {
    const isChaeckd = e.target.checked
    const value = e.target.value
    if (isChaeckd) {
      setCatName((prev) => [...prev, value])
    } else {
      setCatName(catname.filter((item) => item !== value))
    }
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-4'>
      <Toaster />
      <h2 className="text-lg ms-1 font-semibold w-full">Seller Edit</h2>
      <div className="mt-8 p-8  mx-auto overflow-hidden text-md rounded-lg shadow-lg bg-white border-gray-300 md:flex-row">
        <form className='py-8'>
          <div className="space-y-5 w-2/3 mx-auto editSeller">
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                Seller Name :
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
                Seller Email :
              </label>
              <div className="mt-2">
                <input
                  value={email.toLowerCase()}
                  className="flex h-10 w-full rounded-md border-1 bg-white bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Diamond"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                Seller Category :
              </label>
              <div className="mt-2 flex-col gap-4">
                <ul class="items-center w-full flex flex-col lg:flex-row  text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full  hover:shadow-xl hover:bg-gray-100 border-b border-gray-200 dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Rough-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Rough"
                        onChange={handleName}
                        checked={catname.includes("Rough")}
                      />
                      <label htmlFor="Rough-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Rough
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100 border-b border-gray-200 dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="4p-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="4p"
                        onChange={handleName}
                        checked={catname.includes("4p")}
                      />
                      <label htmlFor="4p-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        4p
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100 border-b border-gray-200 dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Galaxy-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Galaxy"
                        onChange={handleName}
                        checked={catname.includes("Galaxy")}
                      />
                      <label htmlFfor="Galaxy-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Galaxy
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100 border-b border-gray-200 dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Polish-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Polish"
                        onChange={handleName}
                        checked={catname.includes("Polish")}
                      />
                      <label htmlFor="Polish-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Polish
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100 border-b border-gray-200 dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Sarin-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Sarin"
                        onChange={handleName}
                        checked={catname.includes("Sarin")}
                      />
                      <label htmlFor="Sarin-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Sarin
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                Seller Contact :
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

export default SellerEdit