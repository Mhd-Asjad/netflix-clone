import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search from '../../assets/search_icon.svg';
import bellicon from '../../assets/bell_icon.svg';
import profileicon from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {

  const navRef = useRef();
  useEffect(()=> {
    window.addEventListener('scroll' , ()=>{

      if (window.scrollY >= 80){
        navRef.current.classList.add('nav-dark')
      }else{
        navRef.current.classList.remove('nav-dark')
      }
    },[])
  })


  return (
    <div ref={navRef} className='navbar'>

      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse By Languages</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search} alt="Search" className='icons' />
        <p>Children</p>
        <img src={bellicon} alt="Notifications" className='icons' />

        <div className="navbar-profile">
          <img src={profileicon} alt="Profile" className='profile' />
          <img src={caret_icon} alt="Caret"/>


          <div className="dropdown">
            <p onClick={()=>{logout()}} >Sign out From Netflix</p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Navbar;
