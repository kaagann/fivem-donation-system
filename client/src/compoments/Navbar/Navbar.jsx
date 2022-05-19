import React, { useState } from 'react'
import { useHistory } from "react-router"
import { REDIRECT_PATH } from '../../utils/routes';
import {MdPerson} from "react-icons/md"
import {RiArrowDropDownFill} from "react-icons/ri"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';
import UserDropDown from './UserDropDown';
import Config from '../../utils/Config';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {userData}  = useSelector(state => state.user);
    const [serverData, setServerData] = useState();
    
    return (
        <div className="w-full flex justify-between bg-white dark:bg-gray-800 text-black items-center  gap-4 p-2 shadow-2xl z-50">
            <div className="flex flex-row items-center cursor-pointer" onClick={() => history.push(REDIRECT_PATH.HOME_PAGE)}>
                <img className="w-16 h-16 cursor-pointer rounded p-2 m-1" src=""/>
                {/* <p>New World</p> */}
            </div>
            
            <div className="flex flex-row gap-2 p-1 text-xl items-center">

            </div>

            <div className="flex flex-row items-center p-1 gap-2">
                <a className="inline-flex justify-center  rounded-md border cursor-pointer border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 outline-none">
                    İletişim
                </a>

                <YasalDropDown/>

                {!userData ? 
                  <div onClick={() => history.push(REDIRECT_PATH.LOGIN)} className="inline-flex justify-center items-center gap-1  rounded-md border cursor-pointer border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 outline-none">
                    <MdPerson/> 
                    <p>Müşteri Paneli </p>
                  </div> :  <UserDropDown/>
                }
            </div>
        </div>
    )
}

const YasalDropDown = () => {
    const history = useHistory();
    return (
      <Menu as="div" className="relative inline-block text-left z-50">
        <div>
          <Menu.Button className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm cursor-pointer font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 outline-none">
            Kurumsal
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
                {({ active }) => (
                  <a
                  onClick={() => history.push(`${REDIRECT_PATH.RULES}?type=hizmet`)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Hizmet ve Kullanım Sözleşmesi
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                  onClick={() => history.push(`${REDIRECT_PATH.RULES}?type=gizlilik`)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Gizlilik Sözleşmesi
                  </a>
                )}
              </Menu.Item>
              
              <Menu.Item>
                {({ active }) => (
                  <a
                  onClick={() => history.push(`${REDIRECT_PATH.RULES}?type=iade`)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    İade Politikası
                  </a>
                )}
              </Menu.Item>  
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
}



export default Navbar
