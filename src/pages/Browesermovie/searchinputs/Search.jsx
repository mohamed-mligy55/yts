import { useEffect, useState } from "react";
import "./searchinput.css";

export const Search = ({ onApply }) => {
  const [value, setvalue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const [draftGenre, setDraftGenre] = useState("");
  const [draftRating, setDraftRating] = useState("");
  const [draftSort, setDraftSort] = useState("popularity.desc");

  const [submitted, setSubmitted] = useState(false);

  // debounce input value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onApply({
      query: debouncedValue,
      genre: draftGenre,
      rating: draftRating,
      sort: draftSort,
    });

    setSubmitted(true);
  };

  const handleclear = () => {
    setvalue("");
    setDebouncedValue("");

    setDraftGenre("");
    setDraftRating("");
    setDraftSort("popularity.desc");

    onApply({
      query: "",
      genre: "",
      rating: "",
      sort: "popularity.desc",
    });

    setSubmitted(false);
  };

  return (
    <div className="search">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h3>Search:</h3>

          <div className="button-input">
            <input
              type="text"
              placeholder="Search movies..."
              value={value}
              onChange={(e) => setvalue(e.target.value)}
            />

            <div className="buttons">
              <button type="submit">Search</button>

              {submitted && (
                <button type="button" onClick={handleclear}>
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="allselect">
            <div className="selects">
              <p>Genre:</p>

              <select
                value={draftGenre}
                onChange={(e) => setDraftGenre(e.target.value)}
              >
                <option value="">All</option>
                <option value="28">Action</option>
                <option value="35">Comedy</option>
                <option value="13">Crime</option>
                <option value="18">Drama</option>
                <option value="27">Horror</option>
                <option value="16">Animation</option>
                <option value="10749">Romance</option>
                <option value="878">Science Fiction</option>
                <option value="53">Thriller</option>
                <option value="12">Adventure</option>
                <option value="14">Fantasy</option>
                <option value="80">Mystery</option>
              </select>
            </div>

            <div className="selects">
              <p>Rating:</p>

              <select
                value={draftRating}
                onChange={(e) => setDraftRating(e.target.value)}
              >
                <option value="">All</option>
                <option value="5">5+</option>
                <option value="6">6+</option>
                <option value="7">7+</option>
                <option value="8">8+</option>
                <option value="9">9+</option>
              </select>
            </div>

            <div className="selects">
              <p>Order By:</p>

              <select
                value={draftSort}
                onChange={(e) => setDraftSort(e.target.value)}
              >
                <option value="popularity.desc">Popular</option>
                <option value="popularity.asc">Least Popular</option>
                <option value="release_date.desc">Latest</option>
                <option value="release_date.asc">Oldest</option>
                <option value="vote_average.desc">Top Rated</option>
                <option value="vote_average.asc">Lowest Rated</option>
                <option value="primary_release_date.desc">
                  Newest Release
                </option>
                <option value="primary_release_date.asc">
                  Oldest Release
                </option>
                <option value="original_title.asc">Title A → Z</option>
                <option value="original_title.desc">Title Z → A</option>
                <option value="vote_count.desc">Most Votes</option>
                <option value="vote_count.asc">Least Votes</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};