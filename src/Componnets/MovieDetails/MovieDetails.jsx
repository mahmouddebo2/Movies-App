import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
    let {id,media_type}= useParams();
    const [itemsDetails, setItemsDetails] = useState({})

    async function getItemDetails(id , mediaType) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=a85944df0c2c90e9221e1d64fd0e1b74&language=en-US`)
    setItemsDetails(data)
}

useEffect(()=> {
    getItemDetails(id,media_type)
},[])
  return <>
    <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Home" />
                <title>{itemsDetails.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <div className="row">
    <div className="col-md-3">
        {itemsDetails?.poster_path? <img src={'https://image.tmdb.org/t/p/w500/'+itemsDetails?.poster_path} className="w-100" alt="" />: <img src={'https://image.tmdb.org/t/p/w500/'+itemsDetails?.profile_path} className="w-100" alt="" />}
   
    </div>
    <div className="col-md-8">
    <h2>{itemsDetails.title}{itemsDetails.name}</h2>
    <p className='text-muted'>{itemsDetails.overview}</p>
    {itemsDetails?.vote_average&& <h6 className='mb-4 '>Vote : <span className='vote py-1 px-2'>{itemsDetails?.vote_average.toFixed(1) }</span> </h6>}

    <h6 className='mb-4'>Vote count : <span >{itemsDetails?.vote_count }</span></h6>
    <h6 className='mb-4'>popularity : {itemsDetails?.popularity }</h6>
    <h6>release date : {itemsDetails?.release_date}{itemsDetails?.last_air_date}</h6>
    </div>
  </div>
  </>
}
