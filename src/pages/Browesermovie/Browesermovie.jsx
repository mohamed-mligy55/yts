import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "./searchinputs/Search";
import ReactPaginate from "react-paginate";
import "./browesermovie.css"

export const Browesermovie = () => {

  const [params,setparams] = useSearchParams();
    const[datamovie ,setdatamovie] = useState([])
   const [pagecount, setpagecount] = useState(0);
   const [loading , setloading] = useState(true)

const limit = Number(params.get("limit")) || 20;
const page = Number(params.get("page")) || 1;

const quality = params.get("quality") || "";
const minimumRating = Number(params.get("minimum_rating")) || 1;

const queryTerm = params.get("query_term") || "";
const genre = params.get("genre") || "";

const sortBy = params.get("sort_by") || "rating";
const orderBy = params.get("order_by") || "desc";

const withRTRatings =
  params.get("with_rt_ratings") === "true";


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setloading(true)
        const params = new URLSearchParams({
          limit,
          page,
          quality,
          minimum_rating: minimumRating,
          query_term: queryTerm,
          genre,
          sort_by: sortBy,
          order_by: orderBy,
          with_rt_ratings: withRTRatings
        });

        const res = await fetch(
          `https://yts.bz/api/v2/list_movies.json?${params}`
        );
        const data = await res.json();
        setdatamovie(data.data.movies || [])
       setpagecount(Math.ceil(data.data.movie_count / limit));

        console.log(data.data.movies)
      } catch (error) {
        console.error(error);
      }
      finally{
        setloading(false)
      }
    };

    fetchMovies(); 
  }, [
    limit,
    page,
    quality,
    minimumRating,
    queryTerm,
    genre,
    sortBy,
     orderBy,
    withRTRatings,
  ]);
  const handlePageClick = (event) => {
  const selectedPage = event.selected + 1;

  setparams(prev => {
    const p = new URLSearchParams(prev);
    p.set("page", selectedPage);
    return p;
  });
};



  return (
    <>
    
    <Search queryterm={queryTerm} setparams = {setparams} quality={quality} genre={genre} minimumRating={minimumRating} orderBy={orderBy} sortby={ sortBy }  />
    <div className="broweser-content bg-[#1d1d1d] pt-10 pb-10" >
    <div className="container  bg-[#1d1d1d] ">
        <div className="paginate">
  <ReactPaginate
    breakLabel="..."
    nextLabel="Next »"
    previousLabel="« Prev"
    onPageChange={handlePageClick}
    pageRangeDisplayed={5}
    pageCount={pagecount}
    forcePage={page - 1}
    renderOnZeroPageCount={null}
  />
</div>
     <div className="movive-content grid grid-cols-4 gap-6 mt-8">
            {loading ? (
              // ✅ Shimmer skeleton
              Array.from({ length: limit }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-700 rounded p-3 animate-pulse h-[320px]"
                ></div>
              ))
            ) : datamovie.length > 0 ? (
              datamovie.map((movie) => (
                <div key={movie.id} className="bg-black text-white p-3 rounded">
                  <img
                    src={movie.medium_cover_image}
                    alt={movie.title}
                    className="rounded"
                  />
                  <h4 className="mt-2 font-bold">{movie.title}</h4>
                  <p className="text-sm text-gray-400">Rating: {movie.rating}</p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-4">No movies found</p>
            )}
          </div>

          <div className="paginate mt-8">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next »"
              previousLabel="« Prev"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pagecount}
              forcePage={page - 1}
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </>
  );
};