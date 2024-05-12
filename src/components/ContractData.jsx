import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config';
import { useNavigate, useParams } from 'react-router-dom'

const ContractData = () => {
  const params = useParams()

  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    var token = localStorage.getItem('token')
    axios.get(`${config.baseURL}/admin/viewContract/${params.id}`, { headers: { "authentication": token } })
      .then((response) => {
        // console.log(response.data.data);
        setContracts(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  return (
    loading ? <div className='m-5 font-2xl text-center'> Loading...</div> :
      <>
        <section className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Contract Details </h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all seller's and buyer's contracts details. You can see all the contracts in listing.
              </p>
            </div>
          </div>
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row bg-white shadow-md">
              <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
                <div className="p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                    <div className="mb-8">
                      <div className="text-sm font-semibold pb-1">Contract id</div>
                      <div className="text-sm font-medium text-gray-700"># {contracts[0]._id}</div>
                    </div>
                    <div className="mb-8">
                      <div className="text-sm font-semibold pb-2">Seller id</div>
                      <div className="text-sm font-medium text-gray-700"># {contracts[0].seller_id._id}</div>
                      <div className="text-sm font-semibold  text-gray-700">- Name - {contracts[0].seller_id.name}</div>
                      <div className="text-sm font-semibold  text-gray-700">- Contact - {contracts[0].seller_id.contact}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold pb-2">Buyer id</div>
                      <div className="text-sm font-medium text-gray-700"># {contracts[0].buyer_id._id}</div>
                      <div className="text-sm font-semibold  text-gray-700">- Name - {contracts[0].buyer_id.name}</div>
                      <div className="text-sm font-semibold  text-gray-700">- Contact - {contracts[0].buyer_id.contact}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="p-8">
                  <ul className="-my-7 divide-y divide-gray-200">
                    {contracts.map((product) => (
                      <li
                        key={product.id}
                        className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                      >
                        <div className="flex flex-1 items-stretch">
                          <div className="flex-shrink-0">
                            <img
                              className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                              src={product.diamond_image}
                              alt="diamond_image"
                            />
                          </div>
                          <div className="ml-5 flex flex-col justify-between">
                            <p>Bid amount : <span className="text-sm font-semibold text-gray-700"> ₹ {product.bid_amount}/-</span></p>
                            <p>Diamond carat : <span className="text-sm font-semibold text-gray-700"> ₹ {product.total_amount / product.bid_amount}/-</span> </p>
                            <p>Start date : <span className="text-sm font-semibold text-gray-700"> {product.start_date.split("-").reverse().join("-")}</span> </p>
                            <p>End date   : <span className="text-sm font-semibold text-gray-700"> {product.end_date.split("-").reverse().join("-")}</span> </p>
                            <p>Discription  : <span className="text-sm font-semibold text-gray-700 text-wrap"> {product.description}</span> </p>
                          </div>
                        </div>

                        <div className="ml-auto flex flex-col items-end justify-between">
                          <p className="text-right text-md font-bold text-gray-900">₹{product.total_amount}/-</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <hr className="my-8 border-t border-t-gray-200" />
                  <div className="ml-5 flex flex-col justify-between">
                    <div className="flex-1">
                      <p>Diamond name :<span className="text-sm text-gray-700"> {contracts[0].diamond_name.map((name) => <span>{name}, </span>)}</span></p>
                      <p>Quality of rough : <span className="text-sm text-gray-700"> {contracts[0].quality_of_rough.map((name) => <span>{name}, </span>)}</span></p>
                      <p>Cut of rough : <span className="text-sm text-gray-700"> {contracts[0].cut_of_diamond.map((name) => <span>{name}, </span>)}</span></p>
                      <p>polish_type :<span className="text-sm text-gray-700"> {contracts[0].polish_type.map((name) => <span>{name}, </span>)}</span></p>
                      <p>polish_color :<span className="text-sm text-gray-700"> {contracts[0].polish_color.map((name) => <span>{name}, </span>)}</span></p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

      </>
  )
}

export default ContractData