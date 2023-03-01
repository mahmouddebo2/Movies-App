import React from 'react'

export default function Profile({userData}) {
    let {first_name , last_name , age , email} = userData

    
    return <>
    <h2>Name : {first_name} {last_name}</h2>
    <h3>Age : {age}</h3>
    <h3>email : {email}</h3>
  </>
  
}

