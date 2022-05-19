import axios from 'axios'
import React from 'react'
import {AiOutlineClose} from "react-icons/ai"
import {RiDeleteBin5Line} from "react-icons/ri"
import Config from '../../utils/Config'
import { REDIRECT_PATH } from '../../utils/routes'
import {useHistory} from "react-router-dom";

function AddModal({onClick}) {
    const [items, setItems] = React.useState([])
    const history = useHistory();

    const pushItems = () => {
        if (document.getElementById("admin-product-item").value == "" || document.getElementById("admin-product-count").value == "") return alert("Boş değer bırakamazsın!!!");
        setItems([...items, {
            id: document.getElementById("admin-product-item").value,
            quantity: document.getElementById("admin-product-count").value
        }])
        document.getElementById("admin-product-item").value = ""
        document.getElementById("admin-product-count").value = ""
    }

    const saveItem = () => {
        axios.post(`${Config.endpoint}product/`, {
            "name": document.getElementById("admin-product-name").value,
            "description": document.getElementById("admin-product-desc").value,
            "price": parseInt(document.getElementById("admin-product-price").value),
            "photo": document.getElementById("admin-product-img").value,
            "items": JSON.stringify(items),
            "serverId": Config.serverId
        }).then((res) => {
            if (res.statusText == "OK") {
                alert("Ürün Eklendi");
                history.push(REDIRECT_PATH.ADMIN)
            }
        }).catch((err) => console.log(err))
    }



    return (
        <div className="flex items-center justify-center w-full h-full bg-transparent">
            <div className="w-2/6 bg-gray-100 border border-gray-300 shadow-xl rounded p-1">
                <div className="flex flex-row justify-between items-center border-b border-gray-300">
                    <p>Ürün Ekle</p>
                    <AiOutlineClose onClick={onClick} className="hover:text-red-600 cursor-pointer"/>
                </div>
                <div className="flex flex-col gap-1 p-1">
                    <input className="outline-none p-1" type="text" placeholder="Ad" id="admin-product-name"/>
                    <input className="outline-none p-1" type="text" placeholder="Fotoğraf" id="admin-product-img"/>
                    <input className="outline-none p-1" type="text" placeholder="Açıklama" id="admin-product-desc"/>
                    <div className="grid grid-cols-3 gap-1">
                        <input className="outline-none p-1" type="text" placeholder="Item"  id="admin-product-item"/>
                        <input className="outline-none p-1" type="text" placeholder="Miktar"  id="admin-product-count"/>
                        <input type="button" className="outline-none p-1 bg-white hover:bg-gray-50 transition cursor-pointer hover:text-blue-500" onClick={pushItems} value="Ekle"/>
                    </div>
                    
                        <div className="grid grid-cols-4 gap-2">
                            {items.map((x) =>
                                <div className="border border-blue-600 p-1 rounded flex flex-row justify-between items-center">
                                    <p>{x.id}  {x.quantity}x</p>
                                    <RiDeleteBin5Line className="hover:text-red-600 transition" />
                                </div>
                            )}
                        </div>


                    <input className="outline-none p-1" type="text" placeholder="Fiyat" id="admin-product-price"/>
                    <input type ="button" value="Kaydet"  className="outline-none p-1 bg-white hover:bg-gray-50 transition cursor-pointer hover:text-blue-500" onClick={saveItem} />
                </div>
            </div>
        </div>

    )
}

export default AddModal
