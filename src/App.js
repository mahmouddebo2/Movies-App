import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Componnets/Layout/Layout';
import Home from './Componnets/Home/Home';
import Movies from './Componnets/Movies/Movies';
import Person from './Componnets/Person/Person';
import TvShow from './Componnets/TvShow/TvShow';
import Login from './Componnets/Login/Login';
import Register from './Componnets/Register/Register';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Profile from './Componnets/Profile/Profile';
import ProtectedRouter from './Componnets/ProtectedRouter/ProtectedRouter';
import MovieDetails from './Componnets/MovieDetails/MovieDetails';
import { Offline, Online } from 'react-detect-offline';
import NotFound from './Componnets/NotFound/NotFound';



function App() {

  useEffect (()=> {
    if (localStorage.getItem('userToken')!== null) {
      saveUserdata()
    }
  } ,[])

  const [userData, setuserData] = useState(null);
  function saveUserdata() {
    let encodedToken= localStorage.getItem('userToken');
    let decodedToken= jwtDecode(encodedToken)
    console.log(decodedToken);
    setuserData(decodedToken)
  }
  const router = createBrowserRouter([
    {path:'/', element:<Layout setuserData={setuserData} userData={userData}/> , children:[
      {index:true, element:<ProtectedRouter userData={userData}><Home/></ProtectedRouter> },
      {path:'movies', element:<ProtectedRouter userData={userData}><Movies/></ProtectedRouter>},
      {path:'person', element:<ProtectedRouter userData={userData}><Person/></ProtectedRouter>},
      {path:'profile', element:<ProtectedRouter userData={userData}><Profile userData={userData}/></ProtectedRouter> },
      {path:"tvshow", element:<ProtectedRouter userData={userData}><TvShow/></ProtectedRouter>},
      {path:"movieDetails/:id/:media_type", element:<ProtectedRouter userData={userData}><MovieDetails/></ProtectedRouter>},
      
      
      {path:'login', element:<Login saveUserdata={saveUserdata}/>},
      {path:'register', element:<Register/>},
      {path:'*', element:<NotFound/>}
    ]}
  ])
  return <>
    <div>
    <Offline><div className='offline bg-danger'>You are offline Now</div> </Offline>
  </div>
  <RouterProvider router={router}/>
  </> 
}

export default App;
