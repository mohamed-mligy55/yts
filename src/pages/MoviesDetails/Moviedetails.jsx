import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./moviedetails.css";
import { CiHeart } from "react-icons/ci";
import { Helmet } from 'react-helmet-async';


export const Moviedetails = () => {
  const [moviedetails, setMoviedetails] = useState({});
  const [similarmovie, setsimlarmovie] = useState([]);
  const [Trailer, setTrailer] = useState(null);
  const [Backdrops, setBackdrops] = useState([]);
  const [casts , setcasts] = useState([])
  const [review, setreview] = useState([]);
    const [loading, setLoading] = useState(true)


  const params = useParams();
  const API_KEY = "76f92edf83690ef3b8d8d4f8bb41c35f";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
         setLoading(true);
        /* Movie details */
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMoviedetails(data);

        /* Similar movies */
        const resim = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${API_KEY}&language=en-US`
        );
        const datasimlar = await resim.json();
        setsimlarmovie(datasimlar.results || []);

        /* Trailer */
        const resVideo = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${API_KEY}`
        );
        const videoData = await resVideo.json();
        const trailer = videoData.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailer(trailer || null);

        /* Backdrops */
        const resImages = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}/images?api_key=${API_KEY}`
        );
        const imagesData = await resImages.json();
        setBackdrops(imagesData.backdrops || []);


          const resCast = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${API_KEY}`
        );
        const castData = await resCast.json();
       
        setcasts(castData.cast.slice(0, 5));

        const resReviews = await fetch(
  `https://api.themoviedb.org/3/movie/${params.id}/reviews?api_key=${API_KEY}`
);
const reviewsData = await resReviews.json();
console.log(reviewsData.results)
setreview(reviewsData.results || []);
      } catch (err) {
        console.log(err);
      }
       finally {
      setLoading(false);
    }
    };

    fetchDetails();
  }, [params.id]);


  return (
    <> 
    <Helmet>
        <title>{loading ? "Loading..." : `${moviedetails.title} (${moviedetails.release_date?.slice(0, 4)}) - YTS`}</title>
        <meta name="description" content={moviedetails.overview?.slice(0, 160) || "Download YTS movies in high quality."} />
        <meta name="keywords" content={`${moviedetails.title}, download torrent, yify movies, ${moviedetails.genres?.map(g => g.name).join(', ')}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="video.movie" />
        <meta property="og:title" content={moviedetails.title} />
        <meta property="og:description" content={moviedetails.overview} />
        <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${moviedetails.poster_path}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={moviedetails.title} />
        <meta name="twitter:image" content={`https://image.tmdb.org/t/p/w500${moviedetails.poster_path}`} />
      </Helmet>
   

<div className="banner py-20">
  <div className="overlay"></div>
  <div className="container">

    {/* ===== لو الفيلم نفسه مش موجود ===== */}
    {!loading && !moviedetails?.id ? (
      <div className="text-center text-gray-400 text-xl py-10">
        No movie data found.
      </div>
    ) : (

      <div className="landing-content text-white">

        {/* ================= POSTER ================= */}
        <div className="box">
         <div className="image">
  {loading ? (
    <div className="shimmer" style={{ width: 200, height: 300 }}></div>
  ) : moviedetails.poster_path ? (
    <img
      className="img"
      src={`https://image.tmdb.org/t/p/w200${moviedetails.poster_path}`}
      alt={moviedetails.title}
      loading="lazy"
    />
  ) : (
    <div className="no-image">
      <p>No Image Available</p>
    </div>
  )}
</div>

          {loading ? (
            <div
              className="shimmer"
              style={{ width: 245, height: 45, marginTop: 20 }}
            ></div>
          ) : (
            <Link className="bg-[#6ac045] text-white block w-[245px] text-center font-bold py-[10px] my-[20px] rounded-[6px] text-[18px]">
              Download
            </Link>
          )}
        </div>

        {/* ================= INFO ================= */}
        <div className="box-info">
          <div className="head">
            {loading ? (
              <>
                <div className="shimmer mb-3" style={{ width: 320, height: 35 }}></div>
                <div className="shimmer" style={{ width: 220, height: 20 }}></div>
              </>
            ) : (
              <>
                <h1>{moviedetails.title || "No title available"}</h1>
                <div>
                  <h2>
                    {moviedetails.release_date
                      ? moviedetails.release_date.slice(0, 4)
                      : "N/A"}
                  </h2>
                  <h2>
                    {moviedetails.genres?.length > 0
                      ? moviedetails.genres.map((g) => g.name).join(" / ")
                      : "No genres available"}
                  </h2>
                </div>
              </>
            )}
          </div>

          {/* ================= LINKS ================= */}
          <div className="links mt-4">
            {loading ? (
              <>
                <div className="shimmer mb-2" style={{ width: 160, height: 20 }}></div>
                <div className="shimmer mb-2" style={{ width: 280, height: 20 }}></div>
                <div className="shimmer" style={{ width: 200, height: 20 }}></div>
              </>
            ) : (
              <>
                <div className="quailty">
                  <p>Available in:</p>
                  <div className="flex flex-wrap gap-2">
                    <Link>720p.WEB</Link>
                    <Link>1080p.WEB</Link>
                    <Link>2160p.WEB.x265</Link>
                  </div>
                </div>

                <div className="download mt-3">
                  <span>WEB: same quality as BluRay</span>
                  <br />
                  <Link>Download Subtitles</Link>
                </div>
              </>
            )}
          </div>

          {/* ================= RATING ================= */}
          <div className="foot mt-4">
            {loading ? (
              <div className="flex gap-4">
                <div className="shimmer" style={{ width: 100, height: 25 }}></div>
                <div className="shimmer" style={{ width: 100, height: 25 }}></div>
              </div>
            ) : (
              <>
                <div className="rate">
                  <img
                    src="https://yts.bz/assets/images/website/logo-imdb.svg"
                    loading="lazy"
                    alt="imdb"
                  />
                  <span>
                    {moviedetails.vote_average ?? "N/A"}
                  </span>
                </div>

                <div className="rate">
                  <img
                    src="https://yts.bz/assets/images/website/rt-upright.svg"
                    loading="lazy"
                    alt="rt"
                  />
                  <span>76%</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= SIMILAR MOVIES ================= */}
        <div className="similar-box">
          <h3>Similar Movies</h3>

          <div className="image-simlar">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="shimmer"
                  style={{ width: 120, height: 180 }}
                ></div>
              ))
            ) : similarmovie.filter((movie) => movie.poster_path).length === 0 ? (
              <p className="text-gray-400 mt-3">
                No similar movies available.
              </p>
            ) : (
              similarmovie
                .filter((movie) => movie.poster_path)
                .slice(0, 4)
                .map((movie) => (
                  <div className="image-gallery" key={movie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                ))
            )}
          </div>
        </div>

      </div>
    )}
  </div>
