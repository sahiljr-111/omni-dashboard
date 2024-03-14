import axios from 'axios'
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Trash = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [search, setSearch] = useState([])
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState([])
  const token = localStorage.getItem('token')
  const [stateDelete, setStateDelete] = useState(false)


  useEffect(() => {
    axios.get('http://localhost:8080/admin/delete/client', { headers: { "authentication": token } })
      .then((response) => {
        console.log(response.data.data)
        setData(response.data.data)
        setSearch(response.data.data)
      })
      .catch((err) => {
        console.log(err)
        if (data.length == 1) {
          window.location.reload()
        }
      })
  }, [stateDelete])

  const handleRestore = (id) => {
    axios.get(`http://localhost:8080/admin/restore/client/${id}`, { headers: { "authentication": token } })
      .then((response) => {
        console.log('Restored successfully');
        setStateDelete(prevState => !prevState)
        toast.success("Client Removed successfully!")
      })
      .catch((err) => {
        window.location.reload()
        console.log(err)
        setStateDelete(prevState => !prevState)
        toast.error("Something went wrong!")
      })
  }

  const handleChange = (e) => {
    setSearchText(e.target.value)
    const filter = data.filter((data) => data.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearch(filter)
  }

  const handlePremenentDelete = (id) => {
    toast.success('permenently Deleted')
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPeople = search.slice(indexOfFirstItem, indexOfLastItem);

  return (
    currentPeople == '' ? <div className='mx-auto font-bold max-w-7xl px-4 py-4 text-center'>Recycle bin is Empty</div> :
      <>
        <div className='mx-auto max-w-7xl px-4 py-4'>
          <Toaster />
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Deleted client </h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all Deleted clients. You can see list and searching perticular seller and remove from delete list.
              </p>
            </div>
            <div className='flex items-center relative'>
              <input
                type="text"
                placeholder='search client'
                className="rounded-md px-3 py-2 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onChange={handleChange}
                value={searchText}
              />
              <div className='absolute right-3'>
                <SearchIcon size={20} />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-10 flex-wrap justify-evenly ">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr className=''>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm  font-normal text-gray-500"
                  >
                    <span className='font-bold'>Id</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Name</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Email</span>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Contact</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-cemter text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentPeople.map((item, index) => (
                  <tr key={item._id} className='hover:bg-gray-50 cursor-pointer'>
                    <td className="whitespace-nowrap py-5 px-3.5 ">
                      <div className=" text-gray-800 font-semibold">#{item?._id.substr(-4)}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className=" text-gray-800 font-semibold ">{item?.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className=" text-gray-800 font-semibold">{item?.email}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className=" text-gray-800 font-semibold">{item?.contact}</div>
                    </td>
                    <td className="whitespace-nowrap flex justify-center gap-1 py-5 px-3.5 text-center">
                      <button
                        className="border border-green-900 px-3 py-1 text-green-900 hover:bg-green-900  hover:text-white ease-in rounded-md"
                        onClick={() => { handleRestore(item?._id); }}
                      >
                        Restore
                      </button>
                      <button
                        className="border border-red-900 px-3 py-1 bg-red-900 hover:bg-red-800 text-white ease-in rounded-md"
                        onClick={() => { handlePremenentDelete(item?._id); }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center p-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-1 cursor-pointer text-sm font-semibold text-gray-900"
            >
              &larr; Previous
            </button>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx - 1 flex items - center rounded - md border ${currentPage === index + 1 ? 'bg-black text-white' : 'border-gray-400'
                  } px-3 py - 1 text - gray - 900 hover: scale - 105`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
              className="mx-2 cursor-pointer text-sm font-semibold text-gray-900"
            >
              Next &rarr;
            </button>
          </div>
        </div >

      </>
  )
}

export default Trash