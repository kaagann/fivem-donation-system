import axios from 'axios'
import React from 'react'
import Config, { formatMoney } from "../../utils/Config"

function Product({name, price, img, desc, productId}) {
    const addBasket = () => {
        axios.post(`${Config.endpoint}basket/`, {
            "productId": productId
        }).then((res) => {
            alert("Ürün sepetinize eklendi")
        }).catch((err) =>
            alert("Ürün sepete eklenirken bir hata meydana geldi lütfen daha sonra tekrar deneyin")
        )
    }  
    return (
        <div className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
                <img
                  src={img}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm text-gray-700 flex gap-1 items-center">
                    <a className='font-bold buyuk'>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {name}
                    </a>
                    <p className="text-sm font-medium text-gray-900">{formatMoney(price)}₺</p>
                  </h3>
                </div>
                <div onClick={addBasket} className='bg-indigo-600 text-white p-1 rounded hover:bg-indigo-700 z-10 cursor-pointer'>Ekle</div>
              </div>
        </div>    
    )
}

export default Product 
