import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Search } from "./searchinputs/Search";
import "./browesermovie.css"
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";


export const Browesermovie = () => {
  const [filters, setFilters] = useState({
    query_term: "",
    quality: "all",
    genre: "all",
    minimum_rating: 0,
    sort_by: "rating",
    order_by: "desc",
    page: 1,
  });

  const [datamovie, setDatamovie] = useState([]);
  const [pagecount, setPagecount] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  // 🔹 fetch دائمًا على حسب state
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const urlParams = new URLSearchParams({
          limit,
          ...filters,
        });

        const res = await fetch(`https://yts.bz/api/v2/list_movies.json?${urlParams}`);
        const data = await res.json();

        setDatamovie(data.data?.movies || []);
        setPagecount(Math.ceil(data.data.movie_count / limit));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filters]); // كل ما filters تتغير، fetch

  // Pagination
  const handlePageClick = (event) => {
    setFilters(prev => ({ ...prev, page: event.selected + 1 }));
  };

  // Search + Filter
  const handleSearch = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  return (
    <>
      <Search onSearch={handleSearch} />

      <div className="broweser bg-[#1d1d1d] pt-10 pb-10">
        <div className="container">
          <div className="paginate">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next »"
            previousLabel="« Prev"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pagecount}
            forcePage={filters.page - 1}
          />
          </div>

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
                         <img src={movie.medium_cover_image}/>
                         <div className='title text-white font-bold'>{movie.title}</div>
                         <span className='text-[#919191]'>{movie.year}</span>
                         <div className='info  '>
                           <FaRegStar className='text-[#6ac045] text-4xl'/>
                           <h2>{(movie.rating / 10).toFixed(2)}</h2>
                           <h2>{movie.genres[0]}</h2>
                           <h2>{movie.genres[1]}</h2>
                           <Link>View Details</Link>
                           
                         </div>
                         </div>
                ))
              : <p className="col-span-4 text-center text-white">No movies found</p>}
          </div>
          <div className="paginate">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next »"
            previousLabel="« Prev"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pagecount}
            forcePage={filters.page - 1}
          />
          </div>
        </div>
      </div>
    </>
  );
};
