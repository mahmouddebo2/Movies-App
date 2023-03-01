import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import MediaItem from '../MediaItem/MediaItem'

export default function TvShow() {
  
  const [tvShow,setTvShow]=useState([])
  const [searchTvShow,setSearchTvShow]=useState([])

 async function getTrendingTvShow(media_type,callback) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/day?api_key=a85944df0c2c90e9221e1d64fd0e1b74`)
    callback(data.results)
  }
  async function searchTv(e) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=a85944df0c2c90e9221e1d64fd0e1b74&language=en-US&page=1&query=${e.target.value}&include_adult=false`)
    setSearchTvShow(data.results)
    console.log(data);
  }

  
  useEffect (()=> {
    getTrendingTvShow('tv',setTvShow)
  },[])

  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Home" />
                <title>TvShow</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <input type="text" onChange={searchTv} className='w-75 mx-auto form-control bg-dark text-white mb-4' placeholder='Search.....' />

  <div className="row">
    {searchTvShow?.filter((search)=>search.poster_path !== null).map((item, index)=> <MediaItem key={index} item={item}/> )}
    
      {tvShow?.map((item, index)=> <MediaItem key={index} item={item}/> )}
   
  </div>
  
  </>
}
