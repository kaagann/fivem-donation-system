import React, { useEffect } from 'react'
import Product from '../Product/Product'
import {useState} from "react"
import axios from "axios";
import Config from '../../utils/Config';
import moment from "moment";
import Landing from "./Landing";

function Main() {
    const [products, setProducts] = useState([]);
	const getProducts = () => axios.get(`${Config.endpoint}product/`).then((res) => setProducts(res.data)).catch((err) => console.log(err))

    React.useEffect(() => {
		getProducts();
	}, [])

    return (
        <div className="p-1 text-black">
            <Landing/>


            <section class="bg-gray-50">
                <div class="max-w-5xl px-6 py-16 mx-auto">
                    <div class="items-center md:flex md:space-x-6">
                        <div class="md:w-1/2">
                            <h3 class="text-2xl font-semibold text-gray-800">ÖZGÜRLÜKLER ŞEHRİ  <br/> LOS SANTOS</h3>
                            <p class="max-w-md mt-4 text-gray-600">
                                İllegal Dünya ile işin yok mu ? O halde Earth'ın ışıltılı gece kulüpleri, lüks motelleri, gemi turları, büyük legal yarışlar ve yüzlerce etkinlik seni bekliyor. Bu şehirde yeni arkadaşlar edinebilir hatta yeni aşklara yelken açabilirsin. Kaderin ipleri senin elinde. Şehire adım at hayatını yaşa!    
                            </p>
                        </div>
            
                        <div class="mt-8 md:mt-0 md:w-1/2">
                            <div class="flex items-center justify-center">
                                <div class="max-w-md">
                                    <img class="object-cover object-center w-full rounded-md shadow" style={{height: "500px"}}
                                        src="https://media.discordapp.net/attachments/952483010689773569/952486559133859890/1080x1920r.png?width=377&height=670"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-gray-50">
                <div class="max-w-5xl px-6 py-16 mx-auto">
                    <div class="items-center md:flex md:space-x-6">
                        <div class="md:w-1/2">
                            <div class="flex items-center justify-center">
                                <div class="max-w-md">
                                    <img class="object-cover object-center w-full rounded-md shadow" style={{height: "500px"}}
                                        src="https://media.discordapp.net/attachments/952483010689773569/952487132998557716/bg-6.jpg?width=1073&height=670"/>
                                </div>
                            </div>
                        </div>
            
                        <div class="mt-8 md:mt-0 md:w-1/2">
                            <h3 class="text-2xl font-semibold text-gray-800">SUÇ DÜNYASI'NIN <br/>KARANLIK YÜZÜ </h3>
                            <p class="max-w-md mt-4 text-gray-600">
                                Earth'ın yeraltı dünyası çok tehlikeli! Görkemli ve zengin suç aileleri, tehlikeli ve tekinsiz çeteler, heybetli motor klüpleri ve fazlası seni bekliyor. Dilersen herhangi bir oluşuma katılıp bu suç dünyasına adım atabilir veya kendi oluşumunu kurarak adını herkese duyurabilirsin!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
    

            <div className="p-2 max-h-custom gap-4 overflow-y-auto text-black w-full">
                <p className="font-bold text-center">Market</p>
                <p className="text-center text-xs text-gray-500">Sunucumuzun marketine hoşgeldiniz! Alacağınız ürünler eş zamanlı olarak oyuna yansımaktadır, keyifli alışverişler dileriz.</p>
                <div className="grid grid-cols-5 w-full gap-2">
                    {products.length == 0 ? "" : products.map((x) => 
                        <Product 
                            name={x.name} 
                            price={x.price} 
                            img={x.photo} 
                            desc={x.description} 
                            productId={x.id}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default Main 
