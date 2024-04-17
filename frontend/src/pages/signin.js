import React from 'react';
import User from "../assets/user.png";
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useContext } from 'react';
import axios from 'axios';
import UserContext from "../context/userContext.js";
import { URL } from "../url.js";

const Signin = () => {
    const { user, setUser } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL}/api/v1/users/login`, {
                username: user.username,
                password: user.password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });

            if (response.status !== 200) {
                return alert("Invalid username or password");
            }

            const jsonData = response.data;

            alert("Logged in Successfully");
            localStorage.setItem("token", jsonData.data.refreshToken);
            localStorage.setItem("username", jsonData.data.user.fullName);
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while logging in");
        }
    };


    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='relative flex flex-col items-center'>
                <div className='bg-btnGrey py-3 px-10 flex justify-center items-center -mb-10 z-10'>
                    <h1 className='signin-header text-textGrey font-semibold'>SIGN IN</h1>
                </div>
                <div className="bg-bgColor signin-container rounded-lg px-20 pt-20 pb-7 w-full flex flex-col gap-4 items-center">
                    <img className='w-20' src={User} alt="user" />
                    <div className='flex rounded-lg py-2 px-3 gap-2 items-center bg-inputGrey'>
                        <FaUser className='text-textGrey text-xs' />
                        <div className='border h-4 border-textGrey'></div>
                        <input name="username" value={user.username} onChange={handleChange} className='bg-inputGrey outline-none text-textGrey' type='text' placeholder='Username' />
                    </div>
                    <div className='flex rounded-lg py-2 px-3 gap-2 items-center bg-inputGrey'>
                        <IoIosLock className='text-textGrey' />
                        <div className='border h-4 border-textGrey'></div>
                        <input name="password" value={user.password} onChange={handleChange} className='bg-inputGrey outline-none text-textGrey' type='password' placeholder='Password' />
                    </div>
                    <div className='flex gap-6'>
                        <div className='flex gap-1'>
                            <input type='checkbox' defaultChecked className='bg-inputGrey text-textGrey' />
                            <p className='text-textGrey text-xs'>Remember me</p>
                        </div>
                        <div>
                            <p className='hover:cursor-pointer hover:underline text-textGrey text-xs'>Forgot your Password?</p>
                        </div>
                    </div>
                    <button onClick={login} className='text-textGrey font-semibold text-md mt-4 bg-btnGrey rounded-md py-2 w-full'>LOGIN</button>
                </div>
            </div>
        </div>
    );
};

export default Signin;
