import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./moviedetails.css"

export const Moviedetails = () => {
  const [moviedetails, setMoviedetails] = useState({});

 
  
  const params = useParams();

  useEffect(() => {
    

    const fetchDetails = async () => {
  
      try {
        const res = await fetch(
          `https://yts.bz/api/v2/movie_details.json?movie_id=${params.id}` );
        const data = await res.json();
        console.log(data.data.movie)
        setMoviedetails(data.data.movie)
      
      } catch (err) {
        console.log(err)
      } 
    };

    fetchDetails();

  },[params.id])
  return(
    <>
    <div className='banner pt-20'>
      <div className='container'>

      <div className='overlay'></div>
      <div className='landing-content'>
        <div className='box'>
       <img src={moviedetails?.medium_cover_image} alt={moviedetails?.title} />

          <Link className='bg-[#6ac045] text-white block w-[21%] text-center font-bold py-[10px] my-[20px] rounded-[6px] text-[18px]'>Download</Link>

        </div>
        <div className='box'>
          <div className='head'>
       
            <h1>{moviedetails.title}</h1>
            <h2>{moviedetails.year}</h2>
            <h2>{moviedetails.genres}</h2>
          </div>
        </div>
        </div>
      </div>



</div>

 


   
    </>
  )
}







