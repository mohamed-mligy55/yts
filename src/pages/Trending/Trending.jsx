import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegStar } from "react-icons/fa";
import "./trending.css"

export const Trending = () => {
    
const[trending , settrending]= useState([])
    useEffect(()=>{
          const API_KEY = "76f92edf83690ef3b8d8d4f8bb41c35f";
        const fetchdata = async ()=> {
            const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
            const data = await res.json()
            console.log(data.results)
            settrending(data.results)

        }
        fetchdata()
    },[])
  return (
    <>
    <div className='trending-section'>
        <div className='container'>
        <h2 className='text-trending '>24h YIFY Trending Movies</h2>
        <div className='trending-content'>
           {trending.map((trending)=>(
            <div className='box' key={trending.id}>
                <Link to={`/moviedetails/${trending.id}`}>
        <div className='image'>
         <img className='img'
        src={
          trending.poster_path
            ? `https://image.tmdb.org/t/p/w500${trending.poster_path}`
            : "/no-image.png"
        }
        alt={trending.title}
      />
        </div>
        </Link>
        <div>
        <p className='title text-white font-bold'>{trending.title}</p>
         <p className='text-[#919191]'>{trending.release_date?.slice(0, 4)}</p>
        </div>
        <div className='info-content'>
          <FaRegStar className='text-[#6ac045] text-4xl'/>
          <h2>{(trending.vote_average).toFixed(2)}</h2>
          <h2>{trending.genre_ids[0]}</h2>
          <h2>{trending.genre_ids[1]}</h2>
          <Link to={`/moviedetails/${trending.id}`}>View Details</Link>
          
        </div>
            </div>
           ))}
        </div>
        </div>
    </div>
    </>
    
  )
}
