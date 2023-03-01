import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import MediaItem from '../MediaItem/MediaItem'

export default function Person() {
  
  const [person,setPerson]=useState([])

 async function getTrendingPerson(media_type,callback) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/day?api_key=a85944df0c2c90e9221e1d64fd0e1b74`)
    callback(data.results)

  }
  useEffect (()=> {
    getTrendingPerson('person',setPerson)
  },[])

  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Home" />
                <title>Person</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <div className="row">
    
      {person?.map((item, index)=> <MediaItem key={index} item={item}/> )}
   
  </div>
  
  </>
}

