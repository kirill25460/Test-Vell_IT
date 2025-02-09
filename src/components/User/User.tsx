// import { useState } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { RootState } from "../../redux/store";
import {logout} from '../../redux/auth/authSlice'
import avatar from '../../assets/avatar.png'
function User() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = () => {
 dispatch(logout());

  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
 
<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
    <button className="cursor-pointer" onClick={handleLogout}><MdLogout /></button>
       
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar} alt="avatar image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Username:{user?.username}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Id:{user?.id}</span>
      
    </div>
</div>

   </div>
  )}

export default User
