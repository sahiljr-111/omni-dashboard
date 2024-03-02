import React, { useEffect, useState } from 'react'
import Chart1 from './charts/Chart1'
import { UserCog, Users, Gem } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Home = () => {

  const [seller, setSeller] = useState()
  const [buyer, setBuyer] = useState()
  const [diamonds, setDiamonds] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    var token = localStorage.getItem('token')
    axios.get('http://localhost:8080/admin/allSeller', { headers: { "authentication": token } })
      .then((response) => {
        setSeller(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:8080/admin/allBuyer', { headers: { "authentication": token } })
      .then((response) => {
        setBuyer(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:8080/admin/viewDiamond', { headers: { "authentication": token } })
      .then((response) => {
        setDiamonds(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  return (
    loading ? <div className='m-5 font-2xl text-center'> Loading...</div> :
      <>
        <div className='my-4 text-center overflow-y-auto'>
          <section className="relative w-full overflow-hidden ">
            <div className="relative mx-auto max-w-7xl px-4">
              <div className="mx-auto md:max-w-full">
                <div className="-m-5 flex flex-wrap">
                  <div className="w-full p-5 md:w-1/3">
                    <div className="rounded-md border shadow-md bg-white bg-opacity-90">
                      <div className="px-5 py-4 flex gap-5 items-center">
                        <div className="md:inline-block p-4 text-red-600 bg-red-100 rounded-md">
                          <UserCog />
                        </div>
                        <p className=" text-lg  text-gray-600">
                          <div className="rounded-md h-50 text-black text-sm font-bold" >
                            <span className='text-2xl'>{seller?.length}</span>
                          </div>
                          Total Sellers
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-5 md:w-1/3">
                    <div className="rounded-md border shadow-md bg-white bg-opacity-90">
                      <div className="px-5 py-4 flex gap-5 items-center">
                        <div className="md:inline-block p-4  text-yellow-600 bg-yellow-100 rounded-md">
                          <Users />
                        </div>
                        <p className=" text-lg  text-gray-600">
                          <div className="rounded-md h-50 text-black text-sm font-bold" >
                            <span className='text-2xl'>{buyer?.length}</span>
                          </div>
                          Total Buyers
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-5 md:w-1/3">
                    <div className="rounded-md border shadow-md bg-white bg-opacity-90">
                      <div className="px-5 py-4 flex gap-5 items-center">
                        <div className="md:inline-block p-4  text-green-600 bg-green-100  rounded-md">
                          <Gem />
                        </div>
                        <p className=" text-lg  text-gray-600">
                          <div className="rounded-md h-50 text-black text-sm font-bold" >
                            <span className='text-2xl'>{diamonds?.length}</span>
                          </div>
                          Total Diamonds
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                </div>
                <Chart1 />
              </div>
            </div>
          </section>
        </div>
      </>
  )
}

export default Home