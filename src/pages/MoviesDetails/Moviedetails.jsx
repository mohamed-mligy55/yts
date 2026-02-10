import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./moviedetails.css";
import { CiHeart } from "react-icons/ci";


export const Moviedetails = () => {
  const [moviedetails, setMoviedetails] = useState({});
  const [similarmovie, setsimlarmovie] = useState([]);
  const [Trailer, setTrailer] = useState(null);
  const [Backdrops, setBackdrops] = useState([]);
  const [casts , setcasts] = useState([])
  const [review, setreview] = useState([]);


  const params = useParams();
  const API_KEY = "76f92edf83690ef3b8d8d4f8bb41c35f";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
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
        console.log(castData)
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
    };

    fetchDetails();
  }, [params.id]);

  return (
    <>

      <div className="banner py-20">
        <div className="overlay"></div>
        <div className="container">
          <div className="landing-content text-white">
            <div className="box">
              <div className="image">
                <img
                  className="img"
                  src={
                    moviedetails.poster_path
                      ? `https://image.tmdb.org/t/p/w200${moviedetails.poster_path}`
                      : "/no-image.png"
                  }
                  alt={moviedetails.title}
                />
              </div>

              <Link className="bg-[#6ac045] text-white block w-[245px] text-center font-bold py-[10px] my-[20px] rounded-[6px] text-[18px]">
                Download
              </Link>
            </div>

            <div className="box-info">
              <div className="head">
                <h1>{moviedetails.title}</h1>
                <div>
                  <h2>{moviedetails.release_date?.slice(0, 4)}</h2>
                  <h2>
                    {moviedetails.genres
                      ?.map((g) => g.name)
                      .join(" / ")}
                  </h2>
                </div>
              </div>

              <div className="links">
                <div className="quailty">
                  <p>Available in:</p>
                  <Link>720p.WEB</Link>
                  <Link>1080p.WEB</Link>
                  <Link>2160p.WEB.x265</Link>
                  <br />
                  <span>WEB: same quality as BluRay</span>
                </div>

                <div className="download">
                  <Link>Download Subtitles</Link>
                </div>
              </div>

              <div className="foot">
                <div className="rate">
                  <img
                    src="https://yts.bz/assets/images/website/logo-imdb.svg"
                    loading="lazy"
                  />
                  <span>{moviedetails.vote_average}</span>
                </div>
                <div className="rate">
                  <img
                    src="https://yts.bz/assets/images/website/rt-upright.svg"
                    loading="lazy"
                  />
                  <span>76%</span>
                </div>
              </div>
            </div>

     
            <div className="similar-box">
              <h3>Similar Movies</h3>
              <div className="image-simlar">
                {similarmovie
                  .filter((movie) => movie.poster_path)
                  .slice(0, 4)
                  .map((movie) => (
                    <div className="image-gallery" key={movie.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="main-content">
      <div className="image-section">
        <div className="container">
          <div className="media-row">
         
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
          </div>
        </div>
      </div>
      <div className="casts-section">
        <div className="container">
          <div className="summary">
            <h1>Plot summary</h1>
               <p>The film traces two families, one of which is Jewish, who preserved the images for decades but hadn’t brought them to light. 80 years after their creation,</p>
          </div>
          <div className="casts">
            <h2>Top cast</h2>
       {casts.slice(0,4).map((cast)=>(
        <div className="box" key={cast.id}>
                <img className="img" src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                      : "/no-image.png"
                  }
                  alt={cast.name}
                  
                />
                <p>{cast.name}</p>
                <hr/>

        </div>
       ))}
          </div>
        </div>

      </div>
         <div className="comment-section">
        <div className="container">
          <div className="comments">
            <h1>comments</h1>
            <div className="reviews-content">
              {review.map((review)=> (
                <div className="box" key={review.id}>
                    <div className="info">
                      <div className="image">
                           <img
          src={
            review.author_details.avatar_path
              ? review.author_details.avatar_path.startsWith("/https")
                ?review.author_details.avatar_path.slice(1)
                : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
              : "/no-image.png"
          }
          alt={review.author}
        />
        </div>
        <div className="name">
        <p>{`${review.author_details.username} ${" "} ${review.created_at}` }</p>
        <p>{review.content.slice(0,20)}</p>
        </div>
                    </div>
                    <div className="rating">
                      <span><CiHeart /></span>
                      <span>{review.author_details.rating}</span>
                    </div>


                </div>

              ))}
             
            </div>
          </div>
          <div className="reviews">
           
              <h1>Movie Reviews</h1>
              <p>No reviews yet.</p>
          
          </div>
        </div>
      </div>
      </div>
   
    </>
  );
};


