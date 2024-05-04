import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Login= ()=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword]=React.useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth)
        {
            navigate("/")
        }
    })
    const handleLogin=async ()=>{
        console.warn(email,password);
        let result=await fetch('http://localhost:5000/login',
        {method:'post',
        body:JSON.stringify({email,password}),
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    result =await result.json();
    console.warn(result)
    if(result.auth){
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate("/")
    }else
    {
        alert("please enter correct details")
    }

    }

    return(
        <div className="Login">
            <h1>Login</h1>

        <label><b>Email  </b></label><br/>
            <input className="inputBox" type="text" name="Email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" /><br/>
       
        <label><b>Password  </b></label><br/>
            <input className="inputBox" type="Password" name="Password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" /><br/>

        <button onClick={handleLogin} className="appButton" type="button" placeholder="login">Login</button>
        <button onClick={handleLogin} className="appButton" type="button" placeholder="Signup">SignUp</button>
        </div>
    )
}

export default Login