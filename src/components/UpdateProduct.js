import React, { useEffect } from "react";
import {useParams,useNavigate} from 'react-router-dom' // hook

const UpdateProduct=()=>{
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [Category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const params=useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductsDetails();
    },[])

    const getProductsDetails = async()=>{
        console.warn(params)
        let result=await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.Category);
        setCompany(result.company)
    }
   
    const updateProduct= async ()=>{
       console.warn(name,price,Category,company)
       let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, Category, company }),
            headers: {
                'Content-Type': 'Application/json',
                 authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }
        
    }

    return(
        <div className="product">
            <h1>Update Product</h1>
            <label><b>Product Name</b></label><br/>
            <input className="inputBox" type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter Product name" /><br/>

            <label><b>Price</b></label><br/>
            <input className="inputBox" type="text" onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Price" /><br/>

            <label><b>Category</b></label><br/>
            <input className="inputBox" type="text" onChange={(e)=>setCategory(e.target.value)} placeholder="Enter Category" /><br/>

            <label><b>Company</b></label><br/>
            <input className="inputBox" type="text" onChange={(e)=>setCompany(e.target.value)} placeholder="Enter Company" /><br/>

            <button onClick={updateProduct} className="appButton">Update Product</button>
        </div>
    )
}

export default UpdateProduct;