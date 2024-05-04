import React from "react";

const AddProduct=()=>{
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [Category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const [error,setError]=React.useState(false)
    const addProduct=async ()=>{
        if(!name ||!price || !Category || !company)
        {
            setError(true);
            return false
        }

        //fetching API
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result=await fetch("http://localhost:5000/add-product",{
            method: "post",
            body:JSON.stringify({name,price,Category,company,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        console.warn(result)
        
    }

    return(
        <div className="product">
            <h1>Add Product</h1>
            <label><b>Product Name</b></label><br/>
            <input className="inputBox" type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter Product name" /><br/>
            {error && !name && <span className="invalid-input">Enter valid name</span>}
            <label><b>Price</b></label><br/>
            <input className="inputBox" type="text" onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Price" /><br/>
            {error && !price && <span className="invalid-input">Enter Price</span>}
            <label><b>Category</b></label><br/>
            <input className="inputBox" type="text" onChange={(e)=>setCategory(e.target.value)} placeholder="Enter Category" /><br/>
            {error && !Category && <span className="invalid-input">Enter Category</span>}
            <label><b>Company</b></label><br/>
            <input className="inputBox" type="text" onChange={(e)=>setCompany(e.target.value)} placeholder="Enter Company" /><br/>
            {error && !company && <span className="invalid-input">Enter company</span>}

            <button onClick={addProduct} className="appButton">Add Product</button>
        </div>
    )
}

export default AddProduct;