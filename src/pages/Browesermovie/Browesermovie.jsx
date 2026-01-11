import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "./searchinputs/Search";

export const Browesermovie = () => {

  const [params,setparams] = useSearchParams();
    const[datamovie ,setdatamovie] = useState([])
   const [totalPages, setTotalPages] = useState(1);

  const limit = params.get("limit")  || 50;
  const page = params.get("page") || 1;
  const quality = params.get("quality") ;
  const minimumRating = params.get("minimum_rating") || 1;
  const queryTerm = params.get("query_term") ;
  const genre = params.get("genre") || "";
  const sortBy = params.get("sort_by") || "rating";
  const orderBy = params.get("order_by") || "desc";
  const withRTRatings = params.get("with_rt_ratings") || false;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
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
          `https://yts.lt/api/v2/list_movies.json?${params}`
        );
        const data = await res.json();
        setdatamovie(data.data.movies || [])
        console.log(data.data.movies)
      } catch (error) {
        console.error(error);
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
     
    withRTRatings,
  ]);

  return (
    <>
    
    <Search queryterm={queryTerm} setparams = {setparams} quality={quality} genre={genre} minimumRating={minimumRating} orderBy={orderBy}  />
    <div className="broweser-content bg-[#1d1d1d] pt-10 pb-10" >
    <div className="container grid grid-cols-4 gap-6 mt-8 bg-[#1d1d1d] ">

   {datamovie.length > 0 ? (
    datamovie.map(movie => (
      <div key={movie.id} className="bg-black text-white p-3 rounded">
        <img
          src={movie.medium_cover_image}
          alt={movie.title}
          className="rounded"
        />
        <h4 className="mt-2 font-bold">{movie.title}</h4>
        <p className="text-sm text-gray-400">
          Rating: {movie.rating}
        </p>
      </div>
    ))
  ) : (
    <p className="text-center col-span-4">No movies found</p>
  )}
</div>
</div>


    
    </>
  )
};
