import axios from 'axios';
import Joi, { func } from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate= useNavigate();
  const [errorList, seterrorList] = useState([])
  const [isLoading , setIsLoading]= useState("")
  const [error , setError]= useState("")
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: ''
  });

  function getUserData(e) {
    let myUser= {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }

 async function sendRegisterdataToAPi(){
  let {data} = await axios.post(`https://route-movies-api.vercel.app/signup`, user)
  if(data.message =='success') {
    setIsLoading(false);
    navigate('/login')

    //login or home
  }else {
    setIsLoading(false);

    setError(data.message);
  }
  console.log(data);
  }

  function submitRegisterForm(e) {
    e.preventDefault();
    setIsLoading(true);

   let validation = validataRegisterForm();
   console.log(validation);
   if (validation.error) {
    setIsLoading(false);
    seterrorList(validation.error.details);
   }
   else {
       sendRegisterdataToAPi();

   }
  }

  function validataRegisterForm() {
    const schema = Joi.object({
      first_name:Joi.string().pattern(/^[A-Z]/).min(3).max(10).required(),
      last_name:Joi.string().min(3).max(10).required(),
      age:Joi.number().min(16).max(80).required(),
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

  <form onSubmit={submitRegisterForm}>
    <label htmlFor="first_name">First Name :</label>
    <input onChange={getUserData} type="text" className='form-control my-inputs my-2' id='first_name'  name='first_name'/>

    <label htmlFor="last_name">Last Name :</label>
    <input onChange={getUserData}  type="text" className='form-control my-inputs my-2' id='last_name'  name='last_name'/>

    <label htmlFor="age">Age :</label>
    <input onChange={getUserData}  type="number" className='form-control my-inputs my-2' id='age'  name='age'/>

    <label htmlFor="email">Email :</label>
    <input onChange={getUserData} type="email" className='form-control my-inputs my-2' id='email'  name='email'/>

    <label htmlFor="password">Password :</label>
    <input onChange={getUserData} type="password" className='form-control my-inputs my-2' id='password'  name='password'/>

    <button  className='btn btn-info'>
      {isLoading == true ?<i className='fa fa-spinner fa-spin'></i>:"Register"}
    </button>
  </form>
  </>
}
