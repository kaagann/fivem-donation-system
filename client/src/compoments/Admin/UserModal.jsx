import axios from 'axios'
import React from 'react'
import {AiOutlineClose} from "react-icons/ai"
import {RiDeleteBin5Line} from "react-icons/ri"
import Config from '../../utils/Config'
import { REDIRECT_PATH } from '../../utils/routes'
import {useHistory} from "react-router-dom";

function UserModal({onClick, userId}) {
    const [items, setItems] = React.useState([])
    const history = useHistory();

    const saveItem = () => {
        const value = document.getElementById("admin-product-user-newbalance").value
        if (value == undefined || value == "" | value == null) return alert("Lütfen bütün alanları doldurun.")
        axios.post(`${Config.endpoint}server/setbalance`, {
            "userId": userId,
            "newBalance": value
        }).then((res) => {
            if (res.statusText == "OK") {
                alert("Kullanıcı Bakiyesi Değiştirildi");
                onClick()
            }
        }).catch((err) => console.log(err))
    }



    return (
        <div className="flex items-center justify-center w-full h-full bg-transparent">
            <div className="w-2/6 bg-gray-100 border border-gray-300 shadow-xl rounded p-1">
                <div className="flex flex-row justify-between items-center border-b border-gray-300">
                    <p>Kullanıcı Düzenle {userId}</p>
                    <AiOutlineClose onClick={onClick} className="hover:text-red-600 cursor-pointer"/>
                </div>
                <div className="flex flex-col gap-1 p-1">
                    <input className="outline-none p-1" type="text" placeholder="Yeni Bakiye" id="admin-product-user-newbalance"/>


                    <input type ="button" value="Kaydet"  className="outline-none p-1 bg-white hover:bg-gray-50 transition cursor-pointer hover:text-blue-500" onClick={saveItem} />
                </div>
            </div>
        </div>

    )
}

export default UserModal
