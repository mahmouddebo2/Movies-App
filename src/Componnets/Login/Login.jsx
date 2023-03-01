import axios from 'axios';
import Joi, { func } from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({saveUserdata}) {
  let navigate= useNavigate();
  const [errorList, seterrorList] = useState([])
  const [isLoading , setIsLoading]= useState("")
  const [error , setError]= useState("")
  const [user, setUser] = useState({
   
    email: '',
    password: ''
  });

  function getUserData(e) {
    let myUser= {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }

 async function sendLogindataToAPi(){
  let {data} = await axios.post(`https://route-movies-api.vercel.app/signin`, user)
  if(data.message =='success') {
    localStorage.setItem('userToken', data.token);
    saveUserdata()
    setIsLoading(false);
    navigate('/')

    //login or home
  }else {
    setIsLoading(false);

    setError(data.message);
  }
  console.log(data);
  }

  function submitLoginForm(e) {
    e.preventDefault();
    setIsLoading(true);

   let validation = validataLoginForm();
   console.log(validation);
   if (validation.error) {
    setIsLoading(false);
    seterrorList(validation.error.details);
   }
   else {
       sendLogindataToAPi();

   }
  }

  function validataLoginForm() {
    const schema = Joi.object({
      email:Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password:Joi.string().pattern(/^[A-Z][a-z]{3,6}/)
    });
    
    return schema.validate(user,{abortEarly:false})
  }


  return <>
  {errorList.map((err,index)=>  {
    if(err.context.label == 'password') {
      return <div key={index} className="alert alert-danger my-2">Password Invalid Please write 1 uppercase letter and 1 lowercase letter 3 to what you want</div>
    }
    else {
      return <div key={index} className="alert alert-danger my-2">{err.message}</div>
    }
  } )}
  {error.length > 0 ?  <div className="alert alert-danger my-2">{error}</div>:''}

  <form onSubmit={submitLoginForm}>
    
    <label htmlFor="email">Email :</label>
    <input onChange={getUserData} type="email" className='form-control my-inputs my-2' id='email'  name='email'/>

    <label htmlFor="password">Password :</label>
    <input onChange={getUserData} type="password" className='form-control my-inputs my-2' id='password'  name='password'/>

    <button  className='btn btn-info'>
      {isLoading == true ?<i className='fa fa-spinner fa-spin'></i>:"Login"}
    </button>
  </form>
  </>
}
