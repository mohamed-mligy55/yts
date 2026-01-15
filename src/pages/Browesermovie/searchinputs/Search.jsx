import { useState } from "react";
import "./searchinput.css"

export const Search = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const [filters, setFilters] = useState({
    quality: "all",
    genre: "all",
    minimum_rating: "0",
    sort_by: "date_added",
    order_by: "desc",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      query_term: value,
      ...filters,
      page: 1,
    });
  };

  const handleClear = () => {
    setValue("");
    setFilters({
      quality: "all",
      genre: "all",
      minimum_rating: "0",
      sort_by: "date_added",
      order_by: "desc",
    });

    onSearch({ page: 1 });
  };
  const handleChangeFilter = (e) => {
  const { name, value } = e.target;
  setFilters(prev => ({
    ...prev,
    [name]: value,
  }));
};
const handleOrderChange = (e) => {
  const [sort_by, order_by] = e.target.value.split("-");
  setFilters(prev => ({
    ...prev,
    sort_by,
    order_by,
  }));
};
const defaultFilters = {
  quality: "all",
  genre: "all",
  minimum_rating: "0",
  sort_by: "date_added",
  order_by: "desc",
};




  return (
    <div className="search">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h3>Search Term :</h3>
          <input
            type="search"
            placeholder="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Submit</button>
          {(value !== "" || JSON.stringify(filters) !== JSON.stringify(defaultFilters)) && (
  <button type="button" className="Clear" onClick={handleClear}>
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
                <option value="1080p.x265">1080p.x265</option>
                <option value="2160p">2160p</option>
                <option value="3D">3D</option>
              </select>
            </div>

            <div className="selects">
              <p>Genre:</p>
              <select name="genre" value={filters.genre} onChange={handleChangeFilter}>
                <option value="all">All</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="animation">Animation</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="horror">Horror</option>
                <option value="sci-fi">Sci-Fi</option>
<option value="adventure">Adventure</option> <option value="animation">Animation</option> <option value="biography">Biography</option> <option value="comedy">Comedy</option> <option value="crime">Crime</option> <option value="documentary">Documentary</option> <option value="drama">Drama</option> <option value="family">Family</option> <option value="fantasy">Fantasy</option> <option value="film-noir">Film-Noir</option> <option value="game-show">Game-Show</option> <option value="history">History</option> <option value="horror">Horror</option> <option value="music">Music</option> <option value="musical">Musical</option> <option value="mystery">Mystery</option> <option value="news">News</option> <option value="reality-tv">Reality-TV</option> <option value="romance">Romance</option> <option value="sci-fi">Sci-Fi</option> <option value="sport">Sport</option> <option value="talk-show">Talk-Show</option> <option value="thriller">Thriller</option> <option value="war">War</option> <option value="western">Western</option>

              </select>
            </div>

            <div className="selects">
              <p>Rating:</p>
              <select name="minimum_rating" value={filters.minimum_rating} onChange={handleChangeFilter}>
                <option value="0">All</option>
                <option value="9">9+</option>
                <option value="8">8+</option>
                <option value="7">7+</option>
                <option value="6">6+</option>
                <option value="5">5+</option>
                <option value="4">4+</option>
                <option value="3">3+</option>
                <option value="2">2+</option>
                <option value="1">1+</option>
                
              </select>
            </div>

            <div className="selects">
  <p>Order By:</p>
  <select  value={`${filters.sort_by}-${filters.order_by}`}
    onChange={handleOrderChange}>
    <option value="date_added-desc">Latest</option>
    <option value="date_added-asc">Oldest</option>
    <option value="rating-desc">IMDb Rating</option>
  </select>
</div>

        
          <div className="selects">
               <p>Year:</p>
                    <select >
                        <option value="0">All</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2020-2026">2020-now</option>
                        <option value="2010-2026">2010-now</option>
                        <option value="2010-2019">2010-2019</option>
                        <option value="2000-2009">2000-2009</option>
                        <option value="1990-1999">1990-1999</option>
                        <option value="1980-1989">1980-1989</option>
                        <option value="1970-1979">1970-1979</option>
                        <option value="1950-1969">1950-1969</option>
                        <option value="1900-1949">1900-1949</option>
                    </select>
                </div>
                <div className="selects">
                    <p>Language:</p>
                    <select >
                        <option value="en">English</option>
                        <option value="foreign">Foreign</option>
                        <option value="all" selected="selected">All</option>
                                                    <option value="fr">French (3414)</option>
                                                    <option value="ja">Japanese (2872)</option>
                                                    <option value="es">Spanish (1924)</option>
                                                    <option value="it">Italian (1585)</option>
                                                    <option value="de">German (1308)</option>
                                                    <option value="zh">Chinese (1134)</option>
                                                    <option value="ko">Korean (990)</option>
                                                    <option value="hi">Hindi (889)</option>
                                                    <option value="cn">Cantonese (848)</option>
                                                    <option value="pt">Portuguese (478)</option>
                                                    <option value="tr">Turkish (471)</option>
                                                    <option value="sv">Swedish (470)</option>
                                                    <option value="ro">Romanian (450)</option>
                                                    <option value="ru">Russian (431)</option>
                                                    <option value="pl">Polish (393)</option>
                                                    <option value="nl">Dutch (354)</option>
                                                    <option value="th">Thai (267)</option>
                                                    <option value="da">Danish (265)</option>
                                                    <option value="id">Indonesian (225)</option>
                                                    <option value="ta">Tamil (220)</option>
                                                    <option value="te">Telugu (211)</option>
                                                    <option value="no">Norwegian (200)</option>
                                                    <option value="ar">Arabic (187)</option>
                                                    <option value="tl">Tagalog (167)</option>
                                                    <option value="fi">Finnish (161)</option>
                                                    <option value="cs">Czech (158)</option>
                                                    <option value="hu">Hungarian (150)</option>
                                                    <option value="vi">Vietnamese (134)</option>
                                                    <option value="fa">Persian (115)</option>
                                                    <option value="ml">Malayalam (98)</option>
                                                    <option value="he">Hebrew (96)</option>
                                                    <option value="pa">Punjabi (88)</option>
                                                    <option value="uk">Ukrainian (82)</option>
                                                    <option value="et">Estonian (77)</option>
                                                    <option value="el">Greek (70)</option>
                                                    <option value="bn">Bangla (50)</option>
                                                    <option value="ms">Malay (50)</option>
                                                    <option value="kn">Kannada (44)</option>
                                                    <option value="ca">Catalan (36)</option>
                                                    <option value="sr">Serbian (31)</option>
                                                    <option value="sk">Slovak (30)</option>
                                                    <option value="is">Icelandic (29)</option>
                                                    <option value="lt">Lithuanian (29)</option>
                                                    <option value="mr">Marathi (26)</option>
                                                    <option value="ur">Urdu (24)</option>
                                                    <option value="lv">Latvian (19)</option>
                                                    <option value="xx">xx (19)</option>
                                                    <option value="hr">Croatian (18)</option>
                                                    <option value="ka">Georgian (17)</option>
                                                    <option value="bg">Bulgarian (15)</option>
                                                    <option value="sh">Serbo-Croatian (14)</option>
                                                    <option value="af">Afrikaans (13)</option>
                                                    <option value="zu">Zulu (12)</option>
                                                    <option value="ku">Kurdish (12)</option>
                                                    <option value="mk">Macedonian (10)</option>
                                                    <option value="wo">Wolof (10)</option>
                                                    <option value="bs">Bosnian (9)</option>
                                                    <option value="yo">Yoruba (9)</option>
                                                    <option value="eu">Basque (8)</option>
                                                    <option value="ga">Irish (8)</option>
                                                    <option value="gl">Galician (8)</option>
                                                    <option value="kk">Kazakh (8)</option>
                                                    <option value="sq">Albanian (8)</option>
                                                    <option value="bo">Tibetan (7)</option>
                                                    <option value="sl">Slovenian (7)</option>
                                                    <option value="gu">Gujarati (7)</option>
                                                    <option value="mn">Mongolian (6)</option>
                                                    <option value="sw">Swahili (5)</option>
                                                    <option value="am">Amharic (5)</option>
                                                    <option value="dz">Dzongkha (4)</option>
                                                    <option value="mo">Romanian (4)</option>
                                                    <option value="yi">Yiddish (3)</option>
                                                    <option value="mi">Maori (3)</option>
                                                    <option value="lb">Luxembourgish (3)</option>
                                                    <option value="ps">Pashto (3)</option>
                                                    <option value="ht">Haitian Creole (3)</option>
                                                    <option value="hy">Armenian (3)</option>
                                                    <option value="xh">Xhosa (3)</option>
                                                    <option value="ne">Nepali (3)</option>
                                                    <option value="jv">Javanese (3)</option>
                                                    <option value="ab">Abkhazian (2)</option>
                                                    <option value="km">Khmer (2)</option>
                                                    <option value="la">Latin (2)</option>
                                                    <option value="os">Ossetic (2)</option>
                                                    <option value="ak">Akan (2)</option>
                                                    <option value="iu">Inuktitut (2)</option>
                                                    <option value="st">Southern Sotho (2)</option>
                                                    <option value="ig">Igbo (2)</option>
                                                    <option value="cy">Welsh (2)</option>
                                                    <option value="mt">Maltese (2)</option>
                                                    <option value="cmn">cmn (2)</option>
                                                    <option value="yue">Cantonese (2)</option>
                                                    <option value="my">Burmese (2)</option>
                                                    <option value="lo">Lao (2)</option>
                                                    <option value="bm">Bambara (2)</option>
                                                    <option value="se">Northern Sami (2)</option>
                                                    <option value="nb">Norwegian Bokmål (1)</option>
                                                    <option value="aa">Afar (1)</option>
                                                    <option value="ky">Kyrgyz (1)</option>
                                                    <option value="az">Azerbaijani (1)</option>
                                                    <option value="so">Somali (1)</option>
                                                    <option value="lg">Ganda (1)</option>
                                                    <option value="be">Belarusian (1)</option>
                                                    <option value="zxx">No linguistic content (1)</option>
                                                    <option value="fil">Filipino (1)</option>
                                                    <option value="tw">Twi (1)</option>
                                                    <option value="rw">Kinyarwanda (1)</option>
                                                    <option value="or">Odia (1)</option>
                                                    <option value="ase">American Sign Language (1)</option>
                                                    <option value="nan">Min Nan Chinese (1)</option>
                                                    <option value="ber">ber (1)</option>
                                                    <option value="qag">qag (1)</option>
                                                    <option value="gsw">Swiss German (1)</option>
                                                    <option value="ln">Lingala (1)</option>
                                                    <option value="iba">Iban (1)</option>
                                                    <option value="cr">Cree (1)</option>
                                                    <option value="tn">Tswana (1)</option>
                                                    <option value="qab">qab (1)</option>
                                                    <option value="rom">Romany (1)</option>
                                                    <option value="sa">Sanskrit (1)</option>
                                                    <option value="ukl">ukl (1)</option>
                                                    <option value="ug">Uyghur (1)</option>
                                                    <option value="kvk">kvk (1)</option>
                                                    <option value="om">Oromo (1)</option>
                                                    <option value="myn">myn (1)</option>
                                                    <option value="uz">Uzbek (1)</option>
                                                    <option value="ff">Fulah (1)</option>
                                                    <option value="fy">Western Frisian (1)</option>
                                                    <option value="rup">Aromanian (1)</option>
                                                    <option value="ti">Tigrinya (1)</option>
                                                    <option value="qu">Quechua (1)</option>
                                                    <option value="sah">Sakha (1)</option>
                                            </select>
                </div>
                </div>
               
        </form>
      </div>
    </div>
  );
};
