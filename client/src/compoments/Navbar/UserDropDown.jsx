import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import {RiArrowDropDownFill} from "react-icons/ri"
import { Fragment } from 'react'
import { logout } from '../../test/Test'
import {useHistory} from "react-router-dom";
import { REDIRECT_PATH } from '../../utils/routes'
import axios from 'axios'
import Config from '../../utils/Config'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function UserDropDown() {
    const {userData} = useSelector(state => state.user);
    const dispatch = useDispatch()
    const history = useHistory();
    return (
        <Menu as="div" className="relative inline-block text-left z-50">
        <div>
          <Menu.Button className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm cursor-pointer font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 outline-none">
            {userData.username}
            <RiArrowDropDownFill className="-mr-4 ml-2 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>
  
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">

              <Menu.Item>
                    <a className={classNames(
                      'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}>Bakiye: {userData.balance}₺</a>
              </Menu.Item>
              {/* <Menu.Item></Menu.Item> */}
              
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href="http://195.85.205.148//payment/odeme.php"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Bakiye Ekle
                  </a>
                )}
              </Menu.Item> */}

              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => history.push(REDIRECT_PATH.BASKET)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Sepetim
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => history.push(REDIRECT_PATH.PROFILE)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Profil
                  </a>
                )}
              </Menu.Item>
              

              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => {
                      axios.post(`${Config.endpoint}auth/logout`).then((res) => {
                        if (res.data == "OK")  {
                          dispatch(logout())
                        } else {
                          alert("çıkış yapılırken bir hata meydana geldi cano")
                        }
                      })
                    } }
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Çıkış Yap
                  </a>
                )}
              </Menu.Item>

              {
                userData.isAdmin ?
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => history.push(REDIRECT_PATH.ADMIN)}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Admin Paneli
                      </a>
                    )}
                </Menu.Item>
                : ""
              }
              
            
              
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
}

export default UserDropDown
