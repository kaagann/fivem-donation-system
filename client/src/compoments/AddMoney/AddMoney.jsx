import axios from 'axios'
import React from 'react'

function AddMoney() {
    const sendData = () => {
        axios.post("http://localhost/payment.php", {
            first_name: document.getElementById("cus_name").value,
            last_name: document.getElementById("cus_surname").value,
            email: document.getElementById("cus_email").value,
            phone_number: document.getElementById("cus_phone").value,
            address: document.getElementById("cus_addres").value,
            country: document.getElementById("cus_ulke").value,
            city: document.getElementById("cus_sehir").value,
            zip_code: document.getElementById("zip_code").value,
            amount: document.getElementById("miktar").value
        }).then((res) => console.log(res)).catch((err) => console.log(err))
    }

    return (
        <div className="leading-loose w-full h-full justify-center flex items-center">
            <div className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
                <p className="text-gray-800 font-medium">Ödeme</p>
                <div className="flex flex-row gap-4">
                    <div className="block">
                        <label className="block text-sm text-gray-00" for="cus_name">Ad</label>
                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Kağan" aria-label="Name"/>
                    </div>
                

                    <div className="block">
                        <label className="block text-sm text-gray-00" for="cus_surname">Soyad</label>
                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_surname" name="cus_surname" type="text" required="" placeholder="Cengiz"/>
                    </div>
                </div>

                <div className="mt-2">
                    <label className="block text-sm text-gray-600" for="cus_email">E-Posta Adresi</label>
                    <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="example@domain.com" />
                </div>
                <div className="mt-2">
                    <label className=" block text-sm text-gray-600" for="cus_phone">Telefon Numarası</label>
                    <input className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded" id="cus_phone" name="cus_phone" type="text" required="" placeholder="+90 544 967 6565" />
                </div>
                <div className="mt-2">
                    <label className=" block text-sm text-gray-600" for="cus_addres">Addres</label>
                    <input className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded" id="cus_addres" name="cus_addres" type="text" required="" placeholder="Esentepe Mah. Eski Büyükdere Cad., Tekfen Tower No:209" />
                </div>
                <div className="flex flex-row gap-2"> 
                    <div className="mt-2">
                        <label className="text-sm block text-gray-600" for="cus_sehir">Şehir</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded" id="cus_sehir" name="cus_sehir" type="text" required="" placeholder="İstanbul" />
                    </div>
                    <div className="inline-block mt-2 w-1/2 pr-1">
                        <label className=" block text-sm text-gray-600" for="cus_ulke">Ülke</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded" id="cus_ulke" name="cus_ulke" type="text" required="" placeholder="Türkiye" />
                    </div>
                    <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                        <label className=" block text-sm text-gray-600" for="zip_code">Posta Kodu</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded" id="zip_code"  name="zip_code" type="text" required="" placeholder="3400" />
                    </div>
                </div>

                <div className="mt-2">
                    <label className=" block text-sm text-gray-600" for="miktar">Ödeme Miktarı</label>
                    <input className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded" id="miktar" name="miktar" type="number" required="" placeholder="58" />
                </div>

                <div className="w-full mt-2 mb-2 border border-gray-500 "/>

                <button type="submit" class="bg-blue-500 text-white p-1 mt-2 w-full hover:bg-blue-700 transition" onClick={sendData}>Ödeme Yap</button>
            </div>
        </div>
    )
}

export default AddMoney
