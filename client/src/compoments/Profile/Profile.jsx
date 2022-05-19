import React, {useEffect, useState} from 'react';
import {MdOutlineAttachMoney} from "react-icons/md";
import { useSelector } from 'react-redux'
import Config, { formatJobs, formatMoney } from '../../utils/Config';
import { TailwindColor } from '../../utils/Tailwindcolor';
import axios from 'axios';

function Profile() {
    const {userData} = useSelector(state => state.user);
    const [profileData, setProfileData] = useState({})
    const [moneyAccounts, setMoneyAccounts] = useState([])
    let color = new TailwindColor().pick();

    useEffect(() => {
        getUserData()
        
    }, [])

    const getUserData = async () => {
        console.log(userData.steam_hex)
        await axios.post(`http://localhost:5000/server/profile`, {
            identifier: `steam:${userData.steam_hex}`
        }).then((res) => {
            console.log(res.data)
            setProfileData(res.data);
            setMoneyAccounts(JSON.parse(res.data.accounts))
        }).catch((_) => {
            console.log(_)
        })
    }

    function getParsedData() {
        return JSON.parse(profileData.accounts)
    }

    

    return (
        <div className="w-full h-full bg-gray-100 p-5">


            
                <div class="max-w-3xl mx-auto">

                    <div class="w-full">
                        <div class={`w-full ${color} h-48 rounded-t-lg`}></div>
                        <div class="absolute -mt-20 ml-5">
                            <img class="bg-gray-200 p-0.5 border border-gray-300 h-36 w-40 rounded-lg shadow-md border-b border-primary" 
                                src="https://media.discordapp.net/attachments/864497166772600872/929287277471998052/screenshot.jpeg">

                            </img>
                        </div>
                    </div>

                    <div class="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
                        <div class="mb-1 h-5 w-40 flex items-center font-semibold text-xl">{profileData.firstname} {profileData.lastname}</div>
                        <div class="mb-1 text-gray-500 h-5 w-96">{formatJobs(profileData.job)}</div>
                        <div class="text-sm mt-2 text-gray-200">
                            <div class="flex flex-row ml-auto space-x-2 items-center text-black">
                                <div class="mb-1  h-5 w-20">Site Bakiyesi</div>
                                <div class="bg-blue-200 rounded-full h-1 w-1"></div>
                                <div class="mb-1 h-5 w-20">{userData.balance}₺</div>
                            </div>
                        </div>

                        <div class="pt-8 flex gap-8">
                            <div class="flex flex-col">
                                <div class="mb-1 flex items-center text-gray-500 h-5 w-20">Nakit Para</div>
                                <div class="mb-1 font-semibold h-5 w-20"> ${formatMoney(moneyAccounts.money)}</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="mb-1 flex items-center text-gray-500 h-5 w-20">Banka</div>
                                <div class="mb-1 font-semibold h-5 w-20"> ${formatMoney(moneyAccounts.bank)}</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="mb-1 flex items-center text-gray-500 h-5 w-20">Telefon</div>
                                <div class="mb-1 font-semibold h-5 w-20">{profileData.phone}</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="mb-1 flex items-center text-gray-500 h-5 w-20">Bakiye</div>
                                <div class="mb-1 font-semibold h-5 w-20">{formatMoney(userData.balance)}₺</div>
                            </div>
                        </div>
                        <div class="py-5 break-all bbcode">
                            <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-44"></div>
                            <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-full"></div>
                        </div>
                    </div>
                </div>
        
        </div>
    )
}

export default Profile
