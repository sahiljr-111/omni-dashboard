import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import config from '../../config'

const AddDiamonds = () => {
  const navigate = useNavigate()
  const [name, setName] = useState([])
  const [quality, setQuality] = useState([])
  const [cut, setCut] = useState([])
  const [color, setColor] = useState([])
  const [type, setType] = useState([])


  const handleName = (e) => {
    const isChaeckd = e.target.checked
    const value = e.target.value
    if (isChaeckd) {
      setName((prev) => [...prev, value])
    } else {
      setName(name.filter((item) => item !== value))
    }
  }

  const handleCheckQuality = (e) => {
    const isChaeckd = e.target.checked
    const value = e.target.value
    if (isChaeckd) {
      setQuality((prev) => [...prev, value])
    } else {
      setQuality(quality.filter((item) => item !== value))
    }
  }

  const handleCheckCut = (e) => {
    const isChaeckd = e.target.checked
    const value = e.target.value
    if (isChaeckd) {
      setCut((prev) => [...prev, value])
    } else {
      setCut(cut.filter((item) => item !== value))
    }
  }
  const handleCheckColor = (e) => {
    const isChaeckd = e.target.checked
    const value = e.target.value
    if (isChaeckd) {
      setColor((prev) => [...prev, value])
    } else {
      setColor(color.filter((item) => item !== value))
    }
  }

  const handleCheckType = (e) => {
    const isChaeckd = e.target.checked
    const value = e.target.value
    if (isChaeckd) {
      setType((prev) => [...prev, value])
    } else {
      setType(type.filter((item) => item !== value))
    }
  }

  const handleSubmit = () => {
    const token = localStorage.getItem('token')
    if (name != '' && quality != '' && cut != '' && color != '' && type != '') {

      axios.post(`${config.baseURL}/admin/addDiamond`, {
        diamond_name: name,
        quality_of_rough: quality,
        cut_of_diamond: cut,
        polish_color: color,
        polish_type: type
      }, {
        headers: {
          "authentication": token
        },
      })
        .then((response) => {
          console.log('successfull Added');
          toast.success('Diamond add successfull!')
          setName("");
          setQuality("");
          setCut("");
          setColor("");
          setType("");
          navigate('/diamonds')
        })
        .catch((error) => {
          console.log('ERROR:', error);
        })
    } else {
      toast.error('Fill All Details')
    }
  }
  return (
    <section className="mx-auto max-w-7xl px-4 py-4">
      <Toaster />
      <h2 className="text-lg ms-1 font-semibold">Add new diamond </h2>
      <div className="flex items-center justify-center px-4 sm:px-6 md:py-3 lg:px-8 lg:py-10">
        <form action="#" method="POST" className="mt-1 w-full md:w-3/4 xl:w-2/4">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  Quality of rough :
                </label>
              </div>
              <div className="mt-2 flex-col gap-4">
                <ul class="items-center w-full  text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full hover:shadow-xl hover:bg-gray-100   border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Rough-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Rough"
                        onChange={handleName}
                        checked={name.includes("Rough")}
                      />
                      <label for="Rough-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Rough
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="4p-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="4p"
                        onChange={handleName}
                        checked={name.includes("4p")}
                      />
                      <label for="4p-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        4p
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Galaxy-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Galaxy"
                        onChange={handleName}
                        checked={name.includes("Galaxy")}
                      />
                      <label for="Galaxy-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Galaxy
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100   border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Polish-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Polish"
                        onChange={handleName}
                        checked={name.includes("Polish")}
                      />
                      <label for="Polish-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Polish
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100   border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Sarin-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Sarin"
                        onChange={handleName}
                        checked={name.includes("Sarin")}
                      />
                      <label for="Sarin-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Sarin
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* NOTE:Rough of Quality */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  Quality of rough :
                </label>
              </div>
              <div className="mt-2 flex-col gap-4">
                <ul class="items-center w-full  text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full hover:shadow-xl hover:bg-gray-100   border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Kilias-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Kilias"
                        onChange={handleCheckQuality}
                        checked={quality.includes("Kilias")}
                      />
                      <label for="Kilias-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Kilias
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Coated-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Coated"
                        onChange={handleCheckQuality}
                        checked={quality.includes("Coated")}
                      />
                      <label for="Coated-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Coated
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="White-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="White"
                        onChange={handleCheckQuality}
                        checked={quality.includes("White")}
                      />
                      <label for="White-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        White
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Markeble-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Markeble"
                        onChange={handleCheckQuality}
                        checked={quality.includes("Markeble")}
                      />
                      <label for="Markeble-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Markeble
                      </label>
                    </div>
                  </li>
                </ul>
                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full hover:shadow-xl hover:bg-gray-100   border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Russian-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Russian"
                        onChange={handleCheckQuality}
                        checked={quality.includes("Russian")}
                      />
                      <label for="Russian-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Russian
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Alorza-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Alorza"
                        onChange={handleCheckQuality}
                        checked={quality.includes("Alorza")}
                      />
                      <label for="Alorza-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Alorza
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Norba-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Norba"
                        onChange={handleCheckQuality}
                        checked={quality.includes("Norba")}
                      />
                      <label for="Norba-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Norba
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Zimba-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Zimba"
                        onChange={handleCheckQuality}
                        checked={quality.includes("Zimba")}
                      />
                      <label for="Zimba-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Zimba
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* NOTE:Cut of diamond */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  Cut of Diamond :
                </label>
              </div>
              <div className="mt-2 flex-col gap-4">
                <ul class="items-center w-full  text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full hover:shadow-xl hover:bg-gray-100   border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Round-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Round"
                        onChange={handleCheckCut}
                        checked={cut.includes("Round")}
                      />
                      <label for="Round-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Round
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Pan-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Pan"
                        onChange={handleCheckCut}
                        checked={cut.includes("Pan")}
                      />
                      <label for="Pan-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Pan
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Markis-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Markis"
                        onChange={handleCheckCut}
                        checked={cut.includes("Markis")}
                      />
                      <label for="Markis-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Markis
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Choki-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Choki"
                        onChange={handleCheckCut}
                        checked={cut.includes("Choki")}
                      />
                      <label for="Choki-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Choki
                      </label>
                    </div>
                  </li>
                </ul>
                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Prince-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Prince"
                        onChange={handleCheckCut}
                        checked={cut.includes("Prince")}
                      />
                      <label for="Prince-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Prince
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Oval-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Oval"
                        onChange={handleCheckCut}
                        checked={cut.includes("Oval")}
                      />
                      <label for="Oval-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Oval
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Rose Cut-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Rose Cut"
                        onChange={handleCheckCut}
                        checked={cut.includes("Rose Cut")}
                      />
                      <label for="Rose Cut-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Rose Cut
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Emreald-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="Emreald"
                        onChange={handleCheckCut}
                        checked={cut.includes("Emreald")}
                      />
                      <label for="Emreald-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Emreald
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* NOTE:Plish Color */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  Plosh Color :
                </label>
              </div>
              <div className="mt-2 flex-col gap-4">
                <ul class="items-center w-full  text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full hover:shadow-xl hover:bg-gray-100   border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="Whitec-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="White"
                        onChange={handleCheckColor}
                        checked={color.includes("White")}
                      />
                      <label for="Whitec-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        White
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="LB-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="LB"
                        onChange={handleCheckColor}
                        checked={color.includes("LB")}
                      />
                      <label for="LB-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        LB
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="LC-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="LC"
                        onChange={handleCheckColor}
                        checked={color.includes("LC")}
                      />
                      <label for="LC-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        LC
                      </label>
                    </div>
                  </li>
                </ul>

              </div>
            </div>
            {/* NOTE:Polish Type */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  Polish Type :
                </label>
              </div>
              <div className="mt-2 flex-col gap-4  ">
                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full border-b hover:shadow-xl hover:bg-gray-100 rounded-md border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="VVS-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="VVS"
                        onChange={handleCheckType}
                        checked={type.includes("VVS")}
                      />
                      <label for="VVS-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        VVS
                      </label>
                    </div>
                  </li>
                  <li class="w-full border-b hover:shadow-xl  hover:bg-gray-100 border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="VVS2-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="VVS2"
                        onChange={handleCheckType}
                        checked={type.includes("VVS2")}
                      />
                      <label for="VVS2-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        VVS2
                      </label>
                    </div>
                  </li>
                  <li class="w-full border-b hover:shadow-xl  hover:bg-gray-100 border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="SI1-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="SI1"
                        onChange={handleCheckType}
                        checked={type.includes("SI1")}
                      />
                      <label for="SI1-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        SI1
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl  hover:bg-gray-100 dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="SI2-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="SI2"
                        onChange={handleCheckType}
                        checked={type.includes("SI2")}
                      />
                      <label for="SI2-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        SI2
                      </label>
                    </div>
                  </li>
                </ul>
                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li class="w-full hover:shadow-xl  hover:bg-gray-100  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="SI3-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="SI3"
                        onChange={handleCheckType}
                        checked={type.includes("SI3")}
                      />
                      <label for="SI3-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        SI3
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl  hover:bg-gray-100 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="I1-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="I1"
                        onChange={handleCheckType}
                        checked={type.includes("I1")}
                      />
                      <label for="I1-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I1
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl  hover:bg-gray-100 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="I2 Cut-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="I2 Cut"
                        onChange={handleCheckType}
                        checked={type.includes("I2 Cut")}
                      />
                      <label for="I2 Cut-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I2 Cut
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl  hover:bg-gray-100 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="I3-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="I3"
                        onChange={handleCheckType}
                        checked={type.includes("I3")}
                      />
                      <label for="I3-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I3
                      </label>
                    </div>
                  </li>
                  <li class="w-full hover:shadow-xl  hover:bg-gray-100 dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input id="MIX-checkbox-list" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value="MIX"
                        onChange={handleCheckType}
                        checked={type.includes("MIX")}
                      />
                      <label for="MIX-checkbox-list" class="w-full hover:cursor-pointer py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        MIX
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                onClick={handleSubmit}
              >
                Add Diamond
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddDiamonds