import axios from 'axios';
import React, { useEffect, useState } from 'react'
const Sellers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [seller, setSeller] = useState([])

  useEffect(() => {
    var token = localStorage.getItem('token')
    axios.get('http://localhost:8080/admin/allSeller', { headers: { "authentication": token } })
      .then((response) => {
        console.log(response.data.data);
        setSeller(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPeople = seller.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div className='mx-auto max-w-7xl px-4 py-4'>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Seller </h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all employees. You can add new employees, edit or delete existing
              ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new Seller
            </button>
          </div>
        </div>
        <div className="flex gap-2 mt-10 flex-wrap justify-evenly ">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm  font-normal text-gray-500"
                >
                  <span className='font-bold'>Index</span>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                >
                  <span className='font-bold'>Seller Name</span>
                </th>
                <th
                  scope="col"
                  className="px-14 py-3.5 text-left text-sm font-normal text-gray-500"
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
                <div key={item._id} className='m-3'>
                  <tr >
                    <td className="whitespace-nowrap px-12 py-4">
                      <div className="text-sm text-gray-800 font-semibold">{item._id.substr(-4)}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm  text-gray-800 font-semibold ">{item.name}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-800 font-semibold">{item.email}</div>
                    </td>
                    <td className="whitespace-nowrap px-12 py-4">
                      <div className="text-sm text-gray-800 font-semibold">{item.Contact}</div>
                    </td>
                  </tr>
                </div>
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
          {Array.from({ length: Math.ceil(seller.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 flex items-center rounded-md border ${currentPage === index + 1 ? 'bg-black text-white' : 'border-gray-400'
                } px-3 py-1 text-gray-900 hover:scale-105`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(seller.length / itemsPerPage)}
            className="mx-2 cursor-pointer text-sm font-semibold text-gray-900"
          >
            Next &rarr;
          </button>
        </div>
      </div >

    </>
  )
}

export default Sellers