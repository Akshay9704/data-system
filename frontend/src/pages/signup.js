import React from 'react';
import axios from 'axios'; // Import Axios
import User from "../assets/user.png";
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { URL } from "../url.js";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [user, setUser] = React.useState({
        fullName: "",
        username: "",
        email: "",
        dob: "",
        password: "",
        rePassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const register = async () => {
        const { fullName, username, email, dob, password, rePassword } = user;
        if (!fullName || !username || !email || !dob || !password || !rePassword || password !== rePassword) {
            return alert("Please fill in all the fields");
        }

        try {
            const response = await axios.post(`${URL}/api/v1/users/register`, user);

            if (!response.data.success) {
                return alert("Registration failed");
            }
            alert("Registered Successfully");
            navigate("/signin");

        } catch (error) {
            console.error('Axios Error:', error);
            alert('Axios Error: ' + error.message);
        }
    };

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='relative flex flex-col items-center'>
                <div className='bg-btnGrey py-3 px-10 flex justify-center items-center -mb-10 z-10'>
                    <h1 className='signin-header text-textGrey font-semibold'>SIGN UP</h1>
                </div>
                <div className="bg-bgColor signin-container rounded-lg px-20 pt-20 pb-7 w-full flex flex-col gap-4 items-center">
                    <img className='w-20' src={User} alt="user" />
                    <div className='flex rounded-lg py-2 px-3 gap-2 items-center bg-inputGrey'>
                        <FaUser className='text-textGrey text-xs' />
                        <div className='border h-4 border-textGrey'></div>
                        <input name="username" value={user.username} onChange={handleChange} className='bg-inputGrey outline-none text-textGrey' type='text' placeholder='Username' />
                    </div>
                    <div className='flex rounded-lg py-2 px-3 gap-2 items-center bg-inputGrey'>
                        <FaUser className='text-textGrey text-xs' />
                        <div className='border h-4 border-textGrey'></div>
                        <input name="fullName" value={user.fullName} onChange={handleChange} className='bg-inputGrey outline-none text-textGrey' type='text' placeholder='Fullname' />
                    </div>
                    <div className='flex rounded-lg py-2 px-3 gap-2 items-center bg-inputGrey'>
                        <MdEmail className='text-textGrey text-xs' />
                        <div className='border h-4 border-textGrey'></div>
                        <input name="email" value={user.email} onChange={handleChange} className='bg-inputGrey outline-none text-textGrey' type='text' placeholder='Email' />
                    </div>
                    <div className='flex rounded-lg py-2 px-3 w-full gap-2 items-center bg-inputGrey'>
                        <MdOutlineDateRange className='text-textGrey text-xs' />
                        <div className='border h-4 border-textGrey'></div>
                        <input name="dob" value={user.dob} onChange={handleChange} className='bg-inputGrey outline-none text-textGrey' type='text' placeholder='Date of Birth' />
                    </div>
                    <div className='flex rounded-lg py-2 px-3 gap-2 items-center bg-inputGrey'>
                        <IoIosLock className='text-textGrey' />
                        <div className='border h-4 border-textGrey'></div>
                        <input name="password" value={user.password} onChange={handleChange} className='bg-inputGrey outline-none text-textGrey' type='password' placeholder='Password' />
                    </div>
                    <div className='flex rounded-lg py-2 px-3 gap-2 items-center bg-inputGrey'>
                        <IoIosLock className='text-textGrey' />
                        <div className='border h-4 border-textGrey'></div>
                        <input name="rePassword" value={user.rePassword} onChange={handleChange} className='bg-inputGrey outline-none text-textGrey' type='password' placeholder='Re-enter Password' />
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-xs text-textGrey'>Already have an account? </p>
                        <p onClick={() => navigate("/")} className='text-xs text-textGrey font-bold hover:underline hover:cursor-pointer'>Login here</p>
                    </div>
                    <button onClick={register} type='submit' className='text-textGrey font-semibold text-md mt-4 bg-btnGrey rounded-md py-2 w-full'>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;
