import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleSignUp, signUp } from "./context/AuthService";
import PopUp from "./components/PopUp";
import axios from 'axios';


const SignUp = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState('farmer');
    const [popUp, setPopUp] = useState({ isVisible: false, message: '' });

    const navigate = useNavigate();

    const showPopUp = (message) => {
        setPopUp({ isVisible: true, message });
        setTimeout(() => {
            setPopUp({ isVisible: false, message: '' }); 
        }, 5000);
    };
    const apiUrl = process.env.REACT_APP_API_URL;


    const handleSignUp = async () => {
        try {
            const user = await signUp(email, password, username);
            showPopUp("Please check your email to verify your account.");

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': 'tabstyle=raw-tab; csrftoken=TRab5aRRMwIX05NUtqw1imZryuMe0qyt; sessionid=1miniz06s3tydwnjq00z3hot6vxcilgd'
                }
            };

            const response = await axios.post(`${apiUrl}/register/`, {
                username: username,
                email: email,
                password: password,
            }, config);

            console.log("Response:", response);
            console.log("Response:", response.data);
            const userId = response.data.id;
            const designation = userType === 'farmer' ? 'F' : 'L';

            navigate("/login");
        } catch (error) {
            console.error("Error during sign up or API calls:", error.message);
        }
    };


    return (

        <div class="bg-gray-100 flex justify-center items-center h-screen">
            <div class="w-1/2 h-screen hidden lg:block">
                <img src="/img/login.jpg" alt="Placeholder Image" class="object-cover w-full h-full" />
            </div>
            <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 class="text-2xl font-semibold mb-4">Register</h1>
                <form action="#" method="POST">
                    <div class="mb-4">
                        <label for="username" class="block text-gray-600">Username</label>
                        <input type="username"
                            name="username"
                            placeholder="Username"
                            required onChange={(e) => setUsername(e.target.value)} class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-gray-600">Email</label>
                        <input type="email"
                            name="email"
                            placeholder="Email"
                            required onChange={(e) => setEmail(e.target.value)} class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-gray-600">Password</label>
                        <input type="password"
                            name="password"
                            placeholder="Password"
                            required onChange={(e) => setPassword(e.target.value)} class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                    </div>
                    <div class="mb-4">
                        <span class="block text-gray-600 mb-2">I am a:</span>
                        <label for="farmer" class="inline-flex items-center mr-6">
                            <input onChange={(e) => setUserType(e.target.value)} type="radio" id="farmer" name="userType" value="farmer" class="text-blue-500" />
                            <span class="ml-2 text-gray-600">Farmer</span>
                        </label>
                        <label for="landowner" class="inline-flex items-center">
                            <input onChange={(e) => setUserType(e.target.value)} type="radio" id="landowner" name="userType" value="landowner" class="text-blue-500" />
                            <span class="ml-2 text-gray-600">Landowner</span>
                        </label>
                    </div>
                    <div class="mb-4 flex items-center">
                        <input type="checkbox" id="remember" name="remember" class="text-blue-500" />
                        <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
                    </div>
                    <div class="mb-6 text-blue-500">
                        <a href="#" class="hover:underline">Forgot Password?</a>
                    </div>
                    <button onClick={handleSignUp} type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">SignUp</button>
                </form>
                <div class="mt-6 text-blue-500 text-center">
                    <a href="#" onClick={() => { navigate("/login") }} class="hover:underline">Login Here</a>
                </div>
                <div class="mt-6 text-blue-500 text-center">
                    <a href="#" onClick={() => { navigate("/") }} class="hover:underline">Back to Home</a>
                </div>
            </div>
            < PopUp isVisible={popUp.isVisible} message={popUp.message} onClose={() => setPopUp({ isVisible: false, message: '' })} />
        </div>
    );
};


export default SignUp