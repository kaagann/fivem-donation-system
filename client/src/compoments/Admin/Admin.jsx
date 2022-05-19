import React from 'react';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai';
import { MdAttachMoney } from 'react-icons/md';
import { BsPencil, BsPlus } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddModal from './AddModal';
import UserModal from './UserModal';
import axios from "axios";
import { useSelector } from 'react-redux'
import Config from '../../utils/Config';
import { Redirect } from 'react-router';
import { REDIRECT_PATH } from '../../utils/routes';
import { useState } from 'react';

function Admin() {
	const [modal, setModal] = React.useState(false);
	const [edituser, setEditUser] = React.useState(false);
	const {userData} = useSelector(state => state.user);
	const [users, setUsers] = React.useState([])
	const [products, setProducts] = React.useState([])
	const [currentUserId, setCurrentUserId] = useState("");


	const addProduct = () => setModal(!modal)
	const getUsers = () => axios.get(`${Config.endpoint}server/users`).then((res) => setUsers(res.data)).catch((err) => console.log(err))
	const getProducts = () => axios.get(`${Config.endpoint}product/`).then((res) => setProducts(res.data)).catch((err) => console.log(err))
	const closeUserModal = () => setEditUser(!edituser)

	React.useEffect(() => {
		getUsers()
		getProducts();
	}, [])

	return (
		!userData.isAdmin ? <Redirect to={REDIRECT_PATH.HOME_PAGE}/> : (
			<div className="w-full h-full bg-gray-100">
				{modal ? <AddModal onClick={addProduct}/> : ""}
				{edituser ? <UserModal onClick={closeUserModal} userId={currentUserId}/> : ""}
	
				<div className="grid grid-cols-2 w-full p-2">
					<div className="p-4 transition-shadow border rounded shadow-sm hover:shadow-lg m-2 bg-white text-black">
						<div className="flex items-start justify-between">
							<div className="flex flex-col space-y-2">
								<span className="text-gray-400">Toplam Ürün</span>
								<span className="text-lg font-semibold">
									{products.length}
								</span>
							</div>
							<div className="p-5 bg-blue-500 rounded-md flex items-center text-2xl text-white">
								<AiOutlineShopping></AiOutlineShopping>
							</div>
						</div>
					</div>
	
					<div className="p-4 transition-shadow border rounded shadow-sm hover:shadow-lg m-2 bg-white text-black">
						<div className="flex items-start justify-between">
							<div className="flex flex-col space-y-2">
								<span className="text-gray-400">
									Toplam Kullanıcı
								</span>
								<span className="text-lg font-semibold">{users.length}</span>
							</div>
							<div className="p-5 bg-yellow-500 rounded-md flex items-center text-2xl text-white">
								<AiOutlineUser></AiOutlineUser>
							</div>
						</div>
					</div>
	
					{/* <div className="p-4 transition-shadow border rounded shadow-sm hover:shadow-lg m-2 bg-white text-black">
						<div className="flex items-start justify-between">
							<div className="flex flex-col space-y-2">
								<span className="text-gray-400">
									Bu Ay ki Kazanç
								</span>
								<span className="text-lg font-semibold">150₺</span>
							</div>
							<div className="p-5 bg-purple-500 rounded-md flex items-center text-2xl text-white">
								<MdAttachMoney></MdAttachMoney>
							</div>
						</div>
					</div>
	
					<div className="p-4 transition-shadow border rounded shadow-sm hover:shadow-lg m-2 bg-white text-black">
						<div className="flex items-start justify-between">
							<div className="flex flex-col space-y-2">
								<span className="text-gray-400">Toplam Kazanç</span>
								<span className="text-lg font-semibold">1500₺</span>
							</div>
							<div className="p-5 bg-green-500 rounded-md flex items-center text-2xl text-white">
								<MdAttachMoney></MdAttachMoney>
							</div>
						</div>
					</div> */}
				</div>
	
				<div className="w-full grid grid-cols-4 p-2">
					<div className="bg-gray-200 col-span-2 p-4 m-2 rounded text-black">
						<div className="w-full flex flex-row justify-between items-center text-xl">
							<p>Ürünler</p>
							<BsPlus className="hover:text-purple-600 cursor-pointer" onClick={addProduct}/>
						</div>
						<div className="bg-white shadow-md rounded my-6">
							<table className="min-w-max w-full table-auto">
								<thead>
									<tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-none">
										<th className="py-3 px-6 text-left">#ID</th>
										<th className="py-3 px-6 text-left">Ad</th>
										<th className="py-3 px-6 text-left">
											Fotoğraf
										</th>
										<th className="py-3 px-6 text-left">
											Eşyalar
										</th>
										<th className="py-3 px-6 text-left">
											Fiyat
										</th>
										<th className="py-3 px-6 text-left">
											Düzenle
										</th>
									</tr>
								</thead>
								<tbody>
									{products.map(x => (
										<Table data={x} />
									))}
								</tbody>
							</table>
						</div>
					</div>
	
					<div className="bg-gray-200 col-span-2 p-4 m-2 rounded text-black">
						<div className="w-full flex flex-row justify-between items-center text-xl">
							<p>Kullanıcılar</p>
							<BsPlus className="hover:text-purple-600 cursor-pointer" />
						</div>
						<div className="bg-white shadow-md rounded my-6 overflow-y-auto">
							<table className="min-w-max w-full table-auto">
								<thead>
									<tr className="bg-gray-300 text-gray-600 text-sm leading-none">
										<th className="py-3 px-6 text-left">
											Kullanıcı Adı
										</th>
										<th className="py-3 px-6 text-left">
											EMAIL
										</th>
										<th className="py-3 px-6 text-left">
											Bakiye
										</th>
										<th className="py-3 px-6 text-left">
											Steam HEX
										</th>
										<th className="py-3 px-6 text-left">
											Discord ID
										</th>
										<th className="py-3 px-6 text-left">
											Düzenle
										</th>
									</tr>
								</thead>
								<tbody>								
									{users.map(x => (
										<UserTable data={x} setCurrentUserId={setCurrentUserId} closeUserModal={closeUserModal} />
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
	
			</div>
		)
	);
}



const Table = ({ data }) => {
	
    const deleteProducts = async (productId) => {
        try{
            const response = await axios({
                method: 'DELETE',
                url: `${Config.endpoint}product`,
                data: { productId }
            });
        } catch(_) {
            alert("Hata")
        }
    }

	return (
		<tr className="border-b border-gray-200 hover:bg-gray-100">
			<td className="py-3 px-6 text-left whitespace-nowrap">
				<div className="flex items-center">
					<span className="font-medium">#{data.id}</span>
				</div>
			</td>
			<td className="py-3 px-6 text-left">
				<div className="flex items-center">
					<span>{data.name}</span>
				</div>
			</td>
			<td className="py-3 px-6 text-center">
				<div className="flex items-center justify-center">
					<img
						className="w-10 h-10 rounded border-gray-200 border transform hover:scale-125"
						src={data.photo}
					/>
				</div>
			</td>
			<td className="py-3 px-6 text-center">
				{JSON.parse(data.items).map((item) => 
					<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs ml-1 mr-1">
						{item.id} {item.quantity}x
					</span>
				)}
			</td>
			<td className="py-3 px-6 text-center">
				<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
					{data.price}₺
				</span>
			</td>

			<td className="py-3 px-6 text-center">
				<div className="flex item-center justify-center">
					{/* <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
						<BsPencil />
					</div> */}
					<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
						<RiDeleteBin5Line onClick={() => deleteProducts(data.id)} />
					</div>
				</div>
			</td>
		</tr>
	);
};

const UserTable = ({ data, setCurrentUserId, closeUserModal }) => {
	return (
		<tr className="border-b border-gray-200 hover:bg-gray-100">
			<td className="py-3 px-6 text-left">
				<div className="flex items-center">
					<span>{data.username}</span>
				</div>
			</td>
			<td className="py-3 px-6 text-center">
				<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
					{data.email}
				</span>
			</td>
			<td className="py-3 px-6 text-center">
				<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
					{data.balance}₺
				</span>
			</td>
			<td className="py-3 px-6 text-center">
				<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
					{data.steam_hex}
				</span>
			</td>
			<td className="py-3 px-6 text-center">
				<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
					{data.discordId}
				</span>
			</td>
			<td className="py-3 px-6 text-center">
				<div className="flex item-center justify-center">
					<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={() => {setCurrentUserId(data.id); closeUserModal()}}>
						<BsPencil />
					</div>
					<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
						<RiDeleteBin5Line />
					</div>
				</div>
			</td>

		</tr>
	);
};



export default Admin;
