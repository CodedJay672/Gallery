import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const signout = () => {
  toast.success("Logout successful!");
  sessionStorage.removeItem("token");
  window.location.reload();
}

export default function App() {
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/'>Photo Vallery</NavLink>
          <form className="d-flex" role='search'>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          </form>
          <NavLink className='nav-link' to='/' onClick={signout}>Log Out</NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
