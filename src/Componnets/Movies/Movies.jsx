import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import MediaItem from '../MediaItem/MediaItem'

export default function Movies() {
  
  const [movies,setMovies]=useState([])
  const [moviesSearch,setmoviesSearch]=useState([])

 async function getTrendingmovies(media_type,callback) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/day?api_key=a85944df0c2c90e9221e1d64fd0e1b74`)
    callback(data.results)

  }

  async function searchMovies(e) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a85944df0c2c90e9221e1d64fd0e1b74&language=en-US&page=1&query=${e.target.value}&include_adult=false`)
    setmoviesSearch(data.results)
    console.log(data);
  }
  useEffect (()=> {
    getTrendingmovies('movie',setMovies)
  },[])

  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Home" />
                <title>Movies </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <input type="text" onChange={searchMovies} className='w-75 mx-auto form-control bg-dark text-white mb-4' placeholder='Search.....' />

  <div className="row">
      {moviesSearch?.map((item, index)=> <MediaItem key={index} item={item}/> )}

      {movies?.map((item, index)=> <MediaItem key={index} item={item}/> )}
   
  </div>
  
  </>
}
