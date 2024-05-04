import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Signup from './SignUp';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('Signup')
    }
    return (
        <div>
          <img 
          className='logo'
          src="https://www.canva.com/p/templates/EAFvDRwEHHg-colorful-abstract-online-shop-free-logo/"
          alt="logo" />
           {auth?  <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Products</Link></li>

                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/Signup">Logout ({JSON.parse(auth).name})</Link></li>

            </ul>
            :
            <ul className="nav-ul nav-right">
                <li><Link to="/Signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
           }
        </div>
    )
}

export default Nav;