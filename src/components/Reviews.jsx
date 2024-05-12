import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config';

const Reviews = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    var token = localStorage.getItem('token')
    axios.get(`${config.baseURL}/view-review`, { headers: { "authentication": token } })
      .then((response) => {
        // console.log(response.data.data);
        setReviews(response.data.data)
        setLoading(false)
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPeople = reviews.slice(indexOfFirstItem, indexOfLastItem);
  return (
    loading ? <div className='m-5 font-2xl text-center'> Loading...</div> :
      <>
        <section className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Reviews </h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all seller's and buyer's reviews. You can see all the reviews in listing.
              </p>
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
                    <span className='font-bold'>Review Id</span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Client name</span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Review rating</span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span className='font-bold'>Review message</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentPeople.map((item, index) => (
                  <tr className='hover:bg-gray-50 cursor-pointer'>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm text-gray-800 font-semibold">#{item?._id.substr(-4)}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm text-gray-800 font-semibold">{item?.client_id?.name}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm text-gray-800 font-semibold">{item?.rating}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-3.5">
                      <div className="text-sm  text-gray-800 font-semibold ">{item?.message}</div>
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
            {Array.from({ length: Math.ceil(reviews.length / itemsPerPage) }, (_, index) => (
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
              disabled={currentPage === Math.ceil(reviews.length / itemsPerPage)}
              className={currentPage === Math.ceil(reviews.length / itemsPerPage) ? `mx-2 cursor-not-allowed text-sm font-semibold text-gray-900` : `mx-2 cursor-pointer text-sm font-semibold text-gray-900`}
            >
              Next &rarr;
            </button>
          </div>
        </section>

      </>
  )
}

export default Reviews