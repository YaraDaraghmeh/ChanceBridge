import React from 'react'

const index = () => {
    const userActivites=[{}]
  return (
    <table className="w-full min-w-[540px]">
                <tbody>
                  {userActivites.map(act=>
                        <tr>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">
                            <a
                              href="#"
                              className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                            >
                              Lorem Ipsum
                            </a>
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            02-02-2024
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            17.45
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="dropdown">
                            <button
                              type="button"
                              className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                            >
                              <i className="ri-more-2-fill" />
                            </button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                              <li>
                                <a
                                  href="#"
                                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                >
                                  Profile
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                >
                                  Settings
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                >
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                  )}
              

            
                </tbody>
              </table>  )
}

export default index