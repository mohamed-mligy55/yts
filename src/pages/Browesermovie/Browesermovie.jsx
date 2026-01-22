import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Search } from "./searchinputs/Search";
import "./browesermovie.css"
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";



export const Browesermovie = () => {
  const [filters, setFilters] = useState(null)
  const [datamovie, setDatamovie] = useState([]);
  const [pagecount, setPagecount] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 20;
const showPagination = !loading && datamovie.length > 0 && pagecount > 1;

  // 🔹 fetch دائمًا على حسب state
useEffect(() => {
  const fetchMovies = async () => {
    try {
      setLoading(true);

      let url = "https://yts.bz/api/v2/list_movies.json";

      if (filters) {
        const params = new URLSearchParams(filters);
        url += `?${params}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setDatamovie(data.data?.movies || []);
      setPagecount(Math.ceil(data.data.movie_count / 20));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, [filters]);





  // Pagination
  const handlePageClick = (event) => {
 setFilters(prev => ({
  ...(prev || {}),
  page: event.selected + 1,
}));
  };

  // Search + Filter
const handleSearch = (newFilters) => {
  if (!newFilters) {
    // Clear
    setFilters(null);
    return;
  }

  setFilters({ ...newFilters, page: 1 });
};




     
  return (
<>
      <Search onSearch={handleSearch} />

      <div className="broweser bg-[#1d1d1d] pt-10 pb-10">
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
    forcePage={((filters?.page ?? 1) - 1)}
    />
  </div>
)}




          <div className="grid grid-cols-4 gap-6 mt-8 broweser-content ">
            {loading
              ? Array.from({ length: limit }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-700 rounded p-3 animate-pulse h-[320px]"
                  />
                ))
              : datamovie.length
              ? datamovie.map((movie) => (
                  <div className='box ' key={movie.id}>
<img src='data:image/jpeg;base64,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'/>
                         
                         <div className='title text-white font-bold'>{movie.title}</div>
                         <span className='text-[#919191]'>{movie.year}</span>
                         <div className='info  '>
                           <FaRegStar className='text-[#6ac045] text-4xl'/>
                           <h2>{(movie.rating / 10).toFixed(2)}</h2>
                           <h2>{movie.genres?.[0]}</h2>
                           <h2>{movie.genres?.[1]}</h2>
                           <Link>View Details</Link>
                           
                         </div>
                         </div>
                ))
              : <p className="col-span-4 text-center text-white">No movies found</p>}
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
      forcePage={((filters?.page ?? 1) - 1)}

    />
  </div>
)}


        </div>
      </div>
      </>
)
}


