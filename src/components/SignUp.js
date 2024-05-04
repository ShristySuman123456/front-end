import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

const Signup =()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [gender,setGender]=useState("");
    const [city,setCity]=useState("");
    const [phone_no,setPhone_No]=useState("");
    const [dob,setDOB]=useState("");
    const [address,setAddress]=useState("");

    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
         if(auth)
         {
            navigate('/')
         }
    },[]);

    const collectData=async ()=>{
        console.warn(name,email,password,gender,city,phone_no,dob,address);
        let result=await fetch('http://localhost:5000/register',{
            method:'post',
            body: JSON.stringify({name,email,password,gender,city,phone_no,dob,address}),
            headers: {
                'content-type':'application/json'
            },
        });
        result= await result.json()
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if(result)
        {
            navigate('/')
        }
    }

    return(
    <div className="register">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr/>
        <form>
        <label><b>Name: </b></label>
        <input className="inputBox" type="text" name="Name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" /><br/>
        <label><b>Email: </b></label>
        <input className="inputBox" type="text" name="Email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/><br/>
        <label><b>Password: </b></label>
        <input className="inputBox" type="Password" name="Password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/><br/>

        <label><b>Gender: </b></label>
        <input className="inputBox" type="radio" name="Gender" onChange={(e)=>setGender(e.target.value)} placeholder="Male"/>Male
        <input className="inputBox" type="radio" name="Gender" onChange={(e)=>setGender(e.target.value)} placeholder="Female"/>Female
        <input className="inputBox" type="radio" name="Gender" onChange={(e)=>setGender(e.target.value)} placeholder="others"/>others<br/>
         
        <label><b>City: </b>
        <select name="city" onChange={(e)=>setCity(e.target.value)} >
        <option value="Kolkata" >Kolkata</option>
        <option value="Patna">Patna</option>
        <option value="Pune">Pune</option>
        <option value="Ranchi">Ranchi</option>
        <option value="Banglore">Banglore</option>
        <option value="Noida">Noida</option>
        </select></label><br/>
        
        <label><b>Phone_No: </b></label>
        <input className="inputBox" type="text" name="Phone_No" onChange={(e)=>setPhone_No(e.target.value)} placeholder="Enter Phone_No"/><br/>
        <label><b>DOB: </b></label>
        <input className="inputBox" type="date" name="DOB" onChange={(e)=>setDOB(e.target.value)} placeholder="Enter DOB"/><br/>
          
        <label><b>Address: </b><br/>
        <textarea name="Address" rows={6} cols={50}  onChange={(e)=>setAddress(e.target.value)}
        defaultValue="Write your Address.."
        /><br/>
        </label>

        <button onClick={collectData} className="appButton" type="button" placeholder="submit">Signup</button>
        <button onClick={collectData} className="appButton" type="button" placeholder="Cancelbtn">Cancel</button>
        </form>
        
    </div>
    )

}
export default Signup;