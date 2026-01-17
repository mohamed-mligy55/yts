import { useState } from "react";
import "./searchinput.css";

const INITIAL_FILTERS = {
  quality: "all",
  genre: "all",
  minimum_rating: "0",
  sort_by: "date_added",
  order_by: "desc",
};

export const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [hasSearched, setHasSearched] = useState(false); // حالة الضغط على Search

  const handleSubmit = (e) => {
    e.preventDefault();
    // نبعت الريكويست فقط لو فيه Search أو فلتر
    const isFiltered =
      query.trim() !== "" ||
      Object.keys(INITIAL_FILTERS).some(key => filters[key] !== INITIAL_FILTERS[key]);

    if (isFiltered) {
      onSearch({ query_term: query, ...filters, page: 1 });
      setHasSearched(true); // فعلنا ظهور Clear بعد الضغط على Search
    }
  };

  const handleClear = () => {
    setQuery("");
    setFilters(INITIAL_FILTERS);
    setHasSearched(false); // رجعنا الحالة قبل البحث
    onSearch({ ...INITIAL_FILTERS, page: 1 }); // نبعت الريكويست لتصفية النتائج
  };

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderChange = (e) => {
    const [sort_by, order_by] = e.target.value.split("-");
    setFilters(prev => ({ ...prev, sort_by, order_by }));
  };

  return (
    <div className="search">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h3>Search Term:</h3>
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>

          {/* يظهر Clear فقط بعد الضغط على Search */}
          {hasSearched && (
            <button type="button" onClick={handleClear} className="clear">
              Clear
            </button>
          )}

          <div className="allselect">
            <div className="selects">
              <p>Quality:</p>
              <select name="quality" value={filters.quality} onChange={handleChangeFilter}>
                <option value="all">All</option>
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </select>
            </div>

            <div className="selects">
              <p>Genre:</p>
              <select name="genre" value={filters.genre} onChange={handleChangeFilter}>
                <option value="all">All</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
              </select>
            </div>

            <div className="selects">
              <p>Rating:</p>
              <select name="minimum_rating" value={filters.minimum_rating} onChange={handleChangeFilter}>
                <option value="0">All</option>
                <option value="7">7+</option>
                <option value="8">8+</option>
              </select>
            </div>

            <div className="selects">
              <p>Order By:</p>
              <select value={`${filters.sort_by}-${filters.order_by}`} onChange={handleOrderChange}>
                <option value="date_added-desc">Latest</option>
                <option value="rating-desc">IMDb Rating</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
