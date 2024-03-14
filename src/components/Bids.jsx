import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Bids = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    var token = localStorage.getItem('token')
    axios.get('http://localhost:8080/admin/viewBids', { headers: { "authentication": token } })
      .then((response) => {
        console.log(response.data.data);
        setBids(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPeople = bids.slice(indexOfFirstItem, indexOfLastItem);
  return (
    loading ? <div className='m-5 font-2xl text-center'> Loading...</div> :
      <>
        <section className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Bids </h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all seller bids. You can see all the bids in listing.
              </p>
            </div>
            <div>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new Bids
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-10 flex-wrap justify-evenly ">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr className=''>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Seller Id</span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Bid amount</span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Diamond Category</span>
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Rough Quality</span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Polish Colors</span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Polish Types</span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Start / End Date</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentPeople.map((item, index) => (
                  <tr className='hover:bg-gray-50 cursor-pointer'>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm text-gray-800 font-semibold">#{item?.seller_id.substr(-4)}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm text-gray-800 font-semibold">{item.bid_amount}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm  text-gray-800 font-semibold ">{item.diamond_category}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm text-gray-800 font-semibold">{item.rough_quality}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm text-gray-800 font-semibold">{item.polish_color}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm text-gray-800 font-semibold">{item.polish_type}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm text-gray-800 font-semibold">{item.start_date}{"/"}{item.end_date}</div>
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
            {Array.from({ length: Math.ceil(bids.length / itemsPerPage) }, (_, index) => (
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
              disabled={currentPage === Math.ceil(bids.length / itemsPerPage)}
              className={currentPage === Math.ceil(bids.length / itemsPerPage) ? `mx-2 cursor-not-allowed text-sm font-semibold text-gray-900` : `mx-2 cursor-pointer text-sm font-semibold text-gray-900`}
            >
              Next &rarr;
            </button>
          </div>
        </section>

      </>
  )
}

export default Bids