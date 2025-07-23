import React, { useContext } from 'react';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Search from '../SearchBar/Search';
import Cookie from "js-cookie"
import ReactContext from '../../ReactContext/ReactContext';
const Navbar = () => {
  const navig= useNavigate()
  const tologin = ()=>{
    Cookie.remove("jwt_token")
    navig('/login')
  }
  const { loggedIn } = useContext(ReactContext)
  const navigateToRegister = ()=>{
    navig('/register')
  }
  const navigateToLogin = ()=>{
    Cookie.remove("jwt_token")
    navig('/login')
  }
  return (
    <nav className="navbar">
      <div className="nav-title">
        <h1>FirstLook

</h1>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/tv-shows" className={({ isActive }) => isActive ? 'active-link' : ''}>
            TV Shows
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'active-link' : ''}>
            WishList
          </NavLink>
        </li>
        <li>
          <NavLink to="/watch-later" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Watch Later
          </NavLink>
        </li>
      </ul>
      <div className="nav-btn">
        <Search />
        {Cookie.get('jwt_token') ?
          <div className='signup-div'>
            <button className='signup-btn' onClick={tologin}>Sign Out</button>
          </div> : <div className='nav-btn'><div className="signin-div">
            <button className="signin-btn" onClick={navigateToLogin}>Sign In</button>
          </div>
            <div className="signup-div">
              <button className="signup-btn" onClick={navigateToRegister}>Sign Up</button>
            </div>
          </div>}
      </div>
    </nav>
  );
};

export default Navbar;
