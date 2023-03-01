import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import IsLoading from "../IsLoaing/IsLoading";
import MediaItem from "../MediaItem/MediaItem";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShow, setTrendingTvShow] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);
  const [isLoadnig,setIsLoadnig] = useState(true)

  async function getTrending(mediaTyep, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaTyep}/day?api_key=a85944df0c2c90e9221e1d64fd0e1b74`);
      callback(data.results);
      setIsLoadnig(false)
  }
  useEffect (()=>{
    getTrending('movie',setTrendingMovies)
    getTrending('tv',setTrendingTvShow)
    getTrending('person',setTrendingPerson)
  },[])
  
  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Home" />
                <title>Home page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            
        <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="bordr w-25 mb-3"></div>
            <h2 className="h3">
              Trending
              <br /> Movies
              <br />
              to Watch now
            </h2>
            <p className="py-2 text-muted">Most Watched Movies by days</p>
            <div className="bordr w-100 mt-3"></div>
          </div>
        </div>

      {trendingMovies?.slice(0,10).map((item,index)=> <MediaItem key={index} item={item}/>)}

      </div>

      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="bordr w-25 mb-3"></div>
            <h2 className="h3">
              Trending
              <br /> TvShow
              <br />
              to Watch now
            </h2>
            <p className="py-2 text-muted">Most Watched Tv by days</p>
            <div className="bordr w-100 mt-3"></div>
          </div>
        </div>

      {trendingTvShow?.slice(0,10).map((item,index)=> <MediaItem key={index} item={item}/>)}

      </div>

      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="bordr w-25 mb-3"></div>
            <h2 className="h3">
              Trending
              <br /> Person
              <br />
              to Watch now
            </h2>
            <p className="py-2 text-muted">Most Watched Person by days</p>
            <div className="bordr w-100 mt-3"></div>
          </div>
        </div>

      {trendingPerson?.filter((person)=>person.profile_path !== null).slice(0,10).map((item,index)=> <MediaItem key={index} item={item}/>)}

      </div>

    </>
  
}
