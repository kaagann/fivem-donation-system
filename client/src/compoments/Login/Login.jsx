import React from 'react'
import {AiFillMail} from "react-icons/ai"
import {ImKey} from "react-icons/im"
import axios from "axios";
import {useDispatch} from "react-redux";
import {login} from '../../test/Test';
import { useHistory } from 'react-router';
import { REDIRECT_PATH } from '../../utils/routes';
import Config from "../../utils/Config"

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const loginEvent = () => {
        axios.post(`${Config.endpoint}auth/login`, {
            "username":  document.getElementById("login-username").value,
            "password": document.getElementById("login-password").value,
            "serverId": Config.serverId
        }).then((res) => {
            if (res.statusText == "OK") {
                dispatch(login(res.data))
                console.log(document.getElementById("login-checkbox").checked)
                if (document.getElementById("login-checkbox").checked == true)
                    localStorage.setItem("userData", JSON.stringify(res.data))
                history.push(REDIRECT_PATH.HOME_PAGE)
            }
        }).catch((err) => console.log(err))
    }

    return (
        <div className="h-full bg-gray-100 flex justify-center items-center p-1 text-black overflow-y-hidden">

            <div className="flex w-1/6">
                <div className="bg-white shadow-xl w-full p-4 max-h-custom gap-4 overflow-y-auto ">
                    <p className="text-center font-bold">Giriş Yap</p>

                    <div className="w-full flex flex-col justify-center items-center gap-2 p-2">
                        <div className="bg-gray-100 p-1 flex items-center w-full">
                            <AiFillMail/>
                            <input type="text" className="outline-none bg-transparent  border-none p-1 rounded-sm" placeholder="Kullanıcı Adı" id="login-username"/>
                        </div>
                        <div className="bg-gray-100 p-1 flex items-center w-full">
                            <ImKey/>
                            <input type="password" className="outline-none bg-transparent  border-none p-1 rounded-sm" placeholder="Şifre" id="login-password"/>
                        </div>

                        <div className="flex flex-row justify-between gap-2 w-full">
                            <div className="flex gap-1">
                                <input type="checkbox" id="login-checkbox"/>
                                <p>Beni Hatırla</p>
                            </div>
                            <p className="text-gray-500 cursor-pointer hover:text-gray-600">Parolamı Sıfırla</p>
                        </div>
                        <input type="button" onClick={loginEvent} value="Giriş Yap" className="bg-transparent border border-blue-700 p-2 rounded-xl hover:bg-blue-700 transition text-center w-full cursor-pointer"/>
                        <p className="text-xs hover:text-blue-500 transition cursor-pointer" onClick={() => history.push(REDIRECT_PATH.REGISTER)}>Yeni Bir Hesap Oluştur</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Login
