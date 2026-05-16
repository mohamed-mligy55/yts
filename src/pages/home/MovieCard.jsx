import React from "react";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

// تحويل Genre IDs إلى أسماء
const genresMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
};

const MovieCard = React.memo(({ movie, priority = false }) => {
  return (
    <div className="box">
      <Link
        to={`/moviedetails/${movie.id}`}
        aria-label={`View details for ${movie.title}`}
      >
        <div className="image">
          <img
            className="img"
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            width="300"
            height="450"
          />
        </div>
      </Link>

      <div className="mt-2">
        <p className="title text-white font-bold">
          {movie.title}
        </p>

        <p className="text-[#919191]">
          {movie.release_date?.slice(0, 4)}
        </p>
      </div>

      <div className="info-content">
        <FaRegStar className="text-[#6ac045] text-4xl" />

        <h2>{movie.vote_average?.toFixed(1)}</h2>

        {movie.genre_ids?.slice(0, 2).map((id) => (
          <h2 key={id}>
            {genresMap[id] || "Movie"}
          </h2>
        ))}

        <Link to={`/moviedetails/${movie.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;