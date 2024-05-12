import axios from 'axios';
import { Search, SearchCheckIcon, SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config';
const Sellers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate()

  const [seller, setSeller] = useState([])

  const [search, setSearch] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    var token = localStorage.getItem('token')
    axios.get(`${config.baseURL}/admin/allSeller`, { headers: { "authentication": token } })
      .then((response) => {
        // console.log(response.data.data);
        setSeller(response.data.data)
        setSearch(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      })

  }, [])

  const handleChange = (e) => {
    setSearchText(e.target.value)
    const filter = seller.filter((seller) => seller.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearch(filter)
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPeople = search.slice(indexOfFirstItem, indexOfLastItem);
  return (
    loading ? <div className='m-5 font-2xl text-center'> Loading...</div> :
      <>
        <div className='mx-auto max-w-7xl px-4 py-4'>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Seller </h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all sellers. You can see existing seller with clicking on any seller row after you edit or delete existing ones.
              </p>
            </div>
            <div className='flex items-center relative'>
              <input
                type="text"
                placeholder='search seller'
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
                    <span className='font-bold'>Profile</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Seller Name</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Seller Email</span>
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Seller Contact</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentPeople.map((item, index) => (
                  <tr key={item._id} className='hover:bg-gray-50 cursor-pointer' onClick={() => navigate(`/sellers/${item._id}`)}>
                    <td className="whitespace-nowrap py-5 px-3.5 ">
                      <div className=" text-gray-800 font-semibold">#{item._id.substr(-4)}</div>
                    </td>
                    {
                      item?.profile == null ?
                        <td className="whitespace-nowrap py-5 px-3.5">
                          <div className=" text-gray-800 font-semibold">
                            <img className="rounded-full" src="profile-user.png" alt="*profile" width={35} />
                          </div>
                        </td> :
                        <td className="whitespace-nowrap py-5 px-3.5">
                          <div className=" text-gray-800 font-semibold ">
                            <img className="rounded-full" src={item?.profile} alt="*profile" width={35} />
                          </div>
                        </td>
                    }
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className=" text-gray-800 font-semibold ">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className=" text-gray-800 font-semibold">{item.email}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className=" text-gray-800 font-semibold">{item.contact}</div>
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
              className={currentPage === 1 ? `mx-1 cursor-not-allowed text-sm font-semibold text-gray-900` : `mx-1  text-sm font-semibold text-gray-900`}
            >
              &larr; Previous
            </button>
            {Array.from({ length: Math.ceil(seller.length / itemsPerPage) }, (_, index) => (
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
              disabled={currentPage === Math.ceil(seller.length / itemsPerPage)}
              className={currentPage === Math.ceil(seller.length / itemsPerPage) ? `mx-2 cursor-not-allowed text-sm font-semibold text-gray-900` : `mx-2 cursor-pointer text-sm font-semibold text-gray-900`}
            >
              Next &rarr;
            </button>
          </div>
        </div >

      </>
  )
}

export default Sellers