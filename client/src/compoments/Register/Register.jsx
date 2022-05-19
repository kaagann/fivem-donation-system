import React from 'react'
import {AiFillMail} from "react-icons/ai"
import {ImKey} from "react-icons/im"
import axios from "axios";
import {login} from '../../test/Test';
import { useHistory } from 'react-router';
import { REDIRECT_PATH } from '../../utils/routes';
import Config from "../../utils/Config"
import { FaDiscord, FaSteam } from 'react-icons/fa';


function Register() {
    const history = useHistory();
    const registerEvent = () => {
        axios.post(`${Config.endpoint}auth/register`, {
            "username": document.getElementById("register-username").value,
            "password": document.getElementById("register-password").value,
            "email": document.getElementById("register-email").value,
            "steam_hex":document.getElementById("register-steamHex").value,
            "discordId":document.getElementById("register-discordId").value,
            "serverId": Config.serverId
        }).then((res) => {
            if (res.statusText == "OK") {
                history.push(REDIRECT_PATH.LOGIN)
            }
        }).catch((err) => console.log(err))

    }

    return (
		<div className="h-full bg-gray-100 flex justify-center items-center p-1 text-black">
			<div className="flex w-1/6">
				<div className="bg-white shadow-xl w-full p-4 max-h-custom gap-4 overflow-y-auto ">
					<p className="text-center font-bold">Kayıt Ol</p>

					<div className="w-full flex flex-col justify-center items-center gap-2 p-2">
						<div className="bg-gray-100 p-1 flex items-center w-full">
							<AiFillMail />
							<input
								type="text"
								className="outline-none bg-transparent  border-none p-1 rounded-sm"
								placeholder="Kullanıcı Adı"
                                id="register-username"
							/>
						</div>
                        <div className="bg-gray-100 p-1 flex items-center w-full">
							<AiFillMail />
							<input
								type="text"
								className="outline-none bg-transparent  border-none p-1 rounded-sm"
								placeholder="E-Mail"
                                id="register-email"
							/>
						</div>
						<div className="bg-gray-100 p-1 flex items-center w-full">
							<ImKey />
							<input
								type="password"
								className="outline-none bg-transparent  border-none p-1 rounded-sm"
								placeholder="Şifre"
                                id="register-password"
                                
							/>
						</div>

						<div className="bg-gray-100 p-1 flex items-center w-full">
							<FaDiscord />
							<input
								type="text"
								className="outline-none bg-transparent  border-none p-1 rounded-sm"
								placeholder="Discord ID"
                                id="register-discordId"
							/>
						</div>
						
						<div className="bg-gray-100 p-1 flex items-center w-full">
							<FaSteam />
							<input
								type="text"
								className="outline-none bg-transparent  border-none p-1 rounded-sm"
								placeholder="Steam HEX"
                                id="register-steamHex"
							/>
						</div>

						<input
							type="button"
							value="Kayıt Ol"
                            onClick={registerEvent}
							className="bg-transparent border border-blue-700 p-2 rounded-xl hover:bg-blue-700 transition text-center w-full cursor-pointer"
						/>
						<p
							className="text-xs hover:text-blue-500 transition cursor-pointer"
							onClick={() => history.push(REDIRECT_PATH.LOGIN)}
						>
							Zaten bir hesabın var mı ?
						</p>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Register
