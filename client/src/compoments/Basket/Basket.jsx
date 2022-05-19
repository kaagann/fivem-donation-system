import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {FaShoppingBasket} from "react-icons/fa"
import Config from '../../utils/Config'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { login } from '../../test/Test';

function Basket() {
    const [basket, setBasket] = useState([]);

    const calcultePrice = () => {
        let total = 0; 
        basket.map((x) => total += x.price)
        return total
    }

    const getBasket = () => {
        axios.get(`${Config.endpoint}basket/`).then((res) => {
            setBasket(res.data)
        }).catch()
    }

    const Buy = () => {
        axios.post(`${Config.endpoint}shop/buy`).then((res) => {
            if (res.statusText == "OK") {
                alert("Satın alım işleminiz başarılı")
                getBasket();
            }
        }).catch();
    }

    const removeFromBasket = async (productId) => {
        try{
            const response = await axios({
                method: 'DELETE',
                url: `${Config.endpoint}basket`,
                data: { productId }
            });
            setBasket(response.data);
        } catch(_) {
            alert("Hata")
        }
    }

    useEffect(() => getBasket(), []);


    return (
        <div className="h-full bg-white flex justify-center items-center p-1 text-black">

            <div className="flex w-1/2">
                <div className="bg-gray-200 w-full p-2 max-h-custom overflow-y-auto shadow-xl">
                    <FaShoppingBasket className="mr-auto ml-auto text-5xl"/>
                    <h6 className="text-center font-bold">Sepetim</h6>
                    <p className="text-center">Sepetinizde {basket.length} ürün var</p>

                    <table className="mr-auto ml-auto w-1/2 text-center p-2 border border-black rounded">
                        <tr className="bg-white p-2 rounded">
                            <th>Ürün</th>
                            <th>Fiyat</th>
                            <th>İşlemler</th>
                        </tr>
                        {basket.map((x) => <Table name={x.name} price={x.price} removeFunction={()=>removeFromBasket(x.id)} />)}
                    </table>
                    <div className="flex justify-center gap-1">
                        <input type="checkbox" className="outline-none"/>
                        <p>Hizmet Koşullarını okudum ve onaylıyorum.</p>
                        
                    </div>
                    <div className="flex justify-center gap-1">
                        <input type="checkbox" className="outline-none"/>
                        <p>İade okudum ve onaylıyorum.</p>
                    </div>

                    <p className="text-red-700 font-bold text-center">Toplam Tutar</p>
                    <p className="text-center">{calcultePrice()} ₺</p>
                    <div onClick={Buy} className="bg-green-500 p-1 text-center hover:bg-green-600 transition cursor-pointer">Satın Al</div>
                </div>
            </div>

        </div>
    )
}

const Table = ({name, price, removeFunction}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{price} ₺ </td>
            <td 
            className="flex items-center justify-center p-0.5">
                <RiDeleteBin5Line 
                onClick={removeFunction}
                className="hover:text-red-500 transition" />
            </td>
        </tr>
    )
}

export default Basket 
