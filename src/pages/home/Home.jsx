import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import { FaRegStar } from "react-icons/fa";

import { useQuery } from '@tanstack/react-query';


export const Home = () => {

const  API_KEY  = "76f92edf83690ef3b8d8d4f8bb41c35f"
  const fetchdata = async () => {
   
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
       return data.results;
      console.log(data)
    
  };

   const{data:moviedata=[], isLoading , error}=useQuery({
    queryKey:["movies"],
    queryFn:fetchdata
   })
   console.log(moviedata)

  
 

  return (
    <>
    <div className="banner">
        <div className="overlay"></div>

        <div className="text pt-10 text-center text-base ">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Download YTS YIFY movies: HD smallest size
          </h1>
          <p className="w-[700px] mx-auto text-[#ccc] leading-[1.6]">
            Welcome to the official YTS.LT website. Here you can browse and
            download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D
            quality, all at the smallest file size. YTS Movies Torrents.
          </p>

         <Link><span className="text-[#2a6496] font-bold">
            IMPORTANT - YTS.LT is the only new official domain for YIFY Movies
          </span></Link> 
        </div>
        <div className='info text-center mt-3 font-bold text-base '>
          <Link className='text-[#428bca]'>  @YTSMX_UPDATES |  Follow @YTSYIFY for upcoming featured movies! |  @ytsyify →</Link> <span className='text-white'>Save These Now - Quick Backup</span><br/>
         <span className='text-white'>All future news & status updates:</span> <Link className='text-[#428bca]' > YIFY Status • YTS Proxies • YTS Proxies (TOR) • YTS Official Links →</Link><span className='text-white'>Go here first if the main site is down.</span>
       <p className='text-white'> Pro Tip: Bookmark <u>YTS.BZ</u> and YTS.GG now as alternative domains → Backup entrance to the site.</p> 

        </div>
 


       
       <div className='container'>
        <div className='banner-content pt-5 pb-5'>
{moviedata.slice(0,4).map((movie)=>{
  return(

   
      <div className='box ' key={movie.id}>
      <Link to={`/moviedetails/${movie.id}`}>
       <div className='image'>
          <img className='img'
  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
  alt={movie.title}
/>
</div>
      </Link>
               

         
 

        
        <div>
        <p className='title text-white font-bold'>{movie.title}</p>
        <p className='text-[#919191]'>{movie.release_date?.slice(0, 4)}</p>
        </div>
        <div className='info-content'>
          <FaRegStar className='text-[#6ac045] text-4xl'/>
          <h2>{(movie.vote_average).toFixed(2)}</h2>
          <h2>{movie.genre_ids[0]}</h2>
          <h2>{movie.genre_ids[1]}</h2>
          <Link to={`/moviedetails/${movie.id}`}>View Details</Link>
          
        </div>
        </div>


  )
})}
   </div>
   </div>
    </div>


    <div className='broweserall bg-[#171717] pt-20'>
      <div className='container'>
        <div className='broweser flex items-center justify-between font-bold text-lg'>
          <h4 className='text-white'>Latest YIFY Movies Torrents</h4>
          <Link className='text-[#919191] text-sm' >Browser All</Link>
        </div>
        <div className='broweser-content p-6'>
        {moviedata.slice(4,12).map((movie)=>{
          return(
          <div className='box ' key={movie.id}>
               <Link to={`/moviedetails/${movie.id}`}>
        <div className='image'>
        <img className='img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
        </div>
        </Link>
        <div>
        <p className='title text-white font-bold'>{movie.title}</p>
        <p className='text-[#919191]'>{movie.release_date?.slice(0, 4)}</p>
        </div>
        <div className='info-content'>
          <FaRegStar className='text-[#6ac045] text-4xl'/>
          <h2>{(movie.vote_average).toFixed(2)}</h2>
          <h2>{movie.genre_ids[0]}</h2>
          <h2>{movie.genre_ids[1]}</h2>
          <Link to={`/moviedetails/${movie.id}`}>View Details</Link>
          
        </div>
        </div>
          )
        })}
        </div>
      </div>
    </div>
    <div className='up bg-[#1d1d1d] pt-4'>
      <div className='container'>
        <div className='requset flex items-center justify-between text-base'>
          <h2 className='text-white font-bold'>Upcoming YTS YIFY Movies</h2>
          <Link className='text-[#919191] font-bold'> Request a Movie</Link>
        </div>
        <div className='up-content '>
            {moviedata.slice(13,20).map((movie)=>{
          return(
          <div className='box ' key={movie.id}>
               <Link to={`/moviedetails/${movie.id}`}>
        <div className='image'>
        <img className='img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
        </div>
        </Link>
        <div>
        <p className='title text-white font-bold'>{movie.title}</p>
        <span className='text-[#919191]'>{movie.release_date?.slice(0, 4)}</span>
        </div>
        <div className='info-content'>
          <FaRegStar className='text-[#6ac045] text-4xl'/>
          <h2>{(movie.vote_average).toFixed(2)}</h2>
          <h2>{movie.genre_ids[0]}</h2>
          <h2>{movie.genre_ids[1]}</h2>
          <Link to={`/moviedetails/${movie.id}`}>View Details</Link>
          
        </div>
        </div>
          )
        })}
        </div>
      </div>
    </div>

     
    </>
  )
}