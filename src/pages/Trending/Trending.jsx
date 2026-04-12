import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';
import "./trending.css";

// 1. Shimmer Loading Component
const TrendingSkeleton = () => (
  <div className='box'>
    <div className='skeleton-box skeleton-img' style={{ height: '300px', width: '100%' }}></div>
    <div className='skeleton-box skeleton-text' style={{ height: '20px', width: '80%', marginTop: '10px' }}></div>
    <div className='skeleton-box skeleton-subtext' style={{ height: '15px', width: '40%', marginTop: '5px' }}></div>
  </div>
);

export const Trending = () => {
  const [trending, settrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = "76f92edf83690ef3b8d8d4f8bb41c35f";
    const fetchdata = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        const data = await res.json();
        settrending(data.results || []);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <Helmet>
        <title>Trending YIFY Movies - Popular This Week</title>
        <meta name="description" content="Browse the most popular trending movies on YTS this week in HD quality." />
      </Helmet>

      <div className='trending-section'>
        <div className='container'>
          <h2 className='text-trending'>24h YIFY Trending Movies</h2>
          
          <div className='trending-content'>
            {loading ? (
              // عرض 8 كروت وهمية أثناء التحميل
              Array.from({ length: 8 }).map((_, i) => <TrendingSkeleton key={i} />)
            ) : (
              trending.map((item) => (
                <div className='box' key={item.id}>
                  <Link to={`/moviedetails/${item.id}`} aria-label={`View ${item.title}`}>
                    <div className='image'>
                      <img 
                        className='img'
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w342${item.poster_path}` // استخدمنا w342 بدل w500 لتسريع التحميل
                            : "/no-image.png"
                        }
                        alt={item.title}
                        loading="lazy" // الصور اللي مش في وش المستخدم تحمل براحتها
                      />
                    </div>
                  </Link>
                  
                  <div className="mt-2">
                    <p className='title text-white font-bold'>{item.title}</p>
                    <p className='text-[#919191]'>{item.release_date?.slice(0, 4)}</p>
                  </div>

                  <div className='info-content'>
                    <FaRegStar className='text-[#6ac045] text-4xl'/>
                    <h2>{item.vote_average?.toFixed(1)}</h2>
                    {/* تأكد من وجود genre_ids قبل المحاولة */}
                    <h2>{item.genre_ids?.[0]}</h2>
                    <h2>{item.genre_ids?.[1]}</h2>
                    <Link to={`/moviedetails/${item.id}`}>View Details</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};