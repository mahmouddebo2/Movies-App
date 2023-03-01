import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar({userData,logOut}) {
  return (
    <>
   

<nav className="navbar navbar-expand-lg bg-tranparent navbar-dark py-3">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><h1>Noxe</h1></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

    {userData? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to='/'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="tvShow">TvShow</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="person">Person</Link>
        </li>
      </ul>:''}
     
      
    <div className='d-flex ms-auto  align-items-center'>

      <ul className='list-unstyled d-flex mb-0 me-5'>
        <li className='mx-2'>
          <i className='fab fa-facebook'></i>
        </li>
        <li className='mx-2'>
          <i className='fab fa-twitter'></i>
        </li>
        <li className='mx-2'>
          <i className='fab fa-instagram'></i>
        </li>
        <li className='mx-2'>
          <i className='fab fa-youtube'></i>
        </li>
      </ul>
      <ul className="navbar-nav  mb-0 mb-lg-0">
        
    
        
         <>
        <>
          <li className="nav-item">
          <Link className="nav-link" to='profile'>
          
          </Link>
          </li>
        </>
    
        
     

        {
          userData? <>
          <li className="nav-item">
            <span className="nav-link curser-pointer" onClick={logOut} to="login">LogOut</span>
          </li>
          <li className="nav-item">
            <Link className="nav-link "  to="profile">{userData.first_name}</Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="profile">Profile</Link>
          </li> */}
          </>:<>
          <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
          </>
        }
       
      
        </>
       
      
  
        
      </ul>
    </div>
     
    </div>
  </div>
</nav>
    </>
  )
}
