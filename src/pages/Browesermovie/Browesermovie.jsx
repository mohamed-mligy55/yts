import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Search } from "./searchinputs/Search"
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./browesermovie.css"


const API_KEY = "76f92edf83690ef3b8d8d4f8bb41c35f";
const limit = 20

export const Browesermovie = () => {
  const [query, setquery] = useState("");
  const [page, setpage] = useState(1);
  const [datamovie, setDatamovie] = useState([]);
  const [pagecount, setPagecount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

  let endpoint = "movie/popular";

if (query) {
  endpoint = "search/movie";
} else if (genre || rating) {
  endpoint = "discover/movie";
}


      const params = new URLSearchParams({
        api_key: API_KEY,
        language: "en-US",
        page,
        sort_by: sort
      });

  
          if (query) params.append("query", query);
      if (genre) params.append("with_genres", genre);
      if (rating) params.append("vote_average.gte", rating);
      const url = `https://api.themoviedb.org/3/${endpoint}?${params}`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data)

      setDatamovie(data.results || []);
      setPagecount(data.total_pages  );
      setLoading(false);
    };

    fetchMovies();
  }, [query, page, genre, rating, sort]);

  const handlePageClick = (e) => {
    setpage(e.selected + 1);
  };

const showPagination =
  !loading &&
  datamovie.length > 0 &&
  pagecount > 1;


     
  return (
<>
        <Search
  
        
      onApply={(data) => {
        
       setquery(data.query);
        setGenre(data.genre);
        setRating(data.rating);
        setSort(data.sort);
        setpage(1);
      
      }}
      setpage={setpage}
        submitted={submitted}
        setSubmitted={setSubmitted}
    />

      <div className="broweser bg-[#1d1d1d] py-10">
        <div className="container">
      {showPagination && (
  <div className="paginate">
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next »"
      previousLabel="« Prev"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pagecount}
    forcePage={page - 1}

    />
  </div>
)}

<div className="grid grid-cols-4 gap-6 broweser-content">
  {loading ? (
    // Skeleton placeholders
    Array.from({ length: limit }).map((_, i) => (
      <div
        key={i}
        className="bg-gray-700 rounded p-3 animate-pulse h-[320px]"
      />
    ))
  ) : datamovie.length ? (
    // Movies list
    datamovie.map((movie) => (
 
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
              <span className='text-[#919191]'>{movie.genre_ids?.[1]}</span>
              </div>
              <div className='info-content'>
                <FaRegStar className='text-[#6ac045] text-4xl '/>
                <h2>{(movie.vote_average).toFixed(2)}</h2>
                <h2>{movie.genre_ids[0]}</h2>
                <h2>{movie.genre_ids[1]}</h2>
                <Link to={`/moviedetails/${movie.id}`}>View Details</Link>
                
              </div>
              </div>
    ))
  ) : (
    // No movies
    <p className="col-span-4 text-center text-white">No movies found</p>
  )}

</div>


         
  {showPagination && (
  <div className="paginate">
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next »"
      previousLabel="« Prev"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pagecount}
   forcePage={page - 1}

    />
  </div>
)}


        </div>
      </div>
      </>
)
}


