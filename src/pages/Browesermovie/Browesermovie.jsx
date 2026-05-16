import React, { useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { Search } from "./searchinputs/Search";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // تأكد من تثبيته
import { MovieCard } from "./MovieCard"; // سننشئ هذا المكون بالأسفل
import "./browesermovie.css";
import { Helmet } from 'react-helmet-async';


const API_KEY = "76f92edf83690ef3b8d8d4f8bb41c35f";

// دالة الجلب خارج المكون لمنع إعادة تعريفها
const fetchMovies = async ({ queryKey }) => {
  const [_key, { query, page, genre, rating, sort }] = queryKey;
  
  let endpoint = "movie/popular";
  if (query) endpoint = "search/movie";
  else if (genre || rating) endpoint = "discover/movie";

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    page,
    sort_by: sort,
  });

  if (query) params.append("query", query);
  if (genre) params.append("with_genres", genre);
  if (rating) params.append("vote_average.gte", rating);

  const res = await fetch(`https://api.themoviedb.org/3/${endpoint}?${params}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export const Browesermovie = () => {
  const [filters, setFilters] = useState({
    query: "",
    page: 1,
    genre: "",
    rating: "",
    sort: "popularity.desc",
  });

  // استخدام React Query
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["movies", filters],
    queryFn: fetchMovies,
    keepPreviousData: true, // يحافظ على البيانات القديمة أثناء تحميل الصفحة الجديدة (تجربة مستخدم أفضل)
    staleTime: 1000 * 60 * 5, // تخزين مؤقت لمدة 5 دقائق
  });

  const handlePageClick = (e) => {
    setFilters((prev) => ({ ...prev, page: e.selected + 1 }));
  };

  const movies = data?.results || [];
  const pageCount = Math.min(data?.total_pages || 0, 500);

  return (
    <>
     <Helmet>
      <title>YTS Movies - Broweser movie</title>
      <link rel="preconnect" href="https://api.themoviedb.org" />
  <link rel="preconnect" href="https://image.tmdb.org" />
      <meta name="description" content="Browse and download YIFY movies in 720p, 1080p and 4K quality at the smallest file size." />
      <meta name="keywords" content="movies, torrents, yify, hd movies, download movies" />
    </Helmet>
      <Search
        onApply={(data) => {
          setFilters({ ...data, page: 1 });
        }}
      />

      <div className="broweser bg-[#1d1d1d] py-10">
        <div className="container">
          {/* الترقيم */}
          {!isLoading && movies.length > 0 && (
            <div className={`paginate ${isFetching ? "opacity-50" : ""}`}>
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next »"
                previousLabel="« Prev"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                forcePage={filters.page - 1}
              />
            </div>
          )}

          <div className="grid grid-cols-4 gap-6 broweser-content">
            {isLoading ? (
              Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bg-gray-700 rounded p-3 animate-pulse h-[320px]" />
              ))
            ) : movies.length ? (
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <p className="col-span-4 text-center text-white">No movies found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};