</div>


     <div className="main-content">

  {/* ================= IMAGE SECTION ================= */}
  <div className="image-section">
    <div className="container">
      <div className="media-row">

        {loading ? (
          <>
            <div className="shimmer" style={{ width: "60%", height: 350 }}></div>
            <div className="shimmer" style={{ width: "20%", height: 350 }}></div>
            <div className="shimmer" style={{ width: "20%", height: 350 }}></div>
          </>
        ) : Backdrops.length === 0 ? (
          <p className="text-gray-400">No images available.</p>
        ) : (
          <>
            {Trailer && (
              <div className="media-item trailer">
                <img
                  src={
                    Backdrops[0]
                      ? `https://image.tmdb.org/t/p/w780${Backdrops[0].file_path}`
                      : "/no-image.png"
                  }
                  alt="Trailer"
                />
                <div className="play-overlay">
                  ▶
                  <span>Trailer</span>
                </div>
              </div>
            )}

            {Backdrops.slice(1, 3).map((img, index) => (
              <div className="media-item" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
                  alt="Scene"
                />
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  </div>

  {/* ================= CAST SECTION ================= */}
  <div className="casts-section">
    <div className="container">

      <div className="summary">
        <h1>Plot summary</h1>

        {loading ? (
          <>
            <div className="shimmer mb-2" style={{ width: "100%", height: 20 }}></div>
            <div className="shimmer" style={{ width: "90%", height: 20 }}></div>
          </>
        ) : (
          <p>
            {moviedetails.overview || "No summary available."}
          </p>
        )}
      </div>

      <div className="casts">
        <h2>Top cast</h2>

        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div className="box" key={i}>
              <div
                className="shimmer"
                style={{ width: 120, height: 150, marginBottom: 10 }}
              ></div>
              <div
                className="shimmer"
                style={{ width: 100, height: 15 }}
              ></div>
            </div>
          ))
        ) : casts.length === 0 ? (
          <p className="text-gray-400">No cast information available.</p>
        ) : (
          casts.slice(0, 4).map((cast) => (
            <div className="box" key={cast.id}>
              <img
                className="img"
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                    : "/no-image.png"
                }
                alt={cast.name}
              />
              <p>{cast.name}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  </div>

  {/* ================= COMMENTS SECTION ================= */}
  <div className="comment-section">
    <div className="container">

      <div className="comments">
        <h1>Comments</h1>

        <div className="reviews-content">

          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div className="box" key={i}>
                <div className="info">
                  <div
                    className="shimmer"
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: "50%",
                      marginRight: 10,
                    }}
                  ></div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="shimmer mb-2"
                      style={{ width: 150, height: 15 }}
                    ></div>
                    <div
                      className="shimmer"
                      style={{ width: "100%", height: 15 }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : review.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            review.map((review) => (
              <div className="box" key={review.id}>
                <div className="info">
                  <div className="image">
                    <img
                      src={
                        review.author_details.avatar_path
                          ? review.author_details.avatar_path.startsWith("/https")
                            ? review.author_details.avatar_path.slice(1)
                            : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                          : "/no-image.png"
                      }
                      alt={review.author}
                    />
                  </div>

                  <div className="name">
                    <p>
                      {review.author_details.username}{" "}
                      {review.created_at?.slice(0, 10)}
                    </p>
                    <p>{review.content.slice(0, 80)}...</p>
                  </div>
                </div>

                <div className="rating">
                  <span><CiHeart /></span>
                  <span>{review.author_details.rating ?? 0}</span>
                </div>
              </div>
            ))
          )}

        </div>
      </div>

      <div className="reviews">
        <h1>Movie Reviews</h1>

        {!loading && review.length === 0 && (
          <p>No reviews available.</p>
        )}
      </div>

    </div>
  </div>

</div>
</>
  )}